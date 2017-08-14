import "core-js/fn/array/map"
import "core-js/fn/array/filter"
import "core-js/fn/array/find"

/**
 * Usage:
 *
 * new FormHelper({
 *   nzKey: "AAABBB111222",
 *   auKey: "XXXYYY888999",
 *   nzWidgetOptions: {
 *     byline: false
 *   },
 *   auWidgetOptions: {},
 *   debug: false
 * }, {
 *   countryElement: document.getElementById("country"),
 *   nz: {
 *     countryValue: "NZ",
 *     searchElement: document.getElementById('FormField_18'),
 *     regionMappings: {
 *       "Auckland Region": "Auckland Region",
 *       "Bay Of Plenty Region": "Bay of Plenty",
 *       "Canterbury Region": "Canterbury",
 *       "Gisborne Region": "Gisborne Region",
 *       "Hawke's Bay Region": "Hawke's Bay",
 *       "Manawatu-Wanganui Region": "Manawatu-Wanganui Region",
 *       "Marlborough Region": "Marlborough",
 *       "Nelson Region": "Nelson Region",
 *       "Northland Region": "Northland",
 *       "Otago Region": "Otago",
 *       "Southland Region": "Southland",
 *       "Taranaki Region": "Taranaki",
 *       "Tasman Region": "Tasman",
 *       "Waikato Region": "Waikato",
 *       "Wellington Region": "Wellington Region",
 *       "West Coast Region": "West Coast",
 *       "No Region": "Chatham Islands"
 *     },
 *     elements: {
 *       address_line_1_and_2: document.getElementById('FormField_18'),
 *       address_line_1: null,
 *       address_line_2: null,
 *       suburb: document.getElementById('FormField_19'),
 *       city: document.getElementById('FormField_20'),
 *       region: document.getElementById('FormField_22'),
 *       postcode: document.getElementById('FormField_23')
 *     }
 *   },
 *   au: {
 *     countryValue: "AU",
 *     searchElement: document.getElementById('FormField_18'),
 *     stateMappings: {
 *       ACT: "Australian Capital Territory",
 *       NSW: "New South Wales",
 *       NT: "Northern Territory",
 *       QLD: "Queensland",
 *       SA: "South Australia",
 *       TAS: "Tasmania",
 *       VIC: "Victoria",
 *       WA: "Western Australia"
 *     },
 *     elements: {
 *       address_line_1_and_2: null,
 *       address_line_1: document.getElementById('FormField_18'),
 *       address_line_2: document.getElementById('FormField_19'),
 *       locality_name: document.getElementById('FormField_20'),
 *       state_territory: document.getElementById('FormField_22'),
 *       postcode: document.getElementById('FormField_23')
 *     }
 *   }
 * });
 */

export default class FormHelper {
  constructor(widgetConfig, formHelperConfig){
    this.widgetConfig = widgetConfig
    this.formHelperConfig = formHelperConfig
    this.widgets = {}
    this.subscriptions = {}
    this.label = formHelperConfig.label
    this.layoutIdentifier = formHelperConfig.layoutIdentifier

    this._bindToForm()
  }

  /**
   * Shuts down this form_helper by disabling the widget and any callback handlers.
   */
  destroy(){
    for (var widgetCountryCode in this.widgets) {
      this.widgets[widgetCountryCode].disable()
      this.widgets[widgetCountryCode].destroy()
    }

    this.widgets = null
    this.subscriptions = []

    this.formHelperConfig.countryElement.removeEventListener("change", this.boundCountryChangedListener)
  }

  // check all of the elements in the formHelper and confirm they are still
  // within the page DOM
  areAllElementsStillInTheDOM(){
    const doesntContainElement = element => !document.body.contains(element)

    if( doesntContainElement(this.formHelperConfig.countryElement)){
      this._log("Country Element is not in the DOM")
      return false
    }

    const countryCodes = ['nz', 'au']
    countryCodes.map((countryCode) => {
      const formConfig = this.formHelperConfig[countryCode]

      // check that the config for this country is supplied
      if (formConfig) {
        if( doesntContainElement(formConfig.searchElement )){
          this._log("Search Element is not in the DOM")
          return false
        }

        for (var elementName in formConfig.elements) {
          const element = formConfig.elements[elementName];
          if(element && doesntContainElement(element)) {
            this._log(`Element ${elementName} is not in the DOM`)
            return false
          }
        }
      }
    });
    return true
  }

  _bindToForm(){
    this.boundCountryChangedListener = this._countryChanged.bind(this) // save this so we can unbind in the destroy() method
    this.formHelperConfig.countryElement.addEventListener("change", this.boundCountryChangedListener);

    let nzWidget = new window.AddressFinder.Widget(this.formHelperConfig.nz.searchElement, this.widgetConfig.nzKey, "nz", this.widgetConfig.nzWidgetOptions);
    nzWidget.on("result:select", this._nzAddressSelected.bind(this))
    this.widgets["nz"] = nzWidget

    let auWidget = new window.AddressFinder.Widget(this.formHelperConfig.au.searchElement, this.widgetConfig.auKey, "au", this.widgetConfig.auWidgetOptions);
    auWidget.on("result:select", this._auAddressSelected.bind(this))
    this.widgets["au"] = auWidget

    this.widgets["null"] = {
      enable: function(){},
      disable: function(){},
      destroy: function(){}
    }

    this._countryChanged(null, true)
  }

  _countryChanged(event, preserveValues){
    var activeCountry;
    switch (this.formHelperConfig.countryElement.value) {
      case this.formHelperConfig.nz.countryValue:
      activeCountry = "nz"
      break;
    case this.formHelperConfig.au.countryValue:
      activeCountry = "au"
      break;
    default:
      activeCountry = "null";
    }

    this._setActiveCountry(activeCountry)
    if(!preserveValues) {
      const countryCodes = ["au", "nz"]
      const isInactiveCountry = countryCode => countryCode != activeCountry
      countryCodes.map((countryCode) => {
        if (isInactiveCountry(countryCode)) this._clearElementValues(countryCode)
      })
    }
  }

  _clearElementValues(countryCode){
    const elements = this.formHelperConfig[countryCode].elements
    for (var elementName in elements) {
      const element = elements[elementName];
      if (element) this._setElementValue(element, null, elementName);
    }
  }


  _setActiveCountry(countryCode){
    this._log(`Setting active country ${countryCode}`)

    for (var widgetCountryCode in this.widgets) {
      this.widgets[widgetCountryCode].disable()
    }
    this.widgets[countryCode].enable()
  }

  _nzAddressSelected(fullAddress, metaData){
    let elements = this.formHelperConfig.nz.elements
    let selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);

    if(elements.address_line_1_and_2){
      this._setElementValue(elements.address_line_1_and_2, selected.address_line_1_and_2(), "address_line_1_and_2")
    }
    else {
      this._setElementValue(elements.address_line_1, selected.address_line_1(), "address_line_1")
      this._setElementValue(elements.address_line_2, selected.address_line_2(), "address_line_2")
    }

    this._setElementValue(elements.suburb, selected.suburb(), "suburb")
    this._setElementValue(elements.city, selected.city(), "city")
    this._setElementValue(elements.postcode, selected.postcode(), "postcode")

    if (this.formHelperConfig.nz.regionMappings) {
      const translatedRegionValue = this.formHelperConfig.nz.regionMappings[metaData.region]
      this._setElementValue(elements.region, translatedRegionValue, "region")
    }
    else {
      this._setElementValue(elements.region, metaData.region, "region")
    }
  }

  _auAddressSelected(fullAddress, metaData){
    let elements = this.formHelperConfig.au.elements

    if(elements.address_line_1_and_2){
      const addressisNotNull = array => array != null
      const combined = [metaData.address_line_1, metaData.address_line_2].filter(addressisNotNull).join(", ")
      this._setElementValue(elements.address_line_1_and_2, combined, "address_line_1_and_2")
    }
    else {
      this._setElementValue(elements.address_line_1, metaData.address_line_1, "address_line_1")
      this._setElementValue(elements.address_line_2, metaData.address_line_2, "address_line_2")
    }

    this._setElementValue(elements.locality_name, metaData.locality_name, "suburb")
    this._setElementValue(elements.postcode, metaData.postcode, "postcode")

    if (this.formHelperConfig.au.stateMappings) {
      const translatedStateValue = this.formHelperConfig.au.stateMappings[metaData.state_territory]
      this._setElementValue(elements.state_territory, translatedStateValue, "state_territory")
    }
    else {
      this._setElementValue(elements.state_territory, metaData.state_territory, "state_territory")
    }
  }

  _setElementValue(element, value, elementName){
    if (!element) {
      this.logErrorMessage(element, value, elementName)
   }

   else if (element.options) {
      const find = (f, x) => Array.prototype.find.call(x, f)
      const checkOptionMatchesValue = option => option.value == value

      const foundElement = find(checkOptionMatchesValue, element.options)
      if (foundElement) this.createEvent(foundElement)
    }

    else {
      element.value = value;
      this.createEvent(element)
    }
  }

  logErrorMessage() {
    var errorMessage = 'AddressFinder Error: '
                       + 'Attempted to update value for element that could not be found.\n'
                       + '\nElement: ' + elementName
                       + '\nValue: ' + value;
   if (window.console) {
     console.warn(errorMessage);
   }
  }

  createEvent(element) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);
    element.dispatchEvent(event);
  }


  _log(message){
    if (this.widgetConfig.debug && window.console) {
      console.log(`FormHelper for layout ${this.formHelperConfig.label}: ${message}`)
    }
  }
}

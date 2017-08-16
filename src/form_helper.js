import "core-js/fn/array/map"
import "core-js/fn/array/filter"
import "core-js/fn/array/find"
import "core-js/fn/array/from"
import "core-js/fn/object/values"

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
    this.countryCodes = ["au", "nz"]

    this._bindToForm()
  }

  /**
   * Shuts down this form_helper by disabling the widget and any callback handlers.
   */
  destroy(){
    this._log("Destroying widget", this.label)

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

    if( this._bodyDoesntContainElement(this.formHelperConfig.countryElement)){
      this._log("Country Element is not in the DOM")
      return false
    }

    const countryCodeWithMissingElements = this.countryCodes.find((countryCode) => {
      if (this.areAllElementsStillInTheDOMForCountryCode(countryCode)) {
        return false // not missing
      } else {
        return true // missing an element
      }
    });

    const allElementsStillInTheDOM = !countryCodeWithMissingElements
    this._log('areAllElementsStillInTheDOM?', allElementsStillInTheDOM)

    return allElementsStillInTheDOM
  }

  areAllElementsStillInTheDOMForCountryCode(countryCode) {
    const formConfig = this.formHelperConfig[countryCode]

    // if config is not supplied then no need to check elements
    if (!formConfig) {
      return true
    }

    if (this._bodyDoesntContainElement(formConfig.searchElement)){
      this._log("Search Element is not in the DOM")
      return false
    }
    // const findElement = elementName => formConfig.elements[elementName]
    const isPresent = element => element != undefined

    const elementNotInDOM = Object.values(formConfig.elements)
                                  .filter(isPresent)
                                  .find(this._bodyDoesntContainElement)

    if (elementNotInDOM) {
      this._log("Element is not in the DOM", elementNotInDOM)
      return false
    }

    // all elements are still in the DOM
    return true
  }

  _bodyDoesntContainElement(element) {
    return !document.body.contains(element)
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
      const isInactiveCountry = countryCode => countryCode != activeCountry
      this.countryCodes.filter(isInactiveCountry).forEach(this._clearElementValues.bind(this))
    }
  }

  _clearElementValues(countryCode){
    const elements = this.formHelperConfig[countryCode].elements
    for (var elementName in elements) {
      const element = elements[elementName];
      if (element) this._setElementValue(element, "", elementName);
    }
  }

  _setActiveCountry(countryCode){
    this._log("Setting active country", countryCode)

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
      const addressIsPresent = array => array != null
      const combined = [metaData.address_line_1, metaData.address_line_2].filter(addressIsPresent).join(", ")
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
      var errorMessage = 'AddressFinder Error: '
                         + 'Attempted to update value for element that could not be found.\n'
                         + '\nElement: ' + elementName
                         + '\nValue: ' + value;

      if (window.console) {
        console.warn(errorMessage);
      }

      return
    }

    if (element.options) {
      const checkOptionMatchesValue = option => option.value == value
      const selectedOption = Array.prototype.find.call(element.options, checkOptionMatchesValue)

      element.value = value;
      if (selectedOption) this._dispatchChangeEvent(selectedOption)

      return
    }

    element.value = value;
    this._dispatchChangeEvent(element)
  }

  _dispatchChangeEvent(element) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);
    element.dispatchEvent(event);
  }

  _log(message, object1=undefined){
    if (this.widgetConfig.debug && window.console) {
      if (object1 != undefined) {
        console.log(`FormHelper for layout ${this.formHelperConfig.label}: ${message}`, object1)
      }
      else {
        console.log(`FormHelper for layout ${this.formHelperConfig.label}: ${message}`)
      }
    }
  }
}

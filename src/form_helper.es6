(function(d, w) {
  w.AF = w.AF || {}

  /**
   * Usage:
   *
   * new FormHelper({
   *   nzKey: "AAABBB111222",
   *   auKey: "XXXYYY888999",
   *   nzWidgetOptions: {
   *     byline: false
   *   },
   *   auWidgetOptions: {}
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
  w.AF.FormHelper = class {
    constructor(widgetConfig, formHelperConfig){
      this.widgetConfig = widgetConfig
      this.formHelperConfig = formHelperConfig
      this.widgets = {}
      this.subscriptions = {}

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

    _bindToForm(){
      this.boundCountryChangedListener = this._countryChanged.bind(this) // save this so we can unbind in the destroy() method
      this.formHelperConfig.countryElement.addEventListener("change", this.boundCountryChangedListener);

      let nzWidget = new w.AddressFinder.Widget(this.formHelperConfig.nz.searchElement, this.widgetConfig.nzKey, "nz", this.widgetConfig.nzWidgetOptions);
      nzWidget.on("result:select", this._nzAddressSelected.bind(this))
      this.widgets["nz"] = nzWidget

      let auWidget = new w.AddressFinder.Widget(this.formHelperConfig.au.searchElement, this.widgetConfig.auKey, "au", this.widgetConfig.auWidgetOptions);
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
      switch (this.formHelperConfig.countryElement.value) {
        case this.formHelperConfig.nz.countryValue:
          this._setActiveCountry("nz")

          if(!preserveValues){
            this._clearElementValues("au")
          }

          break
        case this.formHelperConfig.au.countryValue:
          this._setActiveCountry("au")

          if(!preserveValues){
            this._clearElementValues("nz")
          }

          break
        default:
          this._setActiveCountry("null")

          if(!preserveValues){
            this._clearElementValues("au")
            this._clearElementValues("nz")
          }
      }
    }

    _clearElementValues(countryCode){
      for (var elementName in this.formHelperConfig[countryCode].elements) {
        if (this.formHelperConfig[countryCode].elements.hasOwnProperty(elementName)) {
          const element = this.formHelperConfig[countryCode].elements[elementName];

          if(element){
            this._setElementValue(element, null, elementName);
          }
        }
      }
    }

    _setActiveCountry(countryCode){
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
        const combined = [
          metaData.address_line_1, metaData.address_line_2
        ].filter(function(a){return a != null}).join(", ")

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
      if (element) {
        element.value = value;

        var event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        element.dispatchEvent(event);

        var options = element.options;
        if (options) {
          for (var i = 0; i < options.length; i++) {
            if (element.options[i].value == value) {
              element.options[i].dispatchEvent(event);
              break;
            }
          }
        }

        return;
      }

      var errorMessage = 'AddressFinder Error: '
                         + 'Attempted to update value for element that could not be found.\n'
                         + '\nElement: ' + elementName
                         + '\nValue: ' + value;

      if (w.console) {
        console.warn(errorMessage);
      }
    }
  }
})(document, window)

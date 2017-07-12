(function(d, w) {
  w.AF = w.AF || {}

  w.AF.FormHelper = class {
    constructor(apiConfig, config){
      this.apiConfig = apiConfig
      this.config = config
      this.widgets = {}

      this.bindToForm()
    }

    bindToForm(){
      this.boundCountryChangedListener = this.countryChanged.bind(this) // save this so we can unbind in the destroy() method
      this.config.country_element.addEventListener("change", this.boundCountryChangedListener);

      let nzWidget = new w.AddressFinder.Widget(this.config.nz.elements.search, this.apiConfig.nzKey, "nz", this.apiConfig.nzWidgetOptions);
      nzWidget.on("result:select", this.nzAddressSelected.bind(this))
      this.widgets["nz"] = nzWidget

      let auWidget = new w.AddressFinder.Widget(this.config.au.elements.search, this.apiConfig.auKey, "au", this.apiConfig.auWidgetOptions);
      auWidget.on("result:select", this.auAddressSelected.bind(this))
      this.widgets["au"] = auWidget

      this.widgets["null"] = {
        enable: function() { },
        disable: function() { },
      }

      this.countryChanged()
    }

    countryChanged(){
      switch (this.config.country_element.value) {
        case this.config.nz.countryValue:
          this.setActiveCountry("nz")
          break
        case this.config.au.countryValue:
          this.setActiveCountry("au")
          break
        default:
          this.setActiveCountry("null")
      }
    }

    setActiveCountry(countryCode){
      for (var widgetCountryCode in this.widgets) {
        this.widgets[widgetCountryCode].disable()
      }

      this.widgets[countryCode].enable()
    }

    nzAddressSelected(fullAddress, metaData){
      let elements = this.config.nz.elements
      let selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);

      if (this.config.nz.elements.address2) {
        elements.address1.value = selected.address_line_1()
        elements.address2.value = selected.address_line_2()
      }
      else {
        elements.address1.value = selected.address_line_1_and_2()
      }

      elements.suburb.value = selected.suburb()
      elements.city.value = selected.city()
      elements.postcode.value = selected.postcode()

      this.setFieldValue(elements.region, metaData.region)
    }

    auAddressSelected(fullAddress, metaData){
      let elements = this.config.au.elements

      if (elements.address2) {
        elements.address1.value = metaData.address_line_1
        elements.address2.value = metaData.address_line_2
      }
      else {
        if (metaData.address_line_2) {
          elements.address1.value = metaData.address_line_1 + ", " + metaData.address_line_2
        } else {
          elements.address1.value = metaData.address_line_1
        }
      }

      elements.suburb.value = metaData.locality_name
      elements.postcode.value = metaData.postcode

      // set state
      const state_value = this.config.au.stateValues[metaData.state_territory]
      this.setFieldValue(elements.state, state_value, "state")
    }

    // shuts down this object by disabling the widget and country selector
    destroy(){
      for (var widgetCountryCode in this.widgets) {
        this.widgets[widgetCountryCode].disable()
      }

      this.widgets = []

      this.config.country_element.removeEventListener("change", this.boundCountryChangedListener)
    }

    setFieldValue(field, value, label){
      if (field) {
        field.value = value;

        var options = field.options;

        if (options) {
          var event = document.createEvent('HTMLEvents');
          event.initEvent('change', true, false);
          field.dispatchEvent(event);

          for (var i = 0; i < options.length; i++) {
            if (field.options[i].value === value) {
              field.dispatchEvent(event);
              break;
            }
          }
        }

        return;
      }

      var errorMessage = 'AddressFinder Error: '
                         + 'Attempted to update value for field that could not be found.\n'
                         + '\nField: ' + label
                         + '\nValue: ' + value;

      if (w.console) {
        console.warn(errorMessage);
      }
    }
  }
})(document, window)

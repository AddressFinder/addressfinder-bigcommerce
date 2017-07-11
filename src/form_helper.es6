(function(d, w) {
  w.AF = w.AF || {}

  w.AF.FormHelper = class {
    constructor(config, formElements){
      this.config = config
      this.elements = formElements
      this.widgets = {}

      this.bindToForm()
    }

    bindToForm(){
      this.boundCountryChangedListener = this.countryChanged.bind(this) // save this so we can unbind in the destroy() method
      this.elements.country.addEventListener("change", this.boundCountryChangedListener);

      let nzWidget = new w.AddressFinder.Widget(this.elements.address1, this.config.nzKey, "nz", this.config.nzWidgetOptions);
      nzWidget.on("result:select", this.nzAddressSelected.bind(this))
      this.widgets["nz"] = nzWidget

      let auWidget = new w.AddressFinder.Widget(this.elements.address1, this.config.auKey, "au", this.config.auWidgetOptions);
      auWidget.on("result:select", this.auAddressSelected.bind(this))
      this.widgets["au"] = auWidget

      this.widgets["null"] = {
        enable: function() { },
        disable: function() { },
      }

      this.countryChanged()
    }

    countryChanged(){
      switch (this.elements.country.value) {
        case this.config.countryValues.nz:
          this.setActiveCountry("nz")
          break
        case this.config.countryValues.au:
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
      let selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);

      if (this.elements.address2) {
        this.elements.address1.value = selected.address_line_1()
        this.elements.address2.value = selected.address_line_2()
      }
      else {
        this.elements.address1.value = selected.address_line_1_and_2()
      }

      this.elements.suburb.value = selected.suburb()
      this.elements.city.value = selected.city()
      this.elements.postcode.value = selected.postcode()
    }

    auAddressSelected(fullAddress, metaData){
      console.log(`selected address ${fullAddress}`)

      if (this.elements.address2) {
        this.elements.address1.value = metaData.address_line_1()
        this.elements.address2.value = metaData.address_line_2()
      }
      else {
        this.elements.address1.value = metaData.address_line_1_and_2
      }

      this.elements.city.value = metaData.locality_name
      this.elements.postcode = metaData.postcode

      // _setFieldValue(curr.address_1, metaData.address_line_1);
      // _setFieldValue(curr.address_2, metaData.address_line_2 || '');
      // _setFieldValue(curr.city, metaData.locality_name || '');
      // _setAuState(curr.state, metaData.state_territory);
      // _setFieldValue(curr.postcode, metaData.postcode);
    }

    // shuts down this object by disabling the widget and country selector
    destroy(){
      for (var widgetCountryCode in this.widgets) {
        this.widgets[widgetCountryCode].disable()
      }

      this.widgets = []

      this.elements.country.removeEventListener("change", this.boundCountryChangedListener)
    }
  }
})(document, window)

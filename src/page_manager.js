import FormManager from "./form_manager"

export default class PageManager {
  constructor({addressFormConfigurations, widgetConfig, eventToDispatch}) {
    // Each formHelper is an instance of the FormManager class
    this.formHelpers = []
    // An object containing identifying information about an address form, such as the id values 
    this.addressFormConfigurations = addressFormConfigurations
    // Configuration provided by the user, such as keys and widget options
    this.widgetConfig = widgetConfig
    // The event type to trigger when a field value is changed by AddressFinder 
    this.eventToDispatch = eventToDispatch

    this.loadFormHelpers()
  }

  reload = (addressFormConfigurations) => {
    // Takes the addressFormConfigurations (static and dynamic) provided by the ConfigManager and loads our formHelpers
    this.addressFormConfigurations = addressFormConfigurations
    this.loadFormHelpers()
  }

  loadFormHelpers() {
    // We destroy and reset all our current helpers and configurations, then recreate them.
    this.formHelpers.forEach(formHelper => formHelper.destroy())
    this.identifiedAddressFormConfigurations = []
    this.formHelpers = []
 
    this._identifyAddressForms()
    this.identifiedAddressFormConfigurations.forEach(this._initialiseFormHelper.bind(this))
  }

  _identifyAddressForms(){
    // Checks if each of our form configs are present on the page
    for (const addressFormConfig of this.addressFormConfigurations) {
      let identifyingElement = document.querySelector(addressFormConfig.layoutSelector)

      if (identifyingElement) {
        this.log(`Identified layout named: ${addressFormConfig.label}`)

        this.identifiedAddressFormConfigurations.push(addressFormConfig)
      }
    }
  }

  _initialiseFormHelper(addressFormConfig){
    // For each configuration, create a formHelperConfig. This maps our form configurations to the corresponding DOM elements. 
    let searchElement = document.getElementById(addressFormConfig.searchIdentifier) 

    if (searchElement) {
      let formHelperConfig = {
        countryElement: document.getElementById(addressFormConfig.countryIdentifier),
        searchElement: document.getElementById(addressFormConfig.searchIdentifier),
        label: addressFormConfig.label,
        layoutSelector: addressFormConfig.layoutSelector,
        nz: {
          countryValue: addressFormConfig.nz.countryValue,
          elements: {
            address_line_1: document.getElementById(addressFormConfig.nz.elements.address1),
            address_line_2: document.getElementById(addressFormConfig.nz.elements.address2),
            suburb: document.getElementById(addressFormConfig.nz.elements.suburb),
            city: document.getElementById(addressFormConfig.nz.elements.city),
            region: document.getElementById(addressFormConfig.nz.elements.region),
            postcode: document.getElementById(addressFormConfig.nz.elements.postcode)
          },
          regionMappings: addressFormConfig.nz.regionMappings
        },
        au: {
          countryValue: addressFormConfig.au.countryValue,
          elements: {
            address_line_1: document.getElementById(addressFormConfig.au.elements.address1),
            address_line_2: document.getElementById(addressFormConfig.au.elements.address2),
            locality_name: document.getElementById(addressFormConfig.au.elements.suburb),
            city: null,
            state_territory: document.getElementById(addressFormConfig.au.elements.state),
            postcode: document.getElementById(addressFormConfig.au.elements.postcode)
          },
          stateMappings: addressFormConfig.au.stateMappings
        }
      }

      let helper = new FormManager(this.widgetConfig, formHelperConfig, this.eventToDispatch)
      this.formHelpers.push(helper)
    }
  }

  log(message, data=undefined){
    if (this.widgetConfig.debug && window.console) {
      if (data != undefined) {
        console.log(`${message}`, data)
      }
      else {
        console.log(`${message}`)
      }
    }
  }
}
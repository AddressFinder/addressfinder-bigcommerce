import FormHelper from "./form_helper"
import MutationHelper from "./mutation_helper"

export default class PluginManager {
  constructor(addressFormConfigurations, widgetConfig) {
    this.formHelpers = []
    this.addressFormConfigurations = addressFormConfigurations
    this.widgetConfig = widgetConfig

    this.loadFormHelpers()

    new MutationHelper({
      mutationEventHandler: this.loadFormHelpers.bind(this),
      ignoredClass: "af_list"
    })
  }

  loadFormHelpers() {
    this.formHelpers.forEach(formHelper => formHelper.destroy())
    this.identifiedAddressFormConfigurations = []
    this.formHelpers = []
    
    this._identifyAddressForms()

    this.identifiedAddressFormConfigurations.forEach(this._initialiseFormHelper.bind(this))
  }

  _identifyAddressForms(){
    for (const addressFormConfig of this.addressFormConfigurations) {
      let identifyingElement = document.querySelector(addressFormConfig.layoutSelector)

      if (identifyingElement) {
        this.log(`Identified layout named: ${addressFormConfig.label}`)
        this.identifiedAddressFormConfigurations.push(addressFormConfig)
      }
    }
  }

  _initialiseFormHelper(addressFormConfig){
    let searchElement = document.getElementById(addressFormConfig.searchIdentifier)

    if (searchElement) {
      let formHelperConfig = {
        countryElement: document.getElementById(addressFormConfig.countryIdentifier),
        label: addressFormConfig.label,
        layoutSelector: addressFormConfig.layoutSelector,
        nz: {
          countryValue: addressFormConfig.nz.countryValue,
          searchElement: document.getElementById(addressFormConfig.nz.elements.address1),
          elements: {
            address_line_1_and_2: document.getElementById(addressFormConfig.nz.elements.address1),
            address_line_1: null,
            address_line_2: null,
            suburb: document.getElementById(addressFormConfig.nz.elements.suburb),
            city: document.getElementById(addressFormConfig.nz.elements.city),
            region: document.getElementById(addressFormConfig.nz.elements.region),
            postcode: document.getElementById(addressFormConfig.nz.elements.postcode)
          },
          regionMappings: null
        },
        au: {
          countryValue: addressFormConfig.au.countryValue,
          searchElement: document.getElementById(addressFormConfig.au.elements.address1),
          elements: {
            address_line_1_and_2: null,
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

      let helper = new FormHelper(this.widgetConfig, formHelperConfig)
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
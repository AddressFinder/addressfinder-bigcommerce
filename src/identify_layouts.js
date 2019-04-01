import FormHelper from "./form_helper"
import MutationHelper from "./mutation_helper"

export default class IdentifyLayouts {
  constructor(layoutConfigurations, widgetConfig) {
    this.formHelpers = []
    this.formHelperConfig = {}
    this.widgetConfig = widgetConfig
    this.layoutConfigurations = layoutConfigurations
    this.mutationHelper = undefined

    this.identifyLayout()
  }

  identifyLayout(){
    for (const layoutConfig of this.layoutConfigurations) {
      let identifyingElement = document.querySelector(layoutConfig.layoutSelector)

      if (identifyingElement) {
        this._log(`Identified layout named: ${layoutConfig.label}`)
        this.initialiseFormHelper(layoutConfig)
      }
    }
  }

  initialiseFormHelper(layoutConfig){
    let searchElement = document.getElementById(layoutConfig.searchIdentifier)

    if (searchElement) {
      this.formHelperConfig = {
        countryElement: document.getElementById(layoutConfig.countryIdentifier),
        label: layoutConfig.label,
        layoutSelector: layoutConfig.layoutSelector,
        nz: {
          countryValue: layoutConfig.nz.countryValue,
          searchElement: document.getElementById(layoutConfig.nz.elements.address1),
          elements: {
            address_line_1_and_2: document.getElementById(layoutConfig.nz.elements.address1),
            address_line_1: null,
            address_line_2: null,
            suburb: document.getElementById(layoutConfig.nz.elements.suburb),
            city: document.getElementById(layoutConfig.nz.elements.city),
            region: document.getElementById(layoutConfig.nz.elements.region),
            postcode: document.getElementById(layoutConfig.nz.elements.postcode)
          },
          regionMappings: null
        },
        au: {
          countryValue: layoutConfig.au.countryValue,
          searchElement: document.getElementById(layoutConfig.au.elements.address1),
          elements: {
            address_line_1_and_2: null,
            address_line_1: document.getElementById(layoutConfig.au.elements.address1),
            address_line_2: document.getElementById(layoutConfig.au.elements.address2),
            locality_name: document.getElementById(layoutConfig.au.elements.suburb),
            city: null,
            state_territory: document.getElementById(layoutConfig.au.elements.state),
            postcode: document.getElementById(layoutConfig.au.elements.postcode)
          },
          stateMappings: layoutConfig.au.stateMappings
        }
      }

      let helper = new FormHelper(this.widgetConfig, this.formHelperConfig)
      this.formHelpers.push(helper)

      if (this.mutationHelper === undefined) {
        this.mutationHelper = new MutationHelper(this)
      }
    }
  }

  _log(message, data=undefined){
    // widgetConfig.debug should be on 
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
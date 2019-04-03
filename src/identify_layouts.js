import FormHelper from "./form_helper"
import MutationHelper from "./mutation_helper"

export default class IdentifyLayouts {
  constructor(layoutConfigurations, widgetConfig) {
    this.formHelpers = []
    this.formHelperConfig = {}
    this.widgetConfig = widgetConfig
    this.layoutConfigurations = layoutConfigurations
    this.countryCodes = ["au", "nz"]
    this.resetAndReloadFormHelpers = this.resetAndReloadFormHelpers.bind(this)
    
    this._identifyLayout()
    new MutationHelper(this.resetAndReloadFormHelpers)
  }

  resetAndReloadFormHelpers() {
    const formHelpersToDestroy = this.formHelpers.filter(() => !this._allElementsStillInTheDOM())
    const activeFormHelpers = this.formHelpers.filter(() => this._allElementsStillInTheDOM())

    formHelpersToDestroy.forEach(formHelper => formHelper.destroy())
    this.formHelpers = activeFormHelpers

    this._identifyAdditionalLayouts()
  }

  _identifyLayout(){
    for (const layoutConfig of this.layoutConfigurations) {
      let identifyingElement = document.querySelector(layoutConfig.layoutSelector)

      if (identifyingElement) {
        this.log(`Identified layout named: ${layoutConfig.label}`)
        this._initialiseFormHelper(layoutConfig)
      }
    }
  }

  _initialiseFormHelper(layoutConfig){
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
    }
  }

  _identifyAdditionalLayouts(){
    const layoutSelectorExists = config => document.querySelector(config.layoutSelector)
    const isNewFormHelper = config => !this._anyFormHelpersWithLayoutIdentifier(config.layoutSelector)

    this.layoutConfigurations.filter(layoutSelectorExists)
                             .filter(isNewFormHelper)
                             .forEach(this._initialiseFormHelper.bind(this))
  }

  // search active formHelpers for this layoutSelector
  _anyFormHelpersWithLayoutIdentifier(identifierToSearchFor){
    return this.formHelpers.some(activeFormHelper => activeFormHelper.layoutSelector == identifierToSearchFor)
  }

  _bodyContainsElement(element) {
    document.body.contains(element)
  }

  _allElementsStillInTheDOM() {
    // check all of the elements in the formHelper and confirm they are still
    // within the page DOM. Returns false if elements are missing

    if(!this._bodyContainsElement(this.formHelperConfig.countryElement)){
      this.log("Country Element is not in the DOM")
      return false
    }

    const allElementsPresent = this.countryCodes.find((countryCode) => {
      return this._allElementsStillInTheDOMForCountryCode(countryCode)
    })

    this.log('allElementsStillInTheDOM?', allElementsPresent)
    return allElementsPresent
  }

  _allElementsStillInTheDOMForCountryCode(countryCode) {
    // Returns false if elements are missing
    const formConfig = this.formHelperConfig[countryCode]

    // If no config is provided no need to check for elements
    if (!formConfig) {
      return true
    }

    if (!this._bodyContainsElement(formConfig.searchElement)){
      this.log("Search Element is not in the DOM")
      return false
    }

    const isPresent = element => element != undefined

    const elementNotInDOM = Object.values(formConfig.elements)
                                  .filter(isPresent)
                                  .find(!this._bodyContainsElement)

    if (elementNotInDOM) {
      this.log("Element is not in the DOM", elementNotInDOM)
      return false
    }

    return true
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
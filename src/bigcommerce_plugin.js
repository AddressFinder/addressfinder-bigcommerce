import "core-js/fn/symbol" // see https://github.com/zloirock/core-js
import "core-js/fn/symbol/iterator"
import "core-js/fn/array/find"
import "core-js/fn/array/includes"
import FormHelper from "./form_helper"

export default class BigCommercePlugin {
  constructor(widgetConfig){
    this.version = "1.1.14"
    this.widgetConfig = widgetConfig
    this.layoutConfigurations = [
      {
        label: "Optimized one-page checkout (Early access)",
        layoutIdentifier: "micro-app-ng-checkout",
        countryIdentifier: 'countryCodeInput',
        searchIdentifier: "addressLine1Input",
        nz: {
          countryValue: "string:NZ",
          elements: {
            address1: 'addressLine1Input',
            suburb: 'addressLine2Input',
            city: 'cityInput',
            region: 'provinceInput',
            postcode: 'postCodeInput'
          },
          regionMappings: null
        },
        au: {
          countryValue: "string:AU",
          elements: {
            address1: 'addressLine1Input',
            address2: 'addressLine2Input',
            suburb: 'cityInput',
            state: 'provinceCodeInput',
            postcode: 'postCodeInput'
          },
          stateMappings: {
            'ACT': 'string:ACT',
            'NSW': 'string:NSW',
            'NT' : 'string:NT',
            'QLD': 'string:QLD',
            'SA' : 'string:SA',
            'TAS': 'string:TAS',
            'VIC': 'string:VIC',
            'WA' : 'string:WA'
          }
        }
      },
      {
        label: "One-page checkout (Billing details)",
        layoutIdentifier: "CheckoutStepBillingAddress",
        countryIdentifier: 'FormField_11',
        searchIdentifier: "FormField_8",
        nz: {
          countryValue: "New Zealand",
          elements: {
            address1: 'FormField_8',
            suburb: 'FormField_9',
            city: 'FormField_10',
            region: 'FormField_12',
            postcode: 'FormField_13',
          },
          regionMappings: null
        },
        au: {
          countryValue: "Australia",
          elements: {
            address1: 'FormField_8',
            address2: 'FormField_9',
            suburb: 'FormField_10',
            state: 'FormField_12',
            postcode: 'FormField_13',
          },
          stateMappings: {
            'ACT': 'Australian Capital Territory',
            'NSW': 'New South Wales',
            'NT' : 'Northern Territory',
            'QLD': 'Queensland',
            'SA' : 'South Australia',
            'TAS': 'Tasmania',
            'VIC': 'Victoria',
            'WA' : 'Western Australia'
          }
        }
      },
      {
        label: "One-page checkout (Shipping details)",
        layoutIdentifier: "CheckoutStepShippingAddress",
        countryIdentifier: "FormField_21",
        searchIdentifier: "FormField_18",
        nz: {
          countryValue: "New Zealand",
          elements: {
            address1: 'FormField_18',
            suburb: 'FormField_19',
            city: 'FormField_20',
            region: 'FormField_22',
            postcode: 'FormField_23'
          },
          regionMappings: null
        },
        au: {
          countryValue: "Australia",
          elements: {
            address1: 'FormField_18',
            address2: 'FormField_19',
            suburb: 'FormField_20',
            state: 'FormField_22',
            postcode: 'FormField_23'
          },
          stateMappings: {
            'ACT': 'Australian Capital Territory',
            'NSW': 'New South Wales',
            'NT' : 'Northern Territory',
            'QLD': 'Queensland',
            'SA' : 'South Australia',
            'TAS': 'Tasmania',
            'VIC': 'Victoria',
            'WA' : 'Western Australia'
          }
        }
      },
      {
        label: "Create account",
        layoutIdentifier: "CreateAccountForm",
        countryIdentifier: 'FormField_11',
        searchIdentifier: "FormField_8",
        nz: {
          countryValue: "New Zealand",
          elements: {
            address1: 'FormField_8',
            suburb: 'FormField_9',
            city: 'FormField_10',
            region: 'FormField_12',
            postcode: 'FormField_13',
          },
          regionMappings: null
        },
        au: {
          countryValue: "Australia",
          elements: {
            address1: 'FormField_8',
            address2: 'FormField_9',
            suburb: 'FormField_10',
            state: 'FormField_12',
            postcode: 'FormField_13',
          },
          stateMappings: {
            'ACT': 'Australian Capital Territory',
            'NSW': 'New South Wales',
            'NT' : 'Northern Territory',
            'QLD': 'Queensland',
            'SA' : 'South Australia',
            'TAS': 'Tasmania',
            'VIC': 'Victoria',
            'WA' : 'Western Australia'
          }
        }
      },

    ]
    this.formHelpers = []

    this.identifyLayout()
    this.monitorMutations()
  }

  identifyLayout(){
    for (const layoutConfig of this.layoutConfigurations) {
      let identifyingElement = document.getElementById(layoutConfig.layoutIdentifier)

      if (identifyingElement) {
        this.log(`Identified layout named: ${layoutConfig.label}`)
        this.initialiseFormHelper(layoutConfig)
      }
    }
  }

  initialiseFormHelper(layoutConfig){
    let searchElement = document.getElementById(layoutConfig.searchIdentifier)

    if (searchElement) {
      let formHelperConfig = {
        countryElement: document.getElementById(layoutConfig.countryIdentifier),
        label: layoutConfig.label,
        layoutIdentifier: layoutConfig.layoutIdentifier,
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

      let helper = new FormHelper(this.widgetConfig, formHelperConfig)
      this.formHelpers.push(helper)
    }
  }

  resetAndReloadFormHelpers(){
    const inactiveFormHelpers = this._inactiveFormHelpers()

    for (const formHelper of inactiveFormHelpers) {
      formHelper.destroy()
    }

    const activeFormHelpers = formHelper => !inactiveFormHelpers.includes(formHelper)
    this.formHelpers = this.formHelpers.filter(activeFormHelpers)

    this.identifyAdditionalLayouts()
  }

  _inactiveFormHelpers(){
    const isInactive = formHelper => !formHelper.areAllElementsStillInTheDOM()
    return this.formHelpers.filter(isInactive)
  }

  identifyAdditionalLayouts(){
    const layoutIdentifierExists = config => document.getElementById(config.layoutIdentifier)
    const isNewFormHelper = config => !this.anyFormHelpersWithLayoutIdentifier(config.layoutIdentifier)

    this.layoutConfigurations.filter(layoutIdentifierExists)
                             .filter(isNewFormHelper)
                             .forEach(this.initialiseFormHelper.bind(this))
  }

  // search active formHelpers for this layoutIdentifier
  anyFormHelpersWithLayoutIdentifier(identifierToSearchFor){
    for (const activeFormHelper of this.formHelpers) {
      if (activeFormHelper.layoutIdentifier == identifierToSearchFor) {
        return true
      }
    }

    return false
  }

  mutationHandler(mutations){
    const nonAddressFinderChange = mutation => {
      !mutation.target.classList.contains("af_list")
    }

    if (mutations.find(nonAddressFinderChange)) {
      return
    }

    if (this._mutationTimeout) {
      clearTimeout(this._mutationTimeout)
    }

    this._mutationTimeout = setTimeout(this.resetAndReloadFormHelpers.bind(this), 750)
  }

  domAttrModifiedHandler(event){
    this.mutationHandler([event])
  }

  monitorMutations(){
    if (window.MutationObserver) {
      /* for modern browsers */
      var observer = new MutationObserver(this.mutationHandler.bind(this));
      observer.observe(document.body, {childList: true, subtree: true});

    } else if (window.addEventListener) {
        /* for IE 9 and 10 */
      document.body.addEventListener('DOMAttrModified', this.domAttrModifiedHandler.bind(this), false);
    } else {
        if (window.console) {
          console.info('AddressFinder Error - please use a more modern browser')
        }
    }
  }

  log(message){
    if (this.widgetConfig.debug && window.console) {
      console.log(message)
    }
  }
}

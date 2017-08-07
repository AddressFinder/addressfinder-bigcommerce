require('./form_helper.es6');
(function(d, w) {
  w.AF = w.AF || {}

  w.AF.BigCommercePlugin = class {
    constructor(widgetConfig){
      this.version = "1.1.12"
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
      for (var i = 0; i < this.layoutConfigurations.length; i++) {
        let layoutConfig = this.layoutConfigurations[i]
        let identifyingElement = d.getElementById(layoutConfig.layoutIdentifier)

        if (identifyingElement) {
          this.log(`Identified layout named: ${layoutConfig.label}`)
          this.initialiseFormHelper(layoutConfig)
        }
      }
    }

    initialiseFormHelper(layoutConfig){
      let searchElement = d.getElementById(layoutConfig.searchIdentifier)

      if (searchElement) {
        let formHelperConfig = {
          countryElement: d.getElementById(layoutConfig.countryIdentifier),
          label: layoutConfig.label,
          layoutIdentifier: layoutConfig.layoutIdentifier,
          nz: {
            countryValue: layoutConfig.nz.countryValue,
            searchElement: d.getElementById(layoutConfig.nz.elements.address1),
            elements: {
              address_line_1_and_2: d.getElementById(layoutConfig.nz.elements.address1),
              address_line_1: null,
              address_line_2: null,
              suburb: d.getElementById(layoutConfig.nz.elements.suburb),
              city: d.getElementById(layoutConfig.nz.elements.city),
              region: d.getElementById(layoutConfig.nz.elements.region),
              postcode: d.getElementById(layoutConfig.nz.elements.postcode)
            },
            regionMappings: null
          },
          au: {
            countryValue: layoutConfig.au.countryValue,
            searchElement: d.getElementById(layoutConfig.au.elements.address1),
            elements: {
              address_line_1_and_2: null,
              address_line_1: d.getElementById(layoutConfig.au.elements.address1),
              address_line_2: d.getElementById(layoutConfig.au.elements.address2),
              locality_name: d.getElementById(layoutConfig.au.elements.suburb),
              city: null,
              state_territory: d.getElementById(layoutConfig.au.elements.state),
              postcode: d.getElementById(layoutConfig.au.elements.postcode)
            },
            stateMappings: layoutConfig.au.stateMappings
          }
        }

        let helper = new AF.FormHelper(this.widgetConfig, formHelperConfig)
        this.formHelpers.push(helper)
      }
    }

    resetAndReloadFormHelpers(){
      let activeFormHelpers = []

      for (var i = 0; i < this.formHelpers.length; i++) {
        const formHelper = this.formHelpers[i]

        // check that the formHelper is still intact
        if (formHelper.areAllElementsStillInTheDOM()) {
          this.log(`formHelper ${formHelper.label} is still active`)
          activeFormHelpers.push(formHelper)
        }
        else {
          this.log(`Destroying formHelper ${formHelper.label}`)
          formHelper.destroy()
        }
      }

      this.formHelpers = activeFormHelpers

      this.identifyAdditionalLayouts()
    }

    identifyAdditionalLayouts(){
      let layoutsToInitialise = []

      for (var i = 0; i < this.layoutConfigurations.length; i++) {
        let layoutConfig = this.layoutConfigurations[i]
        let identifierToSearchFor = layoutConfig.layoutIdentifier

        // skip if we can't find that element
        if (!d.getElementById(identifierToSearchFor)) { continue }

        // Only initialise if the formHelper is new
        if (!this.anyFormHelpersWithLayoutIdentifier(identifierToSearchFor)) {
          this.log(`Identified additional layout named: ${layoutConfig.label}`)
          layoutsToInitialise.push(layoutConfig)
        }
      }

      // initialise all the new formHelpers
      for (var i = 0; i < layoutsToInitialise.length; i++) {
        this.initialiseFormHelper(layoutsToInitialise[i])
      }
    }

    // search active formHelpers for this layoutIdentifier
    anyFormHelpersWithLayoutIdentifier(identifierToSearchFor){
      for (var j = 0; j < this.formHelpers.length; j++) {
        let activeFormHelper = this.formHelpers[j]

        if (activeFormHelper.layoutIdentifier == identifierToSearchFor) {
          return true
        }
      }

      return false
    }

    mutationHandler(mutations){
      // if all the mutations are "af_list" then do nothing extra
      let allMutationsAreFromAddressFinder = true

      for (var i = 0; i < mutations.length; i++) {
        if (!mutations[i].target.classList.contains("af_list")) {
          allMutationsAreFromAddressFinder = false
          break
        }
      }

      if (allMutationsAreFromAddressFinder) {
        // no need to continue, as they are all from us
        return
      }

      if (this._mutationTimeout) {
        clearTimeout(this._mutationTimeout)
      }

      this._mutationTimeout = setTimeout(this.resetAndReloadFormHelpers.bind(this), 750)
    }

    monitorMutations(){
      if (w.MutationObserver) {
        /* for modern browsers */
        var observer = new MutationObserver(this.mutationHandler.bind(this));
        observer.observe(d.body, {childList: true, subtree: true});

      } else if (w.addEventListener) {
          /* for IE 9 and 10 */
        d.body.addEventListener('DOMAttrModified', this.mutationHandler.bind(this), false);
      } else {
          if (w.console) {
            console.info('AddressFinder Error - please use a more modern browser')
          }
      }
    }

    log(message){
      if (this.widgetConfig.debug && w.console) {
        console.log(message)
      }
    }
  }
})(document, window);

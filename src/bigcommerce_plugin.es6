(function(d, w) {
  w.AF = w.AF || {}

  w.AF.BigCommercePlugin = class {
    constructor(config){
      this.apiConfig = config
      this.addressConfig = [
        {
          label: "Optimized one-page checkout (Early access)",
          country: 'countryCodeInput',
          search: "addressLine1Input",
          mutation: "micro-app-ng-checkout",
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
              state: 'provinceInput',
              postcode: 'postCodeInput'
            },
            stateMappings: {
              'ACT': 'string:Australian Capital Territory',
              'NSW': 'string:New South Wales',
              'NT' : 'string:Northern Territory',
              'QLD': 'string:Queensland',
              'SA' : 'string:South Australia',
              'TAS': 'string:Tasmania',
              'VIC': 'string:Victoria',
              'WA' : 'string:Western Australia'
            }
          }
        },
        {
          label: "One-page checkout (Billing details)",
          country: 'FormField_11',
          search: "FormField_8",
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
          country: "FormField_21",
          search: "FormField_18",
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
        }
      ]
      this.formHelpers = []

      this.searchForAddresses()
      this.monitorPageMutations()
    }

    searchForAddresses(){
      for (const config of this.addressConfig){
        let search = d.getElementById(config.search)

        if(search){
          console.log(`Found ${config.search}`)

          let formHelperConfig = {
            countryElement: d.getElementById(config.country),
            nz: {
              countryValue: config.nz.countryValue,
              searchElement: d.getElementById(config.nz.elements.address1),
              elements: {
                address_line_1_and_2: d.getElementById(config.nz.elements.address1),
                address_line_1: null,
                address_line_2: null,
                suburb: d.getElementById(config.nz.elements.suburb),
                city: d.getElementById(config.nz.elements.city),
                region: d.getElementById(config.nz.elements.region),
                postcode: d.getElementById(config.nz.elements.postcode)
              },
              regionMappings: null
            },
            au: {
              countryValue: config.au.countryValue,
              searchElement: d.getElementById(config.au.elements.address1),
              elements: {
                address_line_1_and_2: null,
                address_line_1: d.getElementById(config.au.elements.address1),
                address_line_2: d.getElementById(config.au.elements.address2),
                locality_name: d.getElementById(config.au.elements.suburb),
                city: null,
                state_territory: d.getElementById(config.au.elements.state),
                postcode: d.getElementById(config.au.elements.postcode)
              },
              stateValues: config.au.stateMappings
            }
          }

          let helper = new AF.FormHelper(this.apiConfig, formHelperConfig)
          this.formHelpers.push(helper)
        }
      }
    }

    resetAndReloadFormHelpers(){
      console.log("Boom, reset all the things")
      for (const helper of this.formHelpers) {
        helper.destroy()
      }

      this.formHelpers = []

      this.searchForAddresses()
    }

    resetAndReloadFormHelpersWithTimeout(){
      if (this._mutationTimeout) {
        clearTimeout(this._mutationTimeout)
      }

      this._mutationTimeout = setTimeout(() => {
        this.resetAndReloadFormHelpers()
      }, 500)
    }

    // TODO handle older versions of Internet Explorer
    // TODO use a setTimeout to avoid too many of these events running
    monitorPageMutations(){
      // TODO look for different top level elements (not just micro-app-ng-checkout)
      let billing = d.getElementById("micro-app-ng-checkout")

      if (billing && w.MutationObserver) {
        /* for modern browsers */
        var observer = new MutationObserver((mutations) => {
          this.resetAndReloadFormHelpersWithTimeout()
        });

        observer.observe(billing, {childList: true, subtree: true});
      }
    }
  }
})(document, window);

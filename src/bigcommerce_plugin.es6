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
          nz: {
            countryValue: "string:NZ",
            elements: {
              address1: 'addressLine1Input',
              suburb: 'addressLine2Input',
              city: 'cityInput',
              region: 'provinceInput',
              postcode: 'postCodeInput'
            },
            regionValues: null
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
            states: {
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
            regionValues: null
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
            states: {
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
            regionValues: null
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
            states: {
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
          let formHelperConfig = {
            nz: {
              countryValue: config.nz.countryValue,
              elements: {
                search: search,
                address1: d.getElementById(config.nz.elements.address1),
                address2: null,
                suburb: d.getElementById(config.nz.elements.suburb),
                city: d.getElementById(config.nz.elements.city),
                region: d.getElementById(config.nz.elements.region),
                postcode: d.getElementById(config.nz.elements.postcode)
              },
              regionValues: null
            },
            au: {
              countryValue: config.au.countryValue,
              elements: {
                search: search,
                address1: d.getElementById(config.au.elements.address1),
                address2: d.getElementById(config.au.elements.address2),
                suburb: d.getElementById(config.au.elements.suburb),
                city: null,
                state: d.getElementById(config.au.elements.state),
                postcode: d.getElementById(config.au.elements.postcode)
              },
              stateValues: config.au.states
            },
            country_element: d.getElementById(config.country)
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

    // TODO handle older versions of Internet Explorer
    monitorPageMutations(){
      if (w.MutationObserver) {
        /* for modern browsers */
        var observer = new MutationObserver((mutations) => {
          this.resetAndReloadFormHelpers()
        });
        let billing = d.getElementById("CheckoutStepBillingAddress")
        observer.observe(billing, {childList: true, subtree: true});
      }
    }
  }
})(document, window);

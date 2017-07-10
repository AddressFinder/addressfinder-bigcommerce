w.AF = w.AF || {}

w.AF.BigCommercePlugin = class {
  constructor(){
    this.addressGroups = [
      {
        address1: '[id=addressLine1Input]',
        address2: '[id=addressLine2Input]',
        city: ['[id=cityInput]'],
        state: ['[id=provinceInput]'],
        postcode: ['[id=postCodeInput]'],
        country: ['[id=countryCodeInput]'],
        countryValues: {
          au: "string:AU",
          nz: "string:NZ"
        },
        stateValues: {
          au: {
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
        address1: '[id=FormField_8]',
        address2: '[id=FormField_9]',
        city: '[id=FormField_10]',
        state: '[id=FormField_12]',
        postcode: '[id=FormField_13]',
        country: '[id=FormField_11]',
        countryValues: {
          au: "Australia",
          nz: "New Zealand"
        },
        stateValues: {
          au: {
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
        address1: '[id=FormField_18]',
        address2: '[id=FormField_19]',
        city: '[id=FormField_20]',
        country: '[id=FormField_21]',
        state: '[id=FormField_22]',
        postcode: '[id=FormField_23]',
        countryValues: {
          au: "Australia",
          nz: "New Zealand"
        },
        stateValues: {
          au: {
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
  }
}

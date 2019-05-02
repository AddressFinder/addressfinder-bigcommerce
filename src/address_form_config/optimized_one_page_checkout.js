export default {
  label: "Optimized one-page checkout (Early access)",
  layoutSelectors: ["#micro-app-ng-checkout"],
  countryIdentifier: '#countryCodeInput',
  searchIdentifier: "#addressLine1Input",
  nz: {
    countryValue: "string:NZ",
    elements: {
      address1: '#addressLine1Input',
      address2: null,
      suburb: '#addressLine2Input',
      city: '#cityInput',
      region: '#provinceInput',
      postcode: '#postCodeInput'
    },
    regionMappings: null
  },
  au: {
    countryValue: "string:AU",
    elements: {
      address1: '#addressLine1Input',
      address2: '#addressLine2Input',
      suburb: '#cityInput',
      state: '#provinceCodeInput',
      postcode: '#postCodeInput'
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
}
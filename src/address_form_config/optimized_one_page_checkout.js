export default {
  label: "Optimized one-page checkout (Early access)",
  layoutSelectors: ["#addressLine1Input"],
  countryIdentifier: '#countryCodeInput',
  searchIdentifier: "#addressLine1Input",
  nz: {
    countryValue: "NZ",
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
    countryValue: "AU",
    elements: {
      address1: '#addressLine1Input',
      address2: '#addressLine2Input',
      suburb: '#cityInput',
      state: '#provinceCodeInput',
      postcode: '#postCodeInput'
    },
    stateMappings: null
  }
}

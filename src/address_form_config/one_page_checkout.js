import defaultStateMappings from './default_state_mappings'

export default [
  {
    label: "One-page checkout (Billing details)",
    layoutSelectors: ["#CheckoutStepBillingAddress"],
    countryIdentifier: '#FormField_11',
    searchIdentifier: "#FormField_8",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: '#FormField_8',
        address2: null,
        suburb: '#FormField_9',
        city: '#FormField_10',
        region: '#FormField_12',
        postcode: '#FormField_13',
      },
      regionMappings: null
    },
    au: {
      countryValue: "Australia",
      elements: {
        address1: '#FormField_8',
        address2: '#FormField_9',
        suburb: '#FormField_10',
        state: '#FormField_12',
        postcode: '#FormField_13',
      },
      stateMappings: defaultStateMappings
    }
  },
  {
    label: "One-page checkout (Shipping details)",
    layoutSelectors: ["#CheckoutStepShippingAddress"],
    countryIdentifier: "#FormField_21",
    searchIdentifier: "#FormField_18",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: '#FormField_18',
        address2: null,
        suburb: '#FormField_19',
        city: '#FormField_20',
        region: '#FormField_22',
        postcode: '#FormField_23'
      },
      regionMappings: null
    },
    au: {
      countryValue: "Australia",
      elements: {
        address1: '#FormField_18',
        address2: '#FormField_19',
        suburb: '#FormField_20',
        state: '#FormField_22',
        postcode: '#FormField_23'
      },
      stateMappings: defaultStateMappings
    }
  }
]
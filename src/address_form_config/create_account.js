import defaultStateMappings from './default_state_mappings'

export default [
  {
    label: "Create account (Blueprint)",
    layoutSelector: ["#CreateAccountForm"],
    countryIdentifier: '#FormField_11',
    searchIdentifier: "#FormField_8",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: '#FormField_8',
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
    label: "Create account (Stencil)",
    layoutSelector: ["form[data-create-account-form]"],
    countryIdentifier: '#FormField_11_select',
    searchIdentifier: "#FormField_8_input",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: '#FormField_8_input',
        suburb: '#FormField_9_input',
        city: '#FormField_10_input',
        region: '#FormField_12_input',
        postcode: '#FormField_13_input',
      },
      regionMappings: null
    },
    au: {
      countryValue: "Australia",
      elements: {
        address1: '#FormField_8_input',
        address2: '#FormField_9_input',
        suburb: '#FormField_10_input',
        state: '#FormField_12_input',
        postcode: '#FormField_13_input',
      },
      stateMappings: defaultStateMappings
    }
  }
]
import defaultStateMappings from './default_state_mappings'

export default [
  {
    label: "Address book (Blueprint)",
    layoutSelector: ["#AddressEditForm"],
    countryIdentifier: "#FormField_11",
    searchIdentifier: "#FormField_8",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: "#FormField_8",
        suburb: "#FormField_9",
        city: "#FormField_10",
        region: "#FormField_12",
        postcode: "#FormField_13",
      },
      regionMappings: null
    },
    au: {
      countryValue: "Australia",
      elements: {
        address1: "#FormField_8",
        address2: "#FormField_9",
        suburb: "#FormField_10",
        state: "#FormField_12",
        postcode: "#FormField_13",
      },
      stateMappings: defaultStateMappings
    }
  },
  {
    label: "Address book - Add New Address (Stencil)",
    layoutSelector: ["form[data-address-form]", "#FormField_12_input"],
    countryIdentifier: "#FormField_11_select",
    searchIdentifier: "#FormField_8_input",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: "#FormField_8_input",
        suburb: "#FormField_9_input",
        city: "#FormField_10_input",
        region: "#FormField_12_input",
        postcode: "#FormField_13_input",
      },
      regionMappings: null
    },
    au: {
      countryValue: "Australia",
      elements: {
        address1: "#FormField_8_input",
        address2: "#FormField_9_input",
        suburb: "#FormField_10_input",
        state: "#FormField_12_input",
        postcode: "#FormField_13_input"
      },
      stateMappings: defaultStateMappings
    }
  },
  {
    label: "Address book - Edit Address (Stencil)",
    layoutSelector: ["form[data-address-form]", "#FormField_12_select"],
    countryIdentifier: "#FormField_11_select",
    searchIdentifier: "#FormField_8_input",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: "#FormField_8_input",
        suburb: "#FormField_9_input",
        city: "#FormField_10_input",
        region: "#FormField_12_select",
        postcode: "#FormField_13_input",
      },
      regionMappings: null
    },
    au: {
      countryValue: "Australia",
      elements: {
        address1: "#FormField_8_input",
        address2: "#FormField_9_input",
        suburb: "#FormField_10_input",
        state: "#FormField_12_select",
        postcode: "#FormField_13_input"
      },
      stateMappings: defaultStateMappings
    }
  }
]
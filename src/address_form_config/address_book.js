import defaultRegionMappingsToNames from './default_region_mappings_to_names'
import defaultStateMappings from './default_state_mappings'

export default [
  {
    label: "Address book (Stencil)",
    layoutSelectors: ["#FormField_12"],
    countryIdentifier: "#FormField_11",
    searchIdentifier: "#FormField_8",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: "#FormField_8",
        address2: null,
        suburb: "#FormField_9",
        city: "#FormField_10",
        region: "#FormField_12",
        postcode: "#FormField_13"
      },
      regionMappings: defaultRegionMappingsToNames
    },
    au: {
      countryValue: "Australia",
      elements: {
        address1: "#FormField_8",
        address2: "#FormField_9",
        suburb: "#FormField_10",
        state: "#FormField_12",
        postcode: "#FormField_13"
      },
      stateMappings: defaultStateMappings
    }
  },
  {
    label: "Address book - Edit Address (Stencil)",
    layoutSelectors: ["#FormField_12"],
    countryIdentifier: "#FormField_11",
    searchIdentifier: "#FormField_8",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: "#FormField_8",
        address2: null,
        suburb: "#FormField_9",
        city: "#FormField_10",
        region: "#FormField_12",
        postcode: "#FormField_13"
      },
      regionMappings: defaultRegionMappingsToNames
    },
    au: {
      countryValue: "Australia",
      elements: {
        address1: "#FormField_8",
        address2: "#FormField_9",
        suburb: "#FormField_10",
        state: "#FormField_12",
        postcode: "#FormField_13"
      },
      stateMappings: defaultStateMappings
    }
  }
]

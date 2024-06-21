import defaultRegionMappingsToNames from './default_region_mappings_to_names'
import defaultStateMappings from './default_state_mappings'
import internationalStateMappingsToNames from './international_state_mappings_to_names'

export default [
  {
    label: "Address book suffixed (Stencil)",
    layoutSelectors: ["form[data-address-form]", "#FormField_12_select"],
    countryIdentifier: "#FormField_11_select",
    searchIdentifier: "#FormField_8_input",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: "#FormField_8_input",
        address2: null,
        suburb: "#FormField_9_input",
        city: "#FormField_10_input",
        region: "#FormField_12_select",
        postcode: "#FormField_13_input"
      },
      regionMappings: defaultRegionMappingsToNames
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
    },
    int: {
      countryValue: {'Belgium': 'be', 'Canada': 'ca', 'Czechia': 'cz', 'Czech Republic': 'cz', 'Denmark': 'dk', 'France': 'fr', 'Germany': 'de', 'Ireland': 'ie', 'Netherlands': 'nl', 'Portugal': 'pt', 'Singapore': 'sg', 'Spain': 'es', 'Sweden': 'se', 'United Kingdom': 'gb', 'United States': 'us'},
      elements: {
        address1: '#FormField_8_input',
        address2: '#FormField_9_input',
        suburb: '#FormField_10_input',
        state: '#FormField_12_select',
        postcode: '#FormField_13_input',
      },
      stateMappings: internationalStateMappingsToNames,
      optionalElements: {'be': ['address_line_2', 'state_territory'], 'ca': ['address_line_2'], 'cz': ['address_line_2', 'state_territory'], 'de': ['address_line_2'], 'fr': ['address_line_2', 'state_territory'], 'dk': ['address_line_2', 'state_territory'], 'ie': ['address_line_2'], 'nl': ['address_line_2', 'state_territory'], 'pt': ['address_line_2', 'state_territory'], 'sg': ['address_line_2', 'state_territory'], 'es': ['address_line_2'], 'se': ['address_line_2', 'state_territory'], 'gb': ['address_line_2', 'state_territory'], 'us': ['address_line_2']}
    }
  },
  {
    label: "Address book - Edit Address suffixed (Stencil)",
    layoutSelectors: ["form[data-address-form]", "#FormField_12_select"],
    countryIdentifier: "#FormField_11_select",
    searchIdentifier: "#FormField_8_input",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: "#FormField_8_input",
        address2: null,
        suburb: "#FormField_9_input",
        city: "#FormField_10_input",
        region: "#FormField_12_select",
        postcode: "#FormField_13_input"
      },
      regionMappings: defaultRegionMappingsToNames
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
    },
    int: {
      countryValue: {'Belgium': 'be', 'Canada': 'ca', 'Czechia': 'cz', 'Czech Republic': 'cz', 'Denmark': 'dk', 'France': 'fr', 'Germany': 'de', 'Ireland': 'ie', 'Netherlands': 'nl', 'Portugal': 'pt', 'Singapore': 'sg', 'Spain': 'es', 'Sweden': 'se', 'United Kingdom': 'gb', 'United States': 'us'},
      elements: {
        address1: '#FormField_8_input',
        address2: '#FormField_9_input',
        suburb: '#FormField_10_input',
        state: '#FormField_12_select',
        postcode: '#FormField_13_input',
      },
      stateMappings: internationalStateMappingsToNames,
      optionalElements: {'be': ['address_line_2', 'state_territory'], 'ca': ['address_line_2'], 'cz': ['address_line_2', 'state_territory'], 'de': ['address_line_2'], 'fr': ['address_line_2', 'state_territory'], 'dk': ['address_line_2', 'state_territory'], 'ie': ['address_line_2'], 'nl': ['address_line_2', 'state_territory'], 'pt': ['address_line_2', 'state_territory'], 'sg': ['address_line_2', 'state_territory'], 'es': ['address_line_2'], 'se': ['address_line_2', 'state_territory'], 'gb': ['address_line_2', 'state_territory'], 'us': ['address_line_2']}
    }
  }
]

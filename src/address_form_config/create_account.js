import defaultRegionMappingsToNames from './default_region_mappings_to_names'
import defaultStateMappings from './default_state_mappings'
import internationalStateMappingsToNames from './international_state_mappings_to_names'

export default [
  {
    label: "Create account with Region/State input (Stencil)",
    layoutSelectors: ["#FormField_12"],
    countryIdentifier: "#FormField_11",
    searchIdentifier: "#FormField_8",
    nz: {
      countryValue: "New Zealand",
      elements: {
        address1: '#FormField_8',
        address2: null,
        suburb: '#FormField_9',
        city: '#FormField_10',
        region: '#FormField_12',
        postcode: '#FormField_13'
      },
      regionMappings: defaultRegionMappingsToNames
    },
    au: {
      countryValue: "Australia",
      elements: {
        address1: '#FormField_8',
        address2: '#FormField_9',
        suburb: '#FormField_10',
        state: '#FormField_12',
        postcode: '#FormField_13'
      },
      stateMappings: defaultStateMappings
    },
    int: {
      countryValue: {'Belgium': 'be', 'Canada': 'ca', 'Czechia': 'cz', 'Czech Republic': 'cz', 'Denmark': 'dk', 'France': 'fr', 'Germany': 'de', 'Ireland': 'ie', 'Netherlands': 'nl', 'Portugal': 'pt', 'Singapore': 'sg', 'Spain': 'es', 'Sweden': 'se', 'United Kingdom': 'gb', 'United States': 'us'},
      elements: {
        address1: '#FormField_8',
        address2: '#FormField_9',
        suburb: '#FormField_10',
        state: '#FormField_12',
        postcode: '#FormField_13',
      },
      stateMappings: internationalStateMappingsToNames,
      optionalElements: {'be': ['address_line_2', 'state_territory'], 'ca': ['address_line_2'], 'cz': ['address_line_2', 'state_territory'], 'de': ['address_line_2'], 'fr': ['address_line_2', 'state_territory'], 'dk': ['address_line_2', 'state_territory'], 'ie': ['address_line_2'], 'nl': ['address_line_2', 'state_territory'], 'pt': ['address_line_2', 'state_territory'], 'sg': ['address_line_2', 'state_territory'], 'es': ['address_line_2'], 'se': ['address_line_2', 'state_territory'], 'gb': ['address_line_2', 'state_territory'], 'us': ['address_line_2']}
    }
  }
]

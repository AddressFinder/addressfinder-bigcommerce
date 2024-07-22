import defaultRegionMappingsToNames from './default_region_mappings_to_names'
import defaultStateMappings from './default_state_mappings'
import internationalStateMappingsToNames from './international_state_mappings_to_names'

export default [
  {
    label: "Create account - Shipping address with Region/State input (Stencil)",
    layoutSelectors: ["#FormField_18"],
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
      regionMappings: defaultRegionMappingsToNames
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
    },
    int: {
      countryValue: {'Belgium': 'be', 'Canada': 'ca', 'Czechia': 'cz', 'Czech Republic': 'cz', 'Denmark': 'dk', 'France': 'fr', 'Germany': 'de', 'Ireland': 'ie', 'Netherlands': 'nl', 'Portugal': 'pt', 'Singapore': 'sg', 'Spain': 'es', 'Sweden': 'se', 'United Kingdom': 'gb', 'United States': 'us'},
      elements: {
        address1: '#FormField_18',
        address2: '#FormField_19',
        suburb: '#FormField_20',
        state: '#FormField_22',
        postcode: '#FormField_23',
      },
      stateMappings: internationalStateMappingsToNames,
      optionalElements: {'be': ['address_line_2', 'state_territory'], 'ca': ['address_line_2'], 'cz': ['address_line_2', 'state_territory'], 'de': ['address_line_2'], 'fr': ['address_line_2', 'state_territory'], 'dk': ['address_line_2', 'state_territory'], 'ie': ['address_line_2'], 'nl': ['address_line_2', 'state_territory'], 'pt': ['address_line_2', 'state_territory'], 'sg': ['address_line_2', 'state_territory'], 'es': ['address_line_2'], 'se': ['address_line_2', 'state_territory'], 'gb': ['address_line_2', 'state_territory'], 'us': ['address_line_2']}
    }
  }
]

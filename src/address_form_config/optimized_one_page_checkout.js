import defaultRegionMappingsToCodes from './default_region_mappings_to_codes'
import internationalStateMappingsToCodes from './international_state_mappings_to_codes'

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
      region: '#provinceCodeInput',
      postcode: '#postCodeInput'
    },
    regionMappings: defaultRegionMappingsToCodes
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
  },
  int: {
    countryValue: {'BE': 'be', 'CA': 'ca', 'CZ': 'cz', 'DE': 'de', 'FR': 'fr', 'DK': 'dk', 'IE': 'ie', 'NL': 'nl', 'PT': 'pt', 'SG': 'sg', 'ES': 'es', 'SE': 'se', 'GB': 'gb', 'US': 'us'},
    elements: {
      address1: '#addressLine1Input',
      address2: '#addressLine2Input',
      suburb: '#cityInput',
      state: '#provinceCodeInput',
      postcode: '#postCodeInput',
    },
    stateMappings: internationalStateMappingsToCodes,
    optionalElements: {'be': ['address_line_2', 'state_territory'], 'ca': ['address_line_2'], 'cz': ['address_line_2', 'state_territory'], 'de': ['address_line_2'], 'fr': ['address_line_2', 'state_territory'], 'dk': ['address_line_2', 'state_territory'], 'ie': ['address_line_2'], 'nl': ['address_line_2', 'state_territory'], 'pt': ['address_line_2', 'state_territory'], 'sg': ['address_line_2', 'state_territory'], 'es': ['address_line_2'], 'se': ['address_line_2', 'state_territory'], 'gb': ['address_line_2', 'state_territory'], 'us': ['address_line_2']}
  }
}

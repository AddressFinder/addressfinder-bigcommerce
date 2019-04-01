import MutationHelper from "./mutation_helper"
import optimizedOnePageCheckout from './layout_config/optimized_one_page_checkout'
import onePageCheckout from './layout_config/one_page_checkout'
import addressBook from './layout_config/address_book'
import createAccount from './layout_config/create_account'
import IdentifyLayouts from "./identify_layouts";

window.AF = window.AF || {}
window.AF.BigCommercePlugin = BigCommercePlugin

class BigCommercePlugin {
  constructor(widgetConfig){
    this.version = "1.3.0"
    this.widgetConfig = widgetConfig
    this.layoutConfigurations = [
      optimizedOnePageCheckout,
      ...onePageCheckout,
      ...addressBook,
      ...createAccount
    ]
    new IdentifyLayouts(this.layoutConfigurations, this.widgetConfig)
  }
}

// this is configured using:
//
// window.AddressFinderConfig = {
//   key: "ADDRESSFINDER_DEMO_KEY",
//   widgetOptions: {
//     byline: false
//   },
//   debug: true
// }


let _initPlugin = function(){
  window.AF._plugin = new BigCommercePlugin({
    nzKey: window.AddressFinderConfig.key_nz || window.AddressFinderConfig.key || window.AddressFinderConfig.key_au,
    auKey: window.AddressFinderConfig.key_au || window.AddressFinderConfig.key || window.AddressFinderConfig.key_nz,
    nzWidgetOptions: window.AddressFinderConfig.nzWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
    auWidgetOptions: window.AddressFinderConfig.auWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
    debug: window.AddressFinderConfig.debug || false
  })
}

let s = document.createElement('script')
s.src = 'https://api.addressfinder.io/assets/v3/widget.js'
s.async = 1
s.onload = _initPlugin
document.body.appendChild(s)


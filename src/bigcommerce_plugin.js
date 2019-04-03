import optimizedOnePageCheckout from './layout_config/optimized_one_page_checkout'
import onePageCheckout from './layout_config/one_page_checkout'
import addressBook from './layout_config/address_book'
import createAccount from './layout_config/create_account'
import PluginManager from "./plugin_manager";

window.AF = window.AF || {}

let _initPlugin = function(){

  const addressFormConfigurations = [
    optimizedOnePageCheckout,
    ...onePageCheckout,
    ...addressBook,
    ...createAccount
  ]

  const widgetConfig = {
    nzKey: window.AddressFinderConfig.key_nz || window.AddressFinderConfig.key || window.AddressFinderConfig.key_au,
    auKey: window.AddressFinderConfig.key_au || window.AddressFinderConfig.key || window.AddressFinderConfig.key_nz,
    nzWidgetOptions: window.AddressFinderConfig.nzWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
    auWidgetOptions: window.AddressFinderConfig.auWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
    debug: window.AddressFinderConfig.debug || false
  }

  window.AF._bigCommercePlugin = new PluginManager(
    addressFormConfigurations,
    widgetConfig
  )
}

let s = document.createElement('script')
s.src = 'https://api.addressfinder.io/assets/v3/widget.js'
s.async = 1
s.onload = _initPlugin
document.body.appendChild(s)


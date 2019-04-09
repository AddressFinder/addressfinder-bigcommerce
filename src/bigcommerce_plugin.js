
import "core-js/fn/symbol" // see https://github.com/zloirock/core-js
import "core-js/fn/symbol/iterator"
import "core-js/fn/string/includes"
import "core-js/fn/object/values"
import "core-js/fn/array/find"
import "core-js/fn/array/from"
import "core-js/fn/array/includes"
import "core-js/fn/array/map"
import "core-js/fn/array/filter"
var AddressFinderPlugin = require('@addressfinder/addressfinder')

import optimizedOnePageCheckout from './address_form_config/optimized_one_page_checkout'
import onePageCheckout from './address_form_config/one_page_checkout'
import addressBook from './address_form_config/address_book'
import createAccount from './address_form_config/create_account'

(function(d, w) {
  class BigcommercePlugin {
    constructor(widgetConfig) {
      this.widgetConfig = widgetConfig
      this._initPlugin()

      // Manages the mapping of the form configurations to the DOM. 
      this.PageManager = null

      // Manages the form configuraions, and creates any dynamic forms
      this.ConfigManager = new ConfigManager([
        optimizedOnePageCheckout,
        onePageCheckout,
        addressBook,
        createAccount
      ])

      // Watches for any mutations to the DOM, so we can reload our configurations when something changes.
      new AddressFinderPlugin.MutationManager({
        mutationEventHandler: this.mutationEventHandler.bind(this),
        ignoredClass: "af_list"
      })
    }

    mutationEventHandler() {
      // When the form mutates, reload our form configurations, and reload the form helpers in the page manager.
      let addressFormConfigurations = this.ConfigManager.load()
      if (this.PageManager) {
        this.PageManager.reload(addressFormConfigurations)
      }
    }

    _initPlugin(){

      this.PageManager = new AddressFinderPlugin.PageManager({
        addressFormConfigurations: this.ConfigManager.load(),
        widgetConfig: this.widgetConfig,
        eventToDispatch: 'change' 
      })
    
      window.AddressFinderPlugin._shopifyPlugin = this.PageManager
    }
  }

  function setWidgetConfig() {
    const widgetConfig = {
      nzKey: window.AddressFinderPlugin.key,
      auKey: window.AddressFinderPlugin.key,
      nzWidgetOptions: window.AddressFinderPlugin.nzWidgetOptions || window.AddressFinderPlugin.widgetOptions || {},
      auWidgetOptions: window.AddressFinderPlugin.auWidgetOptions || window.AddressFinderPlugin.widgetOptions || {},
      debug: window.AddressFinderPlugin.debug || false
    }
    
    new BigcommercePlugin(widgetConfig)
  }

  var s = document.createElement('script')
  s.src = 'https://api.addressfinder.io/assets/v3/widget.js'
  s.async = 1
  s.onload = setWidgetConfig()
  document.body.appendChild(s)

})(document, window)



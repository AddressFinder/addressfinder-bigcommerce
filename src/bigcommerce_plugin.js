
import "core-js/fn/symbol" // see https://github.com/zloirock/core-js
import "core-js/fn/symbol/iterator"
import "core-js/fn/string/includes"
import "core-js/fn/object/values"
import "core-js/fn/array/find"
import "core-js/fn/array/from"
import "core-js/fn/array/includes"
import "core-js/fn/array/map"
import "core-js/fn/array/filter"

import PageManager from "./page_manager";
import MutationManager from "./mutation_manager"
import ConfigManager from "./config_manager"

(function(d,w) {
  class BigCommercePlugin {
    constructor() {
      this.loadAF()
  
      window.AF = window.AF || {}
      this.PluginManager = null
      this.ConfigManager = new ConfigManager
  
      new MutationManager({
        mutationEventHandler: this.mutationEventHandler.bind(this),
        ignoredClass: "af_list"
      })
    }
  
    mutationEventHandler() {
      let addressFormConfigurations = this.ConfigManager.load()
      if (this.PluginManager) {
        this.PluginManager.reload(addressFormConfigurations)
      }
    }
  
    _initPlugin(){
    
      const widgetConfig = {
        nzKey: window.AddressFinderConfig.key_nz || window.AddressFinderConfig.key || window.AddressFinderConfig.key_au,
        auKey: window.AddressFinderConfig.key_au || window.AddressFinderConfig.key || window.AddressFinderConfig.key_nz,
        nzWidgetOptions: window.AddressFinderConfig.nzWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
        auWidgetOptions: window.AddressFinderConfig.auWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
        debug: window.AddressFinderConfig.debug || false
      }
  
      this.PageManager = new PageManager({
        addressFormConfigurations: this.ConfigManager.load(),
        widgetConfig,
        eventToDispatch: 'input' 
      })
    
      window.AF._bigCommercePlugin = this.PageManager
    }
  
     _addScript() {
      var s = document.createElement('script')
      s.src = 'https://api.addressfinder.io/assets/v3/widget.js'
      s.async = 1
      s.onload = this._initPlugin.bind(this)
      document.body.appendChild(s)
    }
  
    loadAF(){
      if ( window.AF && window.AF.Widget ) {
        this._initPlugin();
      } else {
        this._addScript();
      }
    }
  }
  
  new BigCommercePlugin

})(document, window)




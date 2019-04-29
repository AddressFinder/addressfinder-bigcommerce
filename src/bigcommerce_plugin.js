import { PageManager, MutationManager } from '@addressfinder/addressfinder-webpage-tools'
import ConfigManager from './config_manager'

(function(d,w) {
  class BigcommercePlugin {
    constructor() {

      this.version = "1.2.0"
  
      // Manages the mapping of the form configurations to the DOM. 
      this.PageManager = null
  
      // Manages the form configuraions, and creates any dynamic forms
      this.ConfigManager = new ConfigManager()

      new MutationManager({
        mutationEventHandler: this.mutationEventHandler.bind(this),
        ignoredClass: "af_list"
      })
  
      this._initPlugin()
    }

    mutationEventHandler() {
      // When the form mutates, reload our form configurations, and reload the form helpers in the page manager.
      let addressFormConfigurations = this.ConfigManager.load()
      if (this.PageManager) {
        this.PageManager.reload(addressFormConfigurations)
      }
    }
  
    _initPlugin(){
    
      const widgetConfig = {
        nzKey: window.AddressFinderConfig.key,
        auKey: window.AddressFinderConfig.key,
        nzWidgetOptions: window.AddressFinderConfig.nzWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
        auWidgetOptions: window.AddressFinderConfig.auWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
        debug: window.AddressFinderConfig.debug || false
      }
  
      this.PageManager = new PageManager({
        addressFormConfigurations: this.ConfigManager.load(),
        widgetConfig,
        eventToDispatch: 'change',
      })
    
      window.AddressFinder._bigcommercePlugin = this.PageManager
    }
  }
  
  var s = document.createElement('script')
  s.src = 'https://api.addressfinder.io/assets/v3/widget.js'
  s.async = 1
  s.onload = function() { new BigcommercePlugin() }
  document.body.appendChild(s)

})(document, window)



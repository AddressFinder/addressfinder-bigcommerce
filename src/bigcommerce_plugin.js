import { PageManager, MutationManager } from '@addressfinder/addressfinder-webpage-tools'
import ConfigManager from './config_manager'

(function(d,w) {
  class BigcommercePlugin {
    constructor() {

      this.version = "1.5.1"

      // Manages the mapping of the form configurations to the DOM.
      this.PageManager = null

      // Manages the form configuraions, and creates any dynamic forms
      this.ConfigManager = null

      this._initPlugin()

      this.addressfinderDebugMode = this.addressfinderDebugMode.bind(this)
      w.addressfinderDebugMode = this.addressfinderDebugMode
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
        nzKey: window.AddressFinderConfig.key_nz || window.AddressFinderConfig.key || window.AddressFinderConfig.key_au,
        auKey: window.AddressFinderConfig.key_au || window.AddressFinderConfig.key || window.AddressFinderConfig.key_nz,
        nzWidgetOptions: window.AddressFinderConfig.nzWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
        auWidgetOptions: window.AddressFinderConfig.auWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
        debug: window.AddressFinderConfig.debug || false
      }

      this.ConfigManager = new ConfigManager()

      // Listens for mutations and calls the mutationEventHandler when the DOM mutates, for example, an input field being removed from the page.
      new MutationManager({
        widgetConfig: widgetConfig,
        mutationEventHandler: this.mutationEventHandler.bind(this),
        ignoredClass: "af_list"
      })

      this.PageManager = new PageManager({
        addressFormConfigurations: this.ConfigManager.load(),
        widgetConfig,
        // When an address is selected dispatch this event on all the updated form fields. This tells the store the fields have been changed.
        formFieldChangeEventToDispatch: 'change',
        // An event listener with this event type is attached to country element. When the country changes the active country for the widget is set.
        countryChangeEventToListenFor: 'change'
      })

      this._setVersionNumbers()

      window.AddressFinder._bigcommercePlugin = this.PageManager
    }

    _setVersionNumbers() {
      // rename webpage tools version from 'version' to 'webpageToolsVersion'
      this.PageManager['webpageToolsVersion'] = this.PageManager.version
      this.PageManager.version = this.version
    }

    /*
    * When addressfinderDebugMode() is typed into the Javascript console the plugin will be reinitialised with debug set to true.
    * This allows us to debug more easily on customer sites.
    */
    addressfinderDebugMode() {
      w.AddressFinderConfig.debug = true
      this._initPlugin()
    }
  }

  var s = document.createElement('script')
  s.src = 'https://api.addressfinder.io/assets/v3/widget.js'
  s.async = 1
  s.onload = function() { new BigcommercePlugin() }
  document.body.appendChild(s)

})(document, window)



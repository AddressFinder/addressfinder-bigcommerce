import { PageManager, EmailPageManager, PhonePageManager, MutationManager } from '@addressfinder/addressfinder-webpage-tools'
import ConfigManager from './config_manager'

(function(d,w) {
  class BigcommercePlugin {
    constructor() {

      this.version = "2.3.0"

      // Manages the mapping of the form configurations to the DOM.
      this.PageManager = null

      // Manages the email mapping of the form configurations to the DOM.
      this.EmailPageManager = null

      // Manages the phone mapping of the form configurations to the DOM.
      this.PhonePageManager = null

      // Manages the form configuraions, and creates any dynamic forms
      this.ConfigManager = null

      this._initPlugin()

      this.addressfinderDebugMode = this.addressfinderDebugMode.bind(this)
      w.addressfinderDebugMode = this.addressfinderDebugMode
    }

    mutationEventHandler() {
      // When the form mutates, reload our form configurations.
      if (this.PageManager) {
        this.PageManager.reload(this.ConfigManager.load())
      }

      if (this.EmailPageManager) {
        this.EmailPageManager.reload(this.ConfigManager.loadEmailConfigurations())
      }

      if (this.PhonePageManager) {
        this.PhonePageManager.reload(this.ConfigManager.loadPhoneConfigurations())
      }
    }

    _initPlugin(){

      const widgetConfig = {
        nzKey: window.AddressFinderConfig.key_nz || window.AddressFinderConfig.key || window.AddressFinderConfig.key_au,
        auKey: window.AddressFinderConfig.key_au || window.AddressFinderConfig.key || window.AddressFinderConfig.key_nz,
        nzWidgetOptions: window.AddressFinderConfig.nzWidgetOptions || window.AddressFinderConfig.avWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
        auWidgetOptions: window.AddressFinderConfig.auWidgetOptions || window.AddressFinderConfig.avWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
        evWidgetOptions: window.AddressFinderConfig.evWidgetOptions || {},
        pvWidgetOptions: window.AddressFinderConfig.pvWidgetOptions || {},
        debug: window.AddressFinderConfig.debug || false
      }

      this.ConfigManager = new ConfigManager()

      // Listens for mutations and calls the mutationEventHandler when the DOM mutates, for example, an input field being removed from the page.
      new MutationManager({
        widgetConfig: widgetConfig,
        mutationEventHandler: this.mutationEventHandler.bind(this),
        ignoredClass: "af_list"
      })

      // Allows address widget to run if not explicitly enabled for backwards compatibility purposes.
      if (window.AddressFinderConfig.addressWidgetEnabled === undefined || window.AddressFinderConfig.addressWidgetEnabled) {
        this._initAddressWidget(widgetConfig)
      }

      if (window.AddressFinderConfig.emailWidgetEnabled) {
        this._initEmailWidget(widgetConfig)
      }

      if (window.AddressFinderConfig.phoneWidgetEnabled) {
        this._initPhoneWidget(widgetConfig)
      }
    }

    _initAddressWidget(widgetConfig) {
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

    _initEmailWidget(widgetConfig) {
      this.EmailPageManager = new EmailPageManager({
        formConfigurations: this.ConfigManager.loadEmailConfigurations(),
        widgetConfig
      })

      window.AddressFinder._bigcommerceEmailPlugin = this.EmailPageManager
    }

    _initPhoneWidget(widgetConfig) {
      this.PhonePageManager = new PhonePageManager({
        formConfigurations: this.ConfigManager.loadPhoneConfigurations(),
        widgetConfig
      })

      window.AddressFinder._bigcommercePhonePlugin = this.PhonePageManager
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

  function loadAddressfinderScript(script, callback) {
    let s = document.createElement('script')
    s.src = script
    s.async = 1
    s.onload = callback
    document.body.appendChild(s)
  }

  // Nested callbacks to load our scripts asynchronously and sequentially.
  loadAddressfinderScript('https://api.addressfinder.io/assets/v3/widget.js',
    function () { loadAddressfinderScript('https://api.addressfinder.io/assets/email/v2/widget.js',
      function () { loadAddressfinderScript('https://api.addressfinder.io/assets/phone/v2/widget.js',
        function() { new BigcommercePlugin }
      )}
    )}
  )

})(document, window)



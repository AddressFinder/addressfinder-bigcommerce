// // this is done within
// window.AddressFinderConfig = {
//   key: "ADDRESSFINDER_NZ_DEMO_KEY"
// }
require('es6-symbol/implement');
require('./bigcommerce_plugin.es6');

(function(d, w) {
  let _initPlugin = function(){
    w.AF = w.AF || {}
    w.AF._plugin = new AF.BigCommercePlugin({
      nzKey: w.AddressFinderConfig.key_nz || w.AddressFinderConfig.key || w.AddressFinderConfig.key_au,
      auKey: w.AddressFinderConfig.key_au || w.AddressFinderConfig.key || w.AddressFinderConfig.key_nz,
      nzWidgetOptions: w.AddressFinderConfig.nzWidgetOptions || w.AddressFinderConfig.widgetOptions || {},
      auWidgetOptions: w.AddressFinderConfig.auWidgetOptions || w.AddressFinderConfig.widgetOptions || {},
      debug: w.AddressFinderConfig.debug || true
    })
  }

  let s = d.createElement('script')
  s.src = 'https://api.addressfinder.io/assets/v3/widget.js'
  s.async = 1
  s.onload = _initPlugin
  d.body.appendChild(s)
})(document, window)

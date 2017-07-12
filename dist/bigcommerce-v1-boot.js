"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (d, w) {
  w.AF = w.AF || {};

  w.AF.BigCommercePlugin = function () {
    function _class(config) {
      _classCallCheck(this, _class);

      this.apiConfig = config;
      this.addressConfig = [{
        label: "Optimized one-page checkout (Early access)",
        country: 'countryCodeInput',
        search: "addressLine1Input",
        nz: {
          countryValue: "string:NZ",
          elements: {
            address1: 'addressLine1Input',
            suburb: 'addressLine2Input',
            city: 'cityInput',
            region: 'provinceInput',
            postcode: 'postCodeInput'
          },
          regionValues: null
        },
        au: {
          countryValue: "string:AU",
          elements: {
            address1: 'addressLine1Input',
            address2: 'addressLine2Input',
            suburb: 'cityInput',
            state: 'provinceInput',
            postcode: 'postCodeInput'
          },
          states: {
            'ACT': 'string:Australian Capital Territory',
            'NSW': 'string:New South Wales',
            'NT': 'string:Northern Territory',
            'QLD': 'string:Queensland',
            'SA': 'string:South Australia',
            'TAS': 'string:Tasmania',
            'VIC': 'string:Victoria',
            'WA': 'string:Western Australia'
          }
        }
      }, {
        label: "One-page checkout (Billing details)",
        country: 'FormField_11',
        search: "FormField_8",
        nz: {
          countryValue: "New Zealand",
          elements: {
            address1: 'FormField_8',
            suburb: 'FormField_9',
            city: 'FormField_10',
            region: 'FormField_12',
            postcode: 'FormField_13'
          },
          regionValues: null
        },
        au: {
          countryValue: "Australia",
          elements: {
            address1: 'FormField_8',
            address2: 'FormField_9',
            suburb: 'FormField_10',
            region: 'FormField_12',
            postcode: 'FormField_13'
          },
          states: {
            'ACT': 'Australian Capital Territory',
            'NSW': 'New South Wales',
            'NT': 'Northern Territory',
            'QLD': 'Queensland',
            'SA': 'South Australia',
            'TAS': 'Tasmania',
            'VIC': 'Victoria',
            'WA': 'Western Australia'
          }
        }
      }, {
        label: "One-page checkout (Shipping details)",
        country: "FormField_21",
        search: "FormField_18",
        nz: {
          countryValue: "New Zealand",
          elements: {
            address1: 'FormField_18',
            suburb: 'FormField_19',
            city: 'FormField_20',
            region: 'FormField_22',
            postcode: 'FormField_23'
          },
          regionValues: null
        },
        au: {
          countryValue: "Australia",
          elements: {
            address1: 'FormField_18',
            address2: 'FormField_19',
            suburb: 'FormField_20',
            state: 'FormField_22',
            postcode: 'FormField_23'
          },
          states: {
            'ACT': 'Australian Capital Territory',
            'NSW': 'New South Wales',
            'NT': 'Northern Territory',
            'QLD': 'Queensland',
            'SA': 'South Australia',
            'TAS': 'Tasmania',
            'VIC': 'Victoria',
            'WA': 'Western Australia'
          }
        }
      }];
      this.formHelpers = [];

      this.searchForAddresses();
      this.monitorPageMutations();
    }

    _createClass(_class, [{
      key: "searchForAddresses",
      value: function searchForAddresses() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.addressConfig[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var config = _step.value;

            var search = d.getElementById(config.search);

            if (search) {
              var formHelperConfig = {
                nz: {
                  countryValue: config.nz.countryValue,
                  elements: {
                    search: search,
                    address1: d.getElementById(config.nz.elements.address1),
                    address2: null,
                    suburb: d.getElementById(config.nz.elements.suburb),
                    city: d.getElementById(config.nz.elements.city),
                    region: d.getElementById(config.nz.elements.region),
                    postcode: d.getElementById(config.nz.elements.postcode)
                  },
                  regionValues: null
                },
                au: {
                  countryValue: config.au.countryValue,
                  elements: {
                    search: search,
                    address1: d.getElementById(config.au.elements.address1),
                    address2: d.getElementById(config.au.elements.address2),
                    suburb: d.getElementById(config.au.elements.suburb),
                    city: null,
                    region: d.getElementById(config.au.elements.region),
                    postcode: d.getElementById(config.au.elements.postcode)
                  },
                  stateValues: config.au.states
                },
                country_element: d.getElementById(config.country)
              };

              var helper = new AF.FormHelper(this.apiConfig, formHelperConfig);
              this.formHelpers.push(helper);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: "resetAndReloadFormHelpers",
      value: function resetAndReloadFormHelpers() {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.formHelpers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var helper = _step2.value;

            helper.destroy();
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.formHelpers = [];

        this.searchForAddresses();
      }

      // TODO handle older versions of Internet Explorer

    }, {
      key: "monitorPageMutations",
      value: function monitorPageMutations() {
        var _this = this;

        if (w.MutationObserver) {
          /* for modern browsers */
          var observer = new MutationObserver(function (mutations) {
            _this.resetAndReloadFormHelpers();
          });
          var billing = d.getElementById("CheckoutStepBillingAddress");
          observer.observe(billing, { childList: true, characterData: true, attributes: true });
        }
      }
    }]);

    return _class;
  }();
})(document, window);
//# sourceMappingURL=bigcommerce_plugin.js.map
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (d, w) {
  w.AF = w.AF || {};

  w.AF.FormHelper = function () {
    function _class(apiConfig, config) {
      _classCallCheck(this, _class);

      this.apiConfig = apiConfig;
      this.config = config;
      this.widgets = {};

      this.bindToForm();
    }

    _createClass(_class, [{
      key: "bindToForm",
      value: function bindToForm() {
        this.boundCountryChangedListener = this.countryChanged.bind(this); // save this so we can unbind in the destroy() method
        this.config.country_element.addEventListener("change", this.boundCountryChangedListener);

        var nzWidget = new w.AddressFinder.Widget(this.config.nz.elements.search, this.apiConfig.nzKey, "nz", this.apiConfig.nzWidgetOptions);
        nzWidget.on("result:select", this.nzAddressSelected.bind(this));
        this.widgets["nz"] = nzWidget;

        var auWidget = new w.AddressFinder.Widget(this.config.au.elements.search, this.apiConfig.auKey, "au", this.apiConfig.auWidgetOptions);
        auWidget.on("result:select", this.auAddressSelected.bind(this));
        this.widgets["au"] = auWidget;

        this.widgets["null"] = {
          enable: function enable() {},
          disable: function disable() {}
        };

        this.countryChanged();
      }
    }, {
      key: "countryChanged",
      value: function countryChanged() {
        switch (this.config.country_element.value) {
          case this.config.nz.countryValue:
            this.setActiveCountry("nz");
            break;
          case this.config.au.countryValue:
            this.setActiveCountry("au");
            break;
          default:
            this.setActiveCountry("null");
        }
      }
    }, {
      key: "setActiveCountry",
      value: function setActiveCountry(countryCode) {
        for (var widgetCountryCode in this.widgets) {
          this.widgets[widgetCountryCode].disable();
        }

        this.widgets[countryCode].enable();
      }
    }, {
      key: "nzAddressSelected",
      value: function nzAddressSelected(fullAddress, metaData) {
        var selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);

        if (this.config.nz.elements.address2) {
          this.config.nz.elements.address1.value = selected.address_line_1();
          this.config.nz.elements.address2.value = selected.address_line_2();
        } else {
          this.config.nz.elements.address1.value = selected.address_line_1_and_2();
        }

        this.config.nz.elements.suburb.value = selected.suburb();
        this.config.nz.elements.city.value = selected.city();
        this.config.nz.elements.postcode.value = selected.postcode();
      }
    }, {
      key: "auAddressSelected",
      value: function auAddressSelected(fullAddress, metaData) {
        var elements = this.config.au.elements;

        if (elements.address2) {
          elements.address1.value = metaData.address_line_1;
          elements.address2.value = metaData.address_line_2;
        } else {
          if (metaData.address_line_2) {
            elements.address1.value = metaData.address_line_1 + ", " + metaData.address_line_2;
          } else {
            elements.address1.value = metaData.address_line_1;
          }
        }

        elements.suburb.value = metaData.locality_name;
        elements.postcode.value = metaData.postcode;
      }

      // shuts down this object by disabling the widget and country selector

    }, {
      key: "destroy",
      value: function destroy() {
        for (var widgetCountryCode in this.widgets) {
          this.widgets[widgetCountryCode].disable();
        }

        this.widgets = [];

        this.config.country_element.removeEventListener("change", this.boundCountryChangedListener);
      }
    }]);

    return _class;
  }();
})(document, window);
//# sourceMappingURL=form_helper.js.map
'use strict';

// // this is done within
// window.AddressFinderConfig = {
//   key: "ADDRESSFINDER_NZ_DEMO_KEY"
// }

(function (d, w) {
  var _initPlugin = function _initPlugin() {
    w._plugin = new AF.BigCommercePlugin({
      nzKey: w.AddressFinderConfig.key_nz || w.AddressFinderConfig.key,
      auKey: w.AddressFinderConfig.key_au || w.AddressFinderConfig.key,
      nzWidgetOptions: w.AddressFinderConfig.nzWidgetOptions || w.AddressFinderConfig.widgetOptions,
      auWidgetOptions: w.AddressFinderConfig.auWidgetOptions || w.AddressFinderConfig.widgetOptions
    });
  };

  var s = d.createElement('script');
  s.src = 'https://api.addressfinder.io/assets/v3/widget.js';
  s.async = 1;
  s.onload = _initPlugin;
  d.body.appendChild(s);
})(document, window);
//# sourceMappingURL=index.js.map
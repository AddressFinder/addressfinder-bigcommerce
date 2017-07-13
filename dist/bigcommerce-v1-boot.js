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
        mutation: "micro-app-ng-checkout",
        nz: {
          countryValue: "string:NZ",
          elements: {
            address1: 'addressLine1Input',
            suburb: 'addressLine2Input',
            city: 'cityInput',
            region: 'provinceInput',
            postcode: 'postCodeInput'
          },
          regionMappings: null
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
          stateMappings: {
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
          regionMappings: null
        },
        au: {
          countryValue: "Australia",
          elements: {
            address1: 'FormField_8',
            address2: 'FormField_9',
            suburb: 'FormField_10',
            state: 'FormField_12',
            postcode: 'FormField_13'
          },
          stateMappings: {
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
          regionMappings: null
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
          stateMappings: {
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
              console.log("Found " + config.search);

              var formHelperConfig = {
                countryElement: d.getElementById(config.country),
                nz: {
                  countryValue: config.nz.countryValue,
                  searchElement: d.getElementById(config.nz.elements.address1),
                  elements: {
                    address_line_1_and_2: d.getElementById(config.nz.elements.address1),
                    address_line_1: null,
                    address_line_2: null,
                    suburb: d.getElementById(config.nz.elements.suburb),
                    city: d.getElementById(config.nz.elements.city),
                    region: d.getElementById(config.nz.elements.region),
                    postcode: d.getElementById(config.nz.elements.postcode)
                  },
                  regionMappings: null
                },
                au: {
                  countryValue: config.au.countryValue,
                  searchElement: d.getElementById(config.au.elements.address1),
                  elements: {
                    address_line_1_and_2: null,
                    address_line_1: d.getElementById(config.au.elements.address1),
                    address_line_2: d.getElementById(config.au.elements.address2),
                    locality_name: d.getElementById(config.au.elements.suburb),
                    city: null,
                    state_territory: d.getElementById(config.au.elements.state),
                    postcode: d.getElementById(config.au.elements.postcode)
                  },
                  stateValues: config.au.stateMappings
                }
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
        console.log("Boom, reset all the things");
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
    }, {
      key: "resetAndReloadFormHelpersWithTimeout",
      value: function resetAndReloadFormHelpersWithTimeout() {
        var _this = this;

        if (this._mutationTimeout) {
          clearTimeout(this._mutationTimeout);
        }

        this._mutationTimeout = setTimeout(function () {
          _this.resetAndReloadFormHelpers();
        }, 500);
      }

      // TODO handle older versions of Internet Explorer
      // TODO use a setTimeout to avoid too many of these events running

    }, {
      key: "monitorPageMutations",
      value: function monitorPageMutations() {
        var _this2 = this;

        // TODO look for different top level elements (not just micro-app-ng-checkout)
        var billing = d.getElementById("micro-app-ng-checkout");

        if (billing && w.MutationObserver) {
          /* for modern browsers */
          var observer = new MutationObserver(function (mutations) {
            _this2.resetAndReloadFormHelpersWithTimeout();
          });

          observer.observe(billing, { childList: true, subtree: true });
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

  /**
   * Usage:
   *
   * new FormHelper({
   *   nzKey: "AAABBB111222",
   *   auKey: "XXXYYY888999",
   *   nzWidgetOptions: {
   *     byline: false
   *   },
   *   auWidgetOptions: {}
   * }, {
   *   countryElement: document.getElementById("country"),
   *   nz: {
   *     countryValue: "NZ",
   *     searchElement: document.getElementById('FormField_18'),
   *     regionMappings: {
   *       "Auckland Region": "Auckland Region",
   *       "Bay of Plenty Region": "Bay of Plenty",
   *       "Canterbury Region": "Canterbury",
   *       "Gisborne Region": "Gisborne Region",
   *       "Hawke's Bay Region": "Hawke's Bay",
   *       "Manawatu-Wanganui Region": "Manawatu-Wanganui Region",
   *       "Marlborough Region": "Marlborough",
   *       "Nelson Region": "Nelson Region",
   *       "Northland Region": "Northland",
   *       "Otago Region": "Otago",
   *       "Southland Region": "Southland",
   *       "Taranaki Region": "Taranaki",
   *       "Tasman Region": "Tasman",
   *       "Waikato Region": "Waikato",
   *       "Wellington Region": "Wellington Region",
   *       "West Coast Region": "West Coast",
   *       "No Region": "Chatham Islands"
   *     },
   *     elements: {
   *       address_line_1_and_2: document.getElementById('FormField_18'),
   *       address_line_1: null,
   *       address_line_2: null,
   *       suburb: document.getElementById('FormField_19'),
   *       city: document.getElementById('FormField_20'),
   *       region: document.getElementById('FormField_22'),
   *       postcode: document.getElementById('FormField_23')
   *     }
   *   },
   *   au: {
   *     countryValue: "AU",
   *     searchElement: document.getElementById('FormField_18'),
   *     stateMappings: {
   *       ACT: "Australian Capital Territory",
   *       NSW: "New South Wales",
   *       NT: "Northern Territory",
   *       QLD: "Queensland",
   *       SA: "South Australia",
   *       TAS: "Tasmania",
   *       VIC: "Victoria",
   *       WA: "Western Australia"
   *     },
   *     elements: {
   *       address_line_1_and_2: null,
   *       address_line_1: document.getElementById('FormField_18'),
   *       address_line_2: document.getElementById('FormField_19'),
   *       locality_name: document.getElementById('FormField_20'),
   *       state_territory: document.getElementById('FormField_22'),
   *       postcode: document.getElementById('FormField_23')
   *     }
   *   }
   * });
   */
  w.AF.FormHelper = function () {
    function _class(apiConfig, config) {
      _classCallCheck(this, _class);

      this.apiConfig = apiConfig;
      this.config = config;
      this.widgets = {};
      this.subscriptions = {};

      this._bindToForm();
    }

    /**
     * Shuts down this object by disabling the widget and any callback handlers.
     */


    _createClass(_class, [{
      key: "destroy",
      value: function destroy() {
        for (var widgetCountryCode in this.widgets) {
          this.widgets[widgetCountryCode].destroy();
        }

        this.widgets = null;
        this.subscriptions = null;

        this.config.countryElement.removeEventListener("change", this.boundCountryChangedListener);
      }

      /**
       * Subscribe to events. Current event_name values supported:
       *
       * - "result:select:au" when an Australian address has been selected
       * - "result:select:nz" when a New Zealand address has been selected
       *
       * When an event occurs, the address metadata will be supplied as the first parameter
       */

    }, {
      key: "on",
      value: function on(event_name, callbackFunction) {
        this.subscriptions[event_name] = this.subscriptions[event_name] || [];
        this.subscriptions[event_name].push(callbackFunction);
        this;
      }
    }, {
      key: "_trigger",
      value: function _trigger(event_name, args) {
        if (this.subscriptions[event_name]) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.subscriptions[event_name][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var callback = _step.value;

              callback.apply(this, args);
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
      }
    }, {
      key: "_bindToForm",
      value: function _bindToForm() {
        this.boundCountryChangedListener = this._countryChanged.bind(this); // save this so we can unbind in the destroy() method
        this.config.countryElement.addEventListener("change", this.boundCountryChangedListener);

        var nzWidget = new w.AddressFinder.Widget(this.config.nz.searchElement, this.apiConfig.nzKey, "nz", this.apiConfig.nzWidgetOptions);
        nzWidget.on("result:select", this._nzAddressSelected.bind(this));
        this.widgets["nz"] = nzWidget;

        var auWidget = new w.AddressFinder.Widget(this.config.au.searchElement, this.apiConfig.auKey, "au", this.apiConfig.auWidgetOptions);
        auWidget.on("result:select", this._auAddressSelected.bind(this));
        this.widgets["au"] = auWidget;

        this.widgets["null"] = {
          enable: function enable() {},
          disable: function disable() {},
          destroy: function destroy() {}
        };

        this._countryChanged();
      }
    }, {
      key: "_countryChanged",
      value: function _countryChanged() {
        switch (this.config.countryElement.value) {
          case this.config.nz.countryValue:
            this._setActiveCountry("nz");
            break;
          case this.config.au.countryValue:
            this._setActiveCountry("au");
            break;
          default:
            this._setActiveCountry("null");
        }
      }
    }, {
      key: "_setActiveCountry",
      value: function _setActiveCountry(countryCode) {
        for (var widgetCountryCode in this.widgets) {
          this.widgets[widgetCountryCode].disable();
        }

        this.widgets[countryCode].enable();
      }
    }, {
      key: "_nzAddressSelected",
      value: function _nzAddressSelected(fullAddress, metaData) {
        var elements = this.config.nz.elements;
        var selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);

        if (elements.address_line_1_and_2) {
          this._setFieldValue(elements.address_line_1_and_2, selected.address_line_1_and_2(), "address_line_1_and_2");
        } else {
          this._setFieldValue(elements.address_line_1, selected.address_line_1(), "address_line_1");
          this._setFieldValue(elements.address_line_2, selected.address_line_2(), "address_line_2");
        }

        this._setFieldValue(elements.suburb, selected.suburb(), "suburb");
        this._setFieldValue(elements.city, selected.city(), "city");
        this._setFieldValue(elements.postcode, selected.postcode(), "postcode");

        if (this.config.au.regionValues) {
          var translatedRegionValue = this.config.au.regionValues[metaData.region];
          this._setFieldValue(elements.region, translatedRegionValue, "region");
        } else {
          this._setFieldValue(elements.region, metaData.region, "region");
        }

        this._trigger("result:select:nz", metaData);
      }
    }, {
      key: "_auAddressSelected",
      value: function _auAddressSelected(fullAddress, metaData) {
        var elements = this.config.au.elements;

        if (elements.address_line_1_and_2) {
          var combined = [metaData.address_line_1, metaData.address_line_2].filter(function (a) {
            return a != null;
          }).join(", ");

          this._setFieldValue(elements.address_line_1_and_2, combined, "address_line_1_and_2");
        } else {
          this._setFieldValue(elements.address_line_1, metaData.address_line_1, "address_line_1");
          this._setFieldValue(elements.address_line_2, metaData.address_line_2, "address_line_2");
        }

        this._setFieldValue(elements.locality_name, metaData.locality_name, "suburb");
        this._setFieldValue(elements.postcode, metaData.postcode, "postcode");

        if (this.config.au.stateValues) {
          var translatedStateValue = this.config.au.stateValues[metaData.state_territory];
          this._setFieldValue(elements.state_territory, translatedStateValue, "state_territory");
        } else {
          this._setFieldValue(elements.state_territory, metaData.state_territory, "state_territory");
        }

        this._trigger("result:select:au", metaData);
      }
    }, {
      key: "_setFieldValue",
      value: function _setFieldValue(field, value, fieldLabel) {
        if (field) {
          field.value = value;

          var event = document.createEvent('HTMLEvents');
          event.initEvent('change', true, false);
          field.dispatchEvent(event);

          var options = field.options;
          if (options) {
            for (var i = 0; i < options.length; i++) {
              if (field.options[i].value === value) {
                field.options[i].dispatchEvent(event);
                break;
              }
            }
          }

          return;
        }

        var errorMessage = 'AddressFinder Error: ' + 'Attempted to update value for field that could not be found.\n' + '\nField: ' + fieldLabel + '\nValue: ' + value;

        if (w.console) {
          console.warn(errorMessage);
        }
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
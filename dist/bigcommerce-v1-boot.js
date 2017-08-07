/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// // this is done within
// window.AddressFinderConfig = {
//   key: "ADDRESSFINDER_NZ_DEMO_KEY"
// }
__webpack_require__(1);

(function (d, w) {
  var _initPlugin = function _initPlugin() {
    w.AF = w.AF || {};
    w.AF._plugin = new AF.BigCommercePlugin({
      nzKey: w.AddressFinderConfig.key_nz || w.AddressFinderConfig.key || w.AddressFinderConfig.key_au,
      auKey: w.AddressFinderConfig.key_au || w.AddressFinderConfig.key || w.AddressFinderConfig.key_nz,
      nzWidgetOptions: w.AddressFinderConfig.nzWidgetOptions || w.AddressFinderConfig.widgetOptions || {},
      auWidgetOptions: w.AddressFinderConfig.auWidgetOptions || w.AddressFinderConfig.widgetOptions || {},
      debug: w.AddressFinderConfig.debug || true
    });
  };

  var s = d.createElement('script');
  s.src = 'https://api.addressfinder.io/assets/v3/widget.js';
  s.async = 1;
  s.onload = _initPlugin;
  d.body.appendChild(s);
})(document, window);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(2);
(function (d, w) {
  w.AF = w.AF || {};

  w.AF.BigCommercePlugin = function () {
    function _class(widgetConfig) {
      _classCallCheck(this, _class);

      this.version = "1.1.12";
      this.widgetConfig = widgetConfig;
      this.layoutConfigurations = [{
        label: "Optimized one-page checkout (Early access)",
        layoutIdentifier: "micro-app-ng-checkout",
        countryIdentifier: 'countryCodeInput',
        searchIdentifier: "addressLine1Input",
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
            state: 'provinceCodeInput',
            postcode: 'postCodeInput'
          },
          stateMappings: {
            'ACT': 'string:ACT',
            'NSW': 'string:NSW',
            'NT': 'string:NT',
            'QLD': 'string:QLD',
            'SA': 'string:SA',
            'TAS': 'string:TAS',
            'VIC': 'string:VIC',
            'WA': 'string:WA'
          }
        }
      }, {
        label: "One-page checkout (Billing details)",
        layoutIdentifier: "CheckoutStepBillingAddress",
        countryIdentifier: 'FormField_11',
        searchIdentifier: "FormField_8",
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
        layoutIdentifier: "CheckoutStepShippingAddress",
        countryIdentifier: "FormField_21",
        searchIdentifier: "FormField_18",
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
      }, {
        label: "Create account",
        layoutIdentifier: "CreateAccountForm",
        countryIdentifier: 'FormField_11',
        searchIdentifier: "FormField_8",
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
      }];
      this.formHelpers = [];

      this.identifyLayout();
      this.monitorMutations();
    }

    _createClass(_class, [{
      key: "identifyLayout",
      value: function identifyLayout() {
        for (var i = 0; i < this.layoutConfigurations.length; i++) {
          var layoutConfig = this.layoutConfigurations[i];
          var identifyingElement = d.getElementById(layoutConfig.layoutIdentifier);

          if (identifyingElement) {
            this.log("Identified layout named: " + layoutConfig.label);
            this.initialiseFormHelper(layoutConfig);
          }
        }
      }
    }, {
      key: "initialiseFormHelper",
      value: function initialiseFormHelper(layoutConfig) {
        var searchElement = d.getElementById(layoutConfig.searchIdentifier);

        if (searchElement) {
          var formHelperConfig = {
            countryElement: d.getElementById(layoutConfig.countryIdentifier),
            label: layoutConfig.label,
            layoutIdentifier: layoutConfig.layoutIdentifier,
            nz: {
              countryValue: layoutConfig.nz.countryValue,
              searchElement: d.getElementById(layoutConfig.nz.elements.address1),
              elements: {
                address_line_1_and_2: d.getElementById(layoutConfig.nz.elements.address1),
                address_line_1: null,
                address_line_2: null,
                suburb: d.getElementById(layoutConfig.nz.elements.suburb),
                city: d.getElementById(layoutConfig.nz.elements.city),
                region: d.getElementById(layoutConfig.nz.elements.region),
                postcode: d.getElementById(layoutConfig.nz.elements.postcode)
              },
              regionMappings: null
            },
            au: {
              countryValue: layoutConfig.au.countryValue,
              searchElement: d.getElementById(layoutConfig.au.elements.address1),
              elements: {
                address_line_1_and_2: null,
                address_line_1: d.getElementById(layoutConfig.au.elements.address1),
                address_line_2: d.getElementById(layoutConfig.au.elements.address2),
                locality_name: d.getElementById(layoutConfig.au.elements.suburb),
                city: null,
                state_territory: d.getElementById(layoutConfig.au.elements.state),
                postcode: d.getElementById(layoutConfig.au.elements.postcode)
              },
              stateMappings: layoutConfig.au.stateMappings
            }
          };

          var helper = new AF.FormHelper(this.widgetConfig, formHelperConfig);
          this.formHelpers.push(helper);
        }
      }
    }, {
      key: "resetAndReloadFormHelpers",
      value: function resetAndReloadFormHelpers() {
        var activeFormHelpers = [];

        for (var i = 0; i < this.formHelpers.length; i++) {
          var formHelper = this.formHelpers[i];

          // check that the formHelper is still intact
          if (formHelper.areAllElementsStillInTheDOM()) {
            this.log("formHelper " + formHelper.label + " is still active");
            activeFormHelpers.push(formHelper);
          } else {
            this.log("Destroying formHelper " + formHelper.label);
            formHelper.destroy();
          }
        }

        this.formHelpers = activeFormHelpers;

        this.identifyAdditionalLayouts();
      }
    }, {
      key: "identifyAdditionalLayouts",
      value: function identifyAdditionalLayouts() {
        var layoutsToInitialise = [];

        for (var i = 0; i < this.layoutConfigurations.length; i++) {
          var layoutConfig = this.layoutConfigurations[i];
          var identifierToSearchFor = layoutConfig.layoutIdentifier;

          // skip if we can't find that element
          if (!d.getElementById(identifierToSearchFor)) {
            continue;
          }

          // Only initialise if the formHelper is new
          if (!this.anyFormHelpersWithLayoutIdentifier(identifierToSearchFor)) {
            this.log("Identified additional layout named: " + layoutConfig.label);
            layoutsToInitialise.push(layoutConfig);
          }
        }

        // initialise all the new formHelpers
        for (var i = 0; i < layoutsToInitialise.length; i++) {
          this.initialiseFormHelper(layoutsToInitialise[i]);
        }
      }

      // search active formHelpers for this layoutIdentifier

    }, {
      key: "anyFormHelpersWithLayoutIdentifier",
      value: function anyFormHelpersWithLayoutIdentifier(identifierToSearchFor) {
        for (var j = 0; j < this.formHelpers.length; j++) {
          var activeFormHelper = this.formHelpers[j];

          if (activeFormHelper.layoutIdentifier == identifierToSearchFor) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: "mutationHandler",
      value: function mutationHandler(mutations) {
        // if all the mutations are "af_list" then do nothing extra
        var allMutationsAreFromAddressFinder = true;

        for (var i = 0; i < mutations.length; i++) {
          if (!mutations[i].target.classList.contains("af_list")) {
            allMutationsAreFromAddressFinder = false;
            break;
          }
        }

        if (allMutationsAreFromAddressFinder) {
          // no need to continue, as they are all from us
          return;
        }

        if (this._mutationTimeout) {
          clearTimeout(this._mutationTimeout);
        }

        this._mutationTimeout = setTimeout(this.resetAndReloadFormHelpers.bind(this), 750);
      }
    }, {
      key: "monitorMutations",
      value: function monitorMutations() {
        if (w.MutationObserver) {
          /* for modern browsers */
          var observer = new MutationObserver(this.mutationHandler.bind(this));
          observer.observe(d.body, { childList: true, subtree: true });
        } else if (w.addEventListener) {
          /* for IE 9 and 10 */
          d.body.addEventListener('DOMAttrModified', this.mutationHandler.bind(this), false);
        } else {
          if (w.console) {
            console.info('AddressFinder Error - please use a more modern browser');
          }
        }
      }
    }, {
      key: "log",
      value: function log(message) {
        if (this.widgetConfig.debug && w.console) {
          console.log(message);
        }
      }
    }]);

    return _class;
  }();
})(document, window);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
   *   auWidgetOptions: {},
   *   debug: false
   * }, {
   *   countryElement: document.getElementById("country"),
   *   nz: {
   *     countryValue: "NZ",
   *     searchElement: document.getElementById('FormField_18'),
   *     regionMappings: {
   *       "Auckland Region": "Auckland Region",
   *       "Bay Of Plenty Region": "Bay of Plenty",
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
    function _class(widgetConfig, formHelperConfig) {
      _classCallCheck(this, _class);

      this.widgetConfig = widgetConfig;
      this.formHelperConfig = formHelperConfig;
      this.widgets = {};
      this.subscriptions = {};
      this.label = formHelperConfig.label;
      this.layoutIdentifier = formHelperConfig.layoutIdentifier;

      this._bindToForm();
    }

    /**
     * Shuts down this form_helper by disabling the widget and any callback handlers.
     */


    _createClass(_class, [{
      key: "destroy",
      value: function destroy() {
        for (var widgetCountryCode in this.widgets) {
          this.widgets[widgetCountryCode].disable();
          this.widgets[widgetCountryCode].destroy();
        }

        this.widgets = null;
        this.subscriptions = [];

        this.formHelperConfig.countryElement.removeEventListener("change", this.boundCountryChangedListener);
      }

      // check all of the elements in the formHelper and confirm they are still
      // within the page DOM

    }, {
      key: "areAllElementsStillInTheDOM",
      value: function areAllElementsStillInTheDOM() {
        if (!d.body.contains(this.formHelperConfig.countryElement)) {
          this._log("Country Element is not in the DOM");
          return false;
        }

        // TODO can we aggregate the elements to check into a single array or map?

        var countryCodes = ['nz', 'au'];
        for (var i = 0; i < countryCodes.length; i++) {
          var countryCode = countryCodes[i];

          // check that the config for this country is supplied
          if (this.formHelperConfig[countryCode]) {
            if (!d.body.contains(this.formHelperConfig[countryCode].searchElement)) {
              this._log("Search Element is not in the DOM");
              return false;
            }

            for (var elementName in this.formHelperConfig[countryCode].elements) {
              if (this.formHelperConfig[countryCode].elements.hasOwnProperty(elementName)) {
                var element = this.formHelperConfig[countryCode].elements[elementName];

                if (element && !d.body.contains(element)) {
                  this._log("Element " + elementName + " is not in the DOM");
                  return false;
                }
              }
            }
          }
        }

        return true;
      }
    }, {
      key: "_bindToForm",
      value: function _bindToForm() {
        this.boundCountryChangedListener = this._countryChanged.bind(this); // save this so we can unbind in the destroy() method
        this.formHelperConfig.countryElement.addEventListener("change", this.boundCountryChangedListener);

        var nzWidget = new w.AddressFinder.Widget(this.formHelperConfig.nz.searchElement, this.widgetConfig.nzKey, "nz", this.widgetConfig.nzWidgetOptions);
        nzWidget.on("result:select", this._nzAddressSelected.bind(this));
        this.widgets["nz"] = nzWidget;

        var auWidget = new w.AddressFinder.Widget(this.formHelperConfig.au.searchElement, this.widgetConfig.auKey, "au", this.widgetConfig.auWidgetOptions);
        auWidget.on("result:select", this._auAddressSelected.bind(this));
        this.widgets["au"] = auWidget;

        this.widgets["null"] = {
          enable: function enable() {},
          disable: function disable() {},
          destroy: function destroy() {}
        };

        this._countryChanged(null, true);
      }
    }, {
      key: "_countryChanged",
      value: function _countryChanged(event, preserveValues) {
        switch (this.formHelperConfig.countryElement.value) {
          case this.formHelperConfig.nz.countryValue:
            this._setActiveCountry("nz");

            if (!preserveValues) {
              this._clearElementValues("au");
            }

            break;
          case this.formHelperConfig.au.countryValue:
            this._setActiveCountry("au");

            if (!preserveValues) {
              this._clearElementValues("nz");
            }

            break;
          default:
            this._setActiveCountry("null");

            if (!preserveValues) {
              this._clearElementValues("au");
              this._clearElementValues("nz");
            }
        }
      }
    }, {
      key: "_clearElementValues",
      value: function _clearElementValues(countryCode) {
        for (var elementName in this.formHelperConfig[countryCode].elements) {
          if (this.formHelperConfig[countryCode].elements.hasOwnProperty(elementName)) {
            var element = this.formHelperConfig[countryCode].elements[elementName];

            if (element) {
              this._setElementValue(element, null, elementName);
            }
          }
        }
      }
    }, {
      key: "_setActiveCountry",
      value: function _setActiveCountry(countryCode) {
        this._log("Setting active country " + countryCode);

        for (var widgetCountryCode in this.widgets) {
          this.widgets[widgetCountryCode].disable();
        }

        this.widgets[countryCode].enable();
      }
    }, {
      key: "_nzAddressSelected",
      value: function _nzAddressSelected(fullAddress, metaData) {
        var elements = this.formHelperConfig.nz.elements;
        var selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);

        if (elements.address_line_1_and_2) {
          this._setElementValue(elements.address_line_1_and_2, selected.address_line_1_and_2(), "address_line_1_and_2");
        } else {
          this._setElementValue(elements.address_line_1, selected.address_line_1(), "address_line_1");
          this._setElementValue(elements.address_line_2, selected.address_line_2(), "address_line_2");
        }

        this._setElementValue(elements.suburb, selected.suburb(), "suburb");
        this._setElementValue(elements.city, selected.city(), "city");
        this._setElementValue(elements.postcode, selected.postcode(), "postcode");

        if (this.formHelperConfig.nz.regionMappings) {
          var translatedRegionValue = this.formHelperConfig.nz.regionMappings[metaData.region];
          this._setElementValue(elements.region, translatedRegionValue, "region");
        } else {
          this._setElementValue(elements.region, metaData.region, "region");
        }
      }
    }, {
      key: "_auAddressSelected",
      value: function _auAddressSelected(fullAddress, metaData) {
        var elements = this.formHelperConfig.au.elements;

        if (elements.address_line_1_and_2) {
          var combined = [metaData.address_line_1, metaData.address_line_2].filter(function (a) {
            return a != null;
          }).join(", ");

          this._setElementValue(elements.address_line_1_and_2, combined, "address_line_1_and_2");
        } else {
          this._setElementValue(elements.address_line_1, metaData.address_line_1, "address_line_1");
          this._setElementValue(elements.address_line_2, metaData.address_line_2, "address_line_2");
        }

        this._setElementValue(elements.locality_name, metaData.locality_name, "suburb");
        this._setElementValue(elements.postcode, metaData.postcode, "postcode");

        if (this.formHelperConfig.au.stateMappings) {
          var translatedStateValue = this.formHelperConfig.au.stateMappings[metaData.state_territory];
          this._setElementValue(elements.state_territory, translatedStateValue, "state_territory");
        } else {
          this._setElementValue(elements.state_territory, metaData.state_territory, "state_territory");
        }
      }
    }, {
      key: "_setElementValue",
      value: function _setElementValue(element, value, elementName) {
        if (element) {
          element.value = value;

          var event = document.createEvent('HTMLEvents');
          event.initEvent('change', true, false);
          element.dispatchEvent(event);

          var options = element.options;
          if (options) {
            for (var i = 0; i < options.length; i++) {
              if (element.options[i].value == value) {
                element.options[i].dispatchEvent(event);
                break;
              }
            }
          }

          return;
        }

        var errorMessage = 'AddressFinder Error: ' + 'Attempted to update value for element that could not be found.\n' + '\nElement: ' + elementName + '\nValue: ' + value;

        if (w.console) {
          console.warn(errorMessage);
        }
      }
    }, {
      key: "_log",
      value: function _log(message) {
        if (this.widgetConfig.debug && w.console) {
          console.log("FormHelper for layout " + this.formHelperConfig.label + ": " + message);
        }
      }
    }]);

    return _class;
  }();
})(document, window);

/***/ })
/******/ ]);
//# sourceMappingURL=bigcommerce-v1-boot.js.map
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  'ACT': 'Australian Capital Territory',
  'NSW': 'New South Wales',
  'NT': 'Northern Territory',
  'QLD': 'Queensland',
  'SA': 'South Australia',
  'TAS': 'Tasmania',
  'VIC': 'Victoria',
  'WA': 'Western Australia'
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
throw new Error("Cannot find module \"./addressfinder-webpage-tools\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_manager__ = __webpack_require__(3);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




(function (d, w) {
  var BigcommercePlugin =
  /*#__PURE__*/
  function () {
    function BigcommercePlugin() {
      _classCallCheck(this, BigcommercePlugin);

      this.version = "1.5.2"; // Manages the mapping of the form configurations to the DOM.

      this.PageManager = null; // Manages the form configuraions, and creates any dynamic forms

      this.ConfigManager = null;

      this._initPlugin();

      this.addressfinderDebugMode = this.addressfinderDebugMode.bind(this);
      w.addressfinderDebugMode = this.addressfinderDebugMode;
    }

    _createClass(BigcommercePlugin, [{
      key: "mutationEventHandler",
      value: function mutationEventHandler() {
        // When the form mutates, reload our form configurations, and reload the form helpers in the page manager.
        var addressFormConfigurations = this.ConfigManager.load();

        if (this.PageManager) {
          this.PageManager.reload(addressFormConfigurations);
        }
      }
    }, {
      key: "_initPlugin",
      value: function _initPlugin() {
        var widgetConfig = {
          nzKey: window.AddressFinderConfig.key_nz || window.AddressFinderConfig.key || window.AddressFinderConfig.key_au,
          auKey: window.AddressFinderConfig.key_au || window.AddressFinderConfig.key || window.AddressFinderConfig.key_nz,
          nzWidgetOptions: window.AddressFinderConfig.nzWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
          auWidgetOptions: window.AddressFinderConfig.auWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
          debug: window.AddressFinderConfig.debug || false
        };
        this.ConfigManager = new __WEBPACK_IMPORTED_MODULE_1__config_manager__["a" /* default */](); // Listens for mutations and calls the mutationEventHandler when the DOM mutates, for example, an input field being removed from the page.

        new __WEBPACK_IMPORTED_MODULE_0__addressfinder_webpage_tools__["MutationManager"]({
          widgetConfig: widgetConfig,
          mutationEventHandler: this.mutationEventHandler.bind(this),
          ignoredClass: "af_list"
        });
        this.PageManager = new __WEBPACK_IMPORTED_MODULE_0__addressfinder_webpage_tools__["PageManager"]({
          addressFormConfigurations: this.ConfigManager.load(),
          widgetConfig: widgetConfig,
          // When an address is selected dispatch this event on all the updated form fields. This tells the store the fields have been changed.
          formFieldChangeEventToDispatch: 'change',
          // An event listener with this event type is attached to country element. When the country changes the active country for the widget is set.
          countryChangeEventToListenFor: 'change'
        });

        this._setVersionNumbers();

        window.AddressFinder._bigcommercePlugin = this.PageManager;
      }
    }, {
      key: "_setVersionNumbers",
      value: function _setVersionNumbers() {
        // rename webpage tools version from 'version' to 'webpageToolsVersion'
        this.PageManager['webpageToolsVersion'] = this.PageManager.version;
        this.PageManager.version = this.version;
      }
      /*
      * When addressfinderDebugMode() is typed into the Javascript console the plugin will be reinitialised with debug set to true.
      * This allows us to debug more easily on customer sites.
      */

    }, {
      key: "addressfinderDebugMode",
      value: function addressfinderDebugMode() {
        w.AddressFinderConfig.debug = true;

        this._initPlugin();
      }
    }]);

    return BigcommercePlugin;
  }();

  var s = document.createElement('script');
  s.src = 'https://api.addressfinder.io/assets/v3/widget.js';
  s.async = 1;

  s.onload = function () {
    new BigcommercePlugin();
  };

  document.body.appendChild(s);
})(document, window);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__address_form_config_optimized_one_page_checkout__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__address_form_config_one_page_checkout__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__address_form_config_address_book__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__address_form_config_create_account__ = __webpack_require__(7);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var ConfigManager =
/*#__PURE__*/
function () {
  function ConfigManager() {
    _classCallCheck(this, ConfigManager);
  }

  _createClass(ConfigManager, [{
    key: "load",
    value: function load() {
      // This function is called when the page mutates and returns our form configurations
      var addressFormConfigurations = [__WEBPACK_IMPORTED_MODULE_0__address_form_config_optimized_one_page_checkout__["a" /* default */]].concat(_toConsumableArray(__WEBPACK_IMPORTED_MODULE_1__address_form_config_one_page_checkout__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_2__address_form_config_address_book__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_3__address_form_config_create_account__["a" /* default */]));
      return addressFormConfigurations;
    }
  }]);

  return ConfigManager;
}();



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  label: "Optimized one-page checkout (Early access)",
  layoutSelectors: ["#addressLine1Input"],
  countryIdentifier: '#countryCodeInput',
  searchIdentifier: "#addressLine1Input",
  nz: {
    countryValue: "NZ",
    elements: {
      address1: '#addressLine1Input',
      address2: null,
      suburb: '#addressLine2Input',
      city: '#cityInput',
      region: '#provinceInput',
      postcode: '#postCodeInput'
    },
    regionMappings: null
  },
  au: {
    countryValue: "AU",
    elements: {
      address1: '#addressLine1Input',
      address2: '#addressLine2Input',
      suburb: '#cityInput',
      state: '#provinceCodeInput',
      postcode: '#postCodeInput'
    },
    stateMappings: null
  }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__default_state_mappings__ = __webpack_require__(0);

/* harmony default export */ __webpack_exports__["a"] = ([{
  label: "One-page checkout (Billing details)",
  layoutSelectors: ["#CheckoutStepBillingAddress"],
  countryIdentifier: '#FormField_11',
  searchIdentifier: "#FormField_8",
  nz: {
    countryValue: "New Zealand",
    elements: {
      address1: '#FormField_8',
      address2: null,
      suburb: '#FormField_9',
      city: '#FormField_10',
      region: '#FormField_12',
      postcode: '#FormField_13'
    },
    regionMappings: null
  },
  au: {
    countryValue: "Australia",
    elements: {
      address1: '#FormField_8',
      address2: '#FormField_9',
      suburb: '#FormField_10',
      state: '#FormField_12',
      postcode: '#FormField_13'
    },
    stateMappings: __WEBPACK_IMPORTED_MODULE_0__default_state_mappings__["a" /* default */]
  }
}, {
  label: "One-page checkout (Shipping details)",
  layoutSelectors: ["#CheckoutStepShippingAddress"],
  countryIdentifier: "#FormField_21",
  searchIdentifier: "#FormField_18",
  nz: {
    countryValue: "New Zealand",
    elements: {
      address1: '#FormField_18',
      address2: null,
      suburb: '#FormField_19',
      city: '#FormField_20',
      region: '#FormField_22',
      postcode: '#FormField_23'
    },
    regionMappings: null
  },
  au: {
    countryValue: "Australia",
    elements: {
      address1: '#FormField_18',
      address2: '#FormField_19',
      suburb: '#FormField_20',
      state: '#FormField_22',
      postcode: '#FormField_23'
    },
    stateMappings: __WEBPACK_IMPORTED_MODULE_0__default_state_mappings__["a" /* default */]
  }
}]);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__default_state_mappings__ = __webpack_require__(0);

/* harmony default export */ __webpack_exports__["a"] = ([{
  label: "Address book (Blueprint)",
  layoutSelectors: ["#AddressEditForm"],
  countryIdentifier: "#FormField_11",
  searchIdentifier: "#FormField_8",
  nz: {
    countryValue: "New Zealand",
    elements: {
      address1: "#FormField_8",
      suburb: "#FormField_9",
      city: "#FormField_10",
      region: "#FormField_12",
      postcode: "#FormField_13"
    },
    regionMappings: null
  },
  au: {
    countryValue: "Australia",
    elements: {
      address1: "#FormField_8",
      address2: "#FormField_9",
      suburb: "#FormField_10",
      state: "#FormField_12",
      postcode: "#FormField_13"
    },
    stateMappings: __WEBPACK_IMPORTED_MODULE_0__default_state_mappings__["a" /* default */]
  }
}, {
  label: "Address book (Stencil)",
  layoutSelectors: ["form[data-address-form]", "#FormField_12_input"],
  countryIdentifier: "#FormField_11_select",
  searchIdentifier: "#FormField_8_input",
  nz: {
    countryValue: "New Zealand",
    elements: {
      address1: "#FormField_8_input",
      suburb: "#FormField_9_input",
      city: "#FormField_10_input",
      region: "#FormField_12_input",
      postcode: "#FormField_13_input"
    },
    regionMappings: null
  },
  au: {
    countryValue: "Australia",
    elements: {
      address1: "#FormField_8_input",
      address2: "#FormField_9_input",
      suburb: "#FormField_10_input",
      state: "#FormField_12_input",
      postcode: "#FormField_13_input"
    },
    stateMappings: __WEBPACK_IMPORTED_MODULE_0__default_state_mappings__["a" /* default */]
  }
}, {
  label: "Address book - Edit Address (Stencil)",
  layoutSelectors: ["form[data-address-form]", "#FormField_12_select"],
  countryIdentifier: "#FormField_11_select",
  searchIdentifier: "#FormField_8_input",
  nz: {
    countryValue: "New Zealand",
    elements: {
      address1: "#FormField_8_input",
      suburb: "#FormField_9_input",
      city: "#FormField_10_input",
      region: "#FormField_12_select",
      postcode: "#FormField_13_input"
    },
    regionMappings: null
  },
  au: {
    countryValue: "Australia",
    elements: {
      address1: "#FormField_8_input",
      address2: "#FormField_9_input",
      suburb: "#FormField_10_input",
      state: "#FormField_12_select",
      postcode: "#FormField_13_input"
    },
    stateMappings: __WEBPACK_IMPORTED_MODULE_0__default_state_mappings__["a" /* default */]
  }
}]);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__default_state_mappings__ = __webpack_require__(0);

/* harmony default export */ __webpack_exports__["a"] = ([{
  label: "Create account (Blueprint)",
  layoutSelectors: ["#CreateAccountForm"],
  countryIdentifier: '#FormField_11',
  searchIdentifier: "#FormField_8",
  nz: {
    countryValue: "New Zealand",
    elements: {
      address1: '#FormField_8',
      suburb: '#FormField_9',
      city: '#FormField_10',
      region: '#FormField_12',
      postcode: '#FormField_13'
    },
    regionMappings: null
  },
  au: {
    countryValue: "Australia",
    elements: {
      address1: '#FormField_8',
      address2: '#FormField_9',
      suburb: '#FormField_10',
      state: '#FormField_12',
      postcode: '#FormField_13'
    },
    stateMappings: __WEBPACK_IMPORTED_MODULE_0__default_state_mappings__["a" /* default */]
  }
}, {
  label: "Create account with Region/State input (Stencil)",
  layoutSelectors: ["form[data-create-account-form]", "#FormField_12_input"],
  countryIdentifier: '#FormField_11_select',
  searchIdentifier: "#FormField_8_input",
  nz: {
    countryValue: "New Zealand",
    elements: {
      address1: '#FormField_8_input',
      suburb: '#FormField_9_input',
      city: '#FormField_10_input',
      region: '#FormField_12_input',
      postcode: '#FormField_13_input'
    },
    regionMappings: null
  },
  au: {
    countryValue: "Australia",
    elements: {
      address1: '#FormField_8_input',
      address2: '#FormField_9_input',
      suburb: '#FormField_10_input',
      state: '#FormField_12_input',
      postcode: '#FormField_13_input'
    },
    stateMappings: __WEBPACK_IMPORTED_MODULE_0__default_state_mappings__["a" /* default */]
  }
}, {
  label: "Create account with Region/State select (Stencil)",
  layoutSelectors: ["form[data-create-account-form]", "#FormField_12_select"],
  countryIdentifier: '#FormField_11_select',
  searchIdentifier: "#FormField_8_input",
  nz: {
    countryValue: "New Zealand",
    elements: {
      address1: '#FormField_8_input',
      suburb: '#FormField_9_input',
      city: '#FormField_10_input',
      region: '#FormField_12_select',
      postcode: '#FormField_13_input'
    },
    regionMappings: null
  },
  au: {
    countryValue: "Australia",
    elements: {
      address1: '#FormField_8_input',
      address2: '#FormField_9_input',
      suburb: '#FormField_10_input',
      state: '#FormField_12_select',
      postcode: '#FormField_13_input'
    },
    stateMappings: __WEBPACK_IMPORTED_MODULE_0__default_state_mappings__["a" /* default */]
  }
}]);

/***/ })
/******/ ]);
});
//# sourceMappingURL=bigcommerce-v1-boot.js.map
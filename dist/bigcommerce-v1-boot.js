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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it



var d              = __webpack_require__(4)
  , validateSymbol = __webpack_require__(17)

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
__webpack_require__(19);
module.exports = __webpack_require__(21);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0)() ? Symbol : __webpack_require__(1);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(5)
  , normalizeOpts = __webpack_require__(12)
  , isCallable    = __webpack_require__(13)
  , contains      = __webpack_require__(14)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(6)()
	? Object.assign
	: __webpack_require__(7);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(8)
  , value = __webpack_require__(11)

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(9)()
	? Object.keys
	: __webpack_require__(10);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) { return typeof obj === 'function'; };


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(15)()
	? String.prototype.contains
	: __webpack_require__(16);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(18);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=void 0;try{u=self}catch(t){try{u=global}catch(t){u=window}}var c=function(){function e(o,r){t(this,e),this.cursor=0,this.collection=o,this.kind=r}return e.prototype.next=function(){this.done=this.cursor===this.collection.length;var t={done:this.done,value:this.done?void 0:"value"===this.kind||"key"===this.kind?this.collection[this.cursor]:[this.cursor,this.collection[this.cursor]]};return this.cursor++,t},e}(),a=function(t){function n(r,i){e(this,n);var s=o(this,t.call(this,r,i));return s}return r(n,t),n.prototype.toString=function(){return"[object String Iterator]"},n}(c),p=function(t){function e(o,r){n(this,e);var s=i(this,t.call(this,o,r));return s}return s(e,t),e.prototype.toString=function(){return"[object Array Iterator]"},e}(c);if("function"!=typeof Array.prototype[Symbol.iterator]){var y="values"in Array.prototype,f="entries"in Array.prototype,l="keys"in Array.prototype;y||(Array.prototype.values=function(){return new p(this,"value")}),f||(Array.prototype.entries=function(){return new p(this,"key+value")}),l||(Array.prototype.keys=function(){return new p(this,"key")}),Array.prototype[Symbol.iterator]=Array.prototype.values}if("function"!=typeof String.prototype[Symbol.iterator]&&(String.prototype[Symbol.iterator]=function(){return new a(this,"value")}),"function"!=typeof NodeList.prototype[Symbol.iterator]){var h="values"in NodeList.prototype,b="entries"in NodeList.prototype,w="keys"in NodeList.prototype;h||(NodeList.prototype.values=function(){return new p(this,"value")}),b||(NodeList.prototype.entries=function(){return new p(this,"key+value")}),w||(NodeList.prototype.keys=function(){return new p(this,"key")}),NodeList.prototype[Symbol.iterator]=Array.prototype.values}}();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// // this is done within
// window.AddressFinderConfig = {
//   key: "ADDRESSFINDER_NZ_DEMO_KEY"
// }
__webpack_require__(22);
__webpack_require__(24);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!__webpack_require__(0)()) {
	Object.defineProperty(__webpack_require__(23), 'Symbol',
		{ value: __webpack_require__(1), configurable: true, enumerable: false,
			writable: true });
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = new Function("return this")();


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(25);
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
/* 25 */
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
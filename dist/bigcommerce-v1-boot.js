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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = typeof self != 'undefined' ? self : Function('return this')()
  , core   = {}
  , defineProperty = Object.defineProperty
  , hasOwnProperty = {}.hasOwnProperty
  , ceil  = Math.ceil
  , floor = Math.floor
  , max   = Math.max
  , min   = Math.min;
// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
var DESC = !!function(){
  try {
    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
var hide = createDefiner(1);
// 7.1.4 ToInteger
function toInteger(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
}
function desc(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
}
function simpleSet(object, key, value){
  object[key] = value;
  return object;
}
function createDefiner(bitmap){
  return DESC ? function(object, key, value){
    return $.setDesc(object, key, desc(bitmap, value)); // eslint-disable-line no-use-before-define
  } : simpleSet;
}

function isObject(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
}
function isFunction(it){
  return typeof it == 'function';
}
function assertDefined(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
}

var $ = module.exports = __webpack_require__(15)({
  g: global,
  core: core,
  html: global.document && document.documentElement,
  // http://jsperf.com/core-js-isobject
  isObject:   isObject,
  isFunction: isFunction,
  it: function(it){
    return it;
  },
  that: function(){
    return this;
  },
  // 7.1.4 ToInteger
  toInteger: toInteger,
  // 7.1.15 ToLength
  toLength: function(it){
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  },
  toIndex: function(index, length){
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  },
  has: function(it, key){
    return hasOwnProperty.call(it, key);
  },
  create:     Object.create,
  getProto:   Object.getPrototypeOf,
  DESC:       DESC,
  desc:       desc,
  getDesc:    Object.getOwnPropertyDescriptor,
  setDesc:    defineProperty,
  getKeys:    Object.keys,
  getNames:   Object.getOwnPropertyNames,
  getSymbols: Object.getOwnPropertySymbols,
  // Dummy, fix for not array-like ES3 string in es5 module
  assertDefined: assertDefined,
  ES5Object: Object,
  toObject: function(it){
    return $.ES5Object(assertDefined(it));
  },
  hide: hide,
  def: createDefiner(0),
  set: global.Symbol ? simpleSet : hide,
  mix: function(target, src){
    for(var key in src)hide(target, key, src[key]);
    return target;
  },
  each: [].forEach
});
if(typeof __e != 'undefined')__e = core;
if(typeof __g != 'undefined')__g = global;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0).g
  , store  = {};
module.exports = function(name){
  return store[name] || (store[name] =
    global.Symbol && global.Symbol[name] || __webpack_require__(3).safe('Symbol.' + name));
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var $          = __webpack_require__(0)
  , global     = $.g
  , core       = $.core
  , isFunction = $.isFunction;
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
global.core = core;
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {}).prototype
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    if(type & $def.B && own)exp = ctx(out, global);
    else exp = type & $def.P && isFunction(out) ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own){
      if(isGlobal)target[key] = out;
      else delete target[key] && $.hide(target, key, out);
    }
    // export
    if(exports[key] != out)$.hide(exports, key, exp);
  }
}
module.exports = $def;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var sid = 0;
function uid(key){
  return 'Symbol(' + key + ')_' + (++sid + Math.random()).toString(36);
}
uid.safe = __webpack_require__(0).g.Symbol || uid;
module.exports = uid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $                 = __webpack_require__(0)
  , ctx               = __webpack_require__(5)
  , cof               = __webpack_require__(7)
  , $def              = __webpack_require__(2)
  , assertObject      = __webpack_require__(8).obj
  , SYMBOL_ITERATOR   = __webpack_require__(1)('iterator')
  , FF_ITERATOR       = '@@iterator'
  , Iterators         = {}
  , IteratorPrototype = {};
// Safari has byggy iterators w/o `next`
var BUGGY = 'keys' in [] && !('next' in [].keys());
// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
setIterator(IteratorPrototype, $.that);
function setIterator(O, value){
  $.hide(O, SYMBOL_ITERATOR, value);
  // Add iterator for FF iterator protocol
  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
}
function defineIterator(Constructor, NAME, value, DEFAULT){
  var proto = Constructor.prototype
    , iter  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT] || value;
  // Define iterator
  if($.FW)setIterator(proto, iter);
  if(iter !== value){
    var iterProto = $.getProto(iter.call(new Constructor));
    // Set @@toStringTag to native iterators
    cof.set(iterProto, NAME + ' Iterator', true);
    // FF fix
    if($.FW)$.has(proto, FF_ITERATOR) && setIterator(iterProto, $.that);
  }
  // Plug for library
  Iterators[NAME] = iter;
  // FF & v8 fix
  Iterators[NAME + ' Iterator'] = $.that;
  return iter;
}
function getIterator(it){
  var Symbol  = $.g.Symbol
    , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
    , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
  return assertObject(getIter.call(it));
}
function closeIterator(iterator){
  var ret = iterator['return'];
  if(ret !== undefined)assertObject(ret.call(iterator));
}
function stepCall(iterator, fn, value, entries){
  try {
    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
  } catch(e){
    closeIterator(iterator);
    throw e;
  }
}
var $iter = module.exports = {
  BUGGY: BUGGY,
  Iterators: Iterators,
  prototype: IteratorPrototype,
  step: function(done, value){
    return {value: value, done: !!done};
  },
  stepCall: stepCall,
  close: closeIterator,
  is: function(it){
    var O      = Object(it)
      , Symbol = $.g.Symbol
      , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
    return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
  },
  get: getIterator,
  set: setIterator,
  create: function(Constructor, NAME, next, proto){
    Constructor.prototype = $.create(proto || $iter.prototype, {next: $.desc(1, next)});
    cof.set(Constructor, NAME + ' Iterator');
  },
  define: defineIterator,
  std: function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
    function createIter(kind){
      return function(){
        return new Constructor(this, kind);
      };
    }
    $iter.create(Constructor, NAME, next);
    var entries = createIter('key+value')
      , values  = createIter('value')
      , proto   = Base.prototype
      , methods, key;
    if(DEFAULT == 'value')values = defineIterator(Base, NAME, values, 'values');
    else entries = defineIterator(Base, NAME, entries, 'entries');
    if(DEFAULT){
      methods = {
        entries: entries,
        keys:    IS_SET ? values : createIter('key'),
        values:  values
      };
      $def($def.P + $def.F * BUGGY, NAME, methods);
      if(FORCE)for(key in methods){
        if(!(key in proto))$.hide(proto, key, methods[key]);
      }
    }
  },
  forOf: function(iterable, entries, fn, that){
    var iterator = getIterator(iterable)
      , f = ctx(fn, that, entries ? 2 : 1)
      , step;
    while(!(step = iterator.next()).done){
      if(stepCall(iterator, f, step.value, entries) === false){
        return closeIterator(iterator);
      }
    }
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Optional / simple context binding
var assertFunction = __webpack_require__(8).fn;
module.exports = function(fn, that, length){
  assertFunction(fn);
  if(~length && that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  } return function(/* ...args */){
      return fn.apply(that, arguments);
    };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var $           = __webpack_require__(0)
  , UNSCOPABLES = __webpack_require__(1)('unscopables');
if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
module.exports = function(key){
  if($.FW)[][UNSCOPABLES][key] = true;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var $        = __webpack_require__(0)
  , TAG      = __webpack_require__(1)('toStringTag')
  , toString = {}.toString;
function cof(it){
  return toString.call(it).slice(8, -1);
}
cof.classof = function(it){
  var O, T;
  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
};
cof.set = function(it, tag, stat){
  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
};
module.exports = cof;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
function assert(condition, msg1, msg2){
  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
}
assert.def = $.assertDefined;
assert.fn = function(it){
  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
  return it;
};
assert.obj = function(it){
  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
assert.inst = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
module.exports = assert;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// JavaScript 1.6 / Strawman array statics shim
var $       = __webpack_require__(0)
  , $def    = __webpack_require__(2)
  , $Array  = $.core.Array || Array
  , statics = {};
function setStatics(keys, length){
  $.each.call(keys.split(','), function(key){
    if(length == undefined && key in $Array)statics[key] = $Array[key];
    else if(key in [])statics[key] = __webpack_require__(5)(Function.call, [][key], length);
  });
}
setStatics('pop,reverse,shift,keys,values,entries', 1);
setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
           'reduce,reduceRight,copyWithin,fill,turn');
$def($def.S, 'Array', statics);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bigcommerce_plugin = __webpack_require__(12);

var _bigcommerce_plugin2 = _interopRequireDefault(_bigcommerce_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.AF = window.AF || {}; // // this is done within
// window.AddressFinderConfig = {
//   key: "ADDRESSFINDER_NZ_DEMO_KEY"
// }

window.AF.BigCommercePlugin = _bigcommerce_plugin2.default;

var _initPlugin = function _initPlugin() {
  window.AF._plugin = new AF.BigCommercePlugin({
    nzKey: window.AddressFinderConfig.key_nz || window.AddressFinderConfig.key || window.AddressFinderConfig.key_au,
    auKey: window.AddressFinderConfig.key_au || window.AddressFinderConfig.key || window.AddressFinderConfig.key_nz,
    nzWidgetOptions: window.AddressFinderConfig.nzWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
    auWidgetOptions: window.AddressFinderConfig.auWidgetOptions || window.AddressFinderConfig.widgetOptions || {},
    debug: window.AddressFinderConfig.debug || true
  });
};

var s = document.createElement('script');
s.src = 'https://api.addressfinder.io/assets/v3/widget.js';
s.async = 1;
s.onload = _initPlugin;
document.body.appendChild(s);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // see https://github.com/zloirock/core-js


__webpack_require__(13);

__webpack_require__(17);

__webpack_require__(22);

__webpack_require__(25);

var _form_helper = __webpack_require__(28);

var _form_helper2 = _interopRequireDefault(_form_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BigCommercePlugin = function () {
  function BigCommercePlugin(widgetConfig) {
    _classCallCheck(this, BigCommercePlugin);

    this.version = "1.2.1";
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

  _createClass(BigCommercePlugin, [{
    key: "identifyLayout",
    value: function identifyLayout() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.layoutConfigurations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var layoutConfig = _step.value;

          var identifyingElement = document.getElementById(layoutConfig.layoutIdentifier);

          if (identifyingElement) {
            this.log("Identified layout named: " + layoutConfig.label);
            this.initialiseFormHelper(layoutConfig);
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
    key: "initialiseFormHelper",
    value: function initialiseFormHelper(layoutConfig) {
      var searchElement = document.getElementById(layoutConfig.searchIdentifier);

      if (searchElement) {
        var formHelperConfig = {
          countryElement: document.getElementById(layoutConfig.countryIdentifier),
          label: layoutConfig.label,
          layoutIdentifier: layoutConfig.layoutIdentifier,
          nz: {
            countryValue: layoutConfig.nz.countryValue,
            searchElement: document.getElementById(layoutConfig.nz.elements.address1),
            elements: {
              address_line_1_and_2: document.getElementById(layoutConfig.nz.elements.address1),
              address_line_1: null,
              address_line_2: null,
              suburb: document.getElementById(layoutConfig.nz.elements.suburb),
              city: document.getElementById(layoutConfig.nz.elements.city),
              region: document.getElementById(layoutConfig.nz.elements.region),
              postcode: document.getElementById(layoutConfig.nz.elements.postcode)
            },
            regionMappings: null
          },
          au: {
            countryValue: layoutConfig.au.countryValue,
            searchElement: document.getElementById(layoutConfig.au.elements.address1),
            elements: {
              address_line_1_and_2: null,
              address_line_1: document.getElementById(layoutConfig.au.elements.address1),
              address_line_2: document.getElementById(layoutConfig.au.elements.address2),
              locality_name: document.getElementById(layoutConfig.au.elements.suburb),
              city: null,
              state_territory: document.getElementById(layoutConfig.au.elements.state),
              postcode: document.getElementById(layoutConfig.au.elements.postcode)
            },
            stateMappings: layoutConfig.au.stateMappings
          }
        };

        var helper = new _form_helper2.default(this.widgetConfig, formHelperConfig);
        this.formHelpers.push(helper);
      }
    }
  }, {
    key: "resetAndReloadFormHelpers",
    value: function resetAndReloadFormHelpers() {
      var inactiveFormHelpers = this._inactiveFormHelpers();

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = inactiveFormHelpers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var formHelper = _step2.value;

          formHelper.destroy();
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

      var activeFormHelpers = function activeFormHelpers(formHelper) {
        return !inactiveFormHelpers.includes(formHelper);
      };
      this.formHelpers = this.formHelpers.filter(activeFormHelpers);

      this.identifyAdditionalLayouts();
    }
  }, {
    key: "_inactiveFormHelpers",
    value: function _inactiveFormHelpers() {
      var isInactive = function isInactive(formHelper) {
        return !formHelper.areAllElementsStillInTheDOM();
      };
      return this.formHelpers.filter(isInactive);
    }
  }, {
    key: "identifyAdditionalLayouts",
    value: function identifyAdditionalLayouts() {
      var _this = this;

      var layoutIdentifierExists = function layoutIdentifierExists(config) {
        return document.getElementById(config.layoutIdentifier);
      };
      var isNewFormHelper = function isNewFormHelper(config) {
        return !_this.anyFormHelpersWithLayoutIdentifier(config.layoutIdentifier);
      };

      this.layoutConfigurations.filter(layoutIdentifierExists).filter(isNewFormHelper).forEach(this.initialiseFormHelper.bind(this));
    }

    // search active formHelpers for this layoutIdentifier

  }, {
    key: "anyFormHelpersWithLayoutIdentifier",
    value: function anyFormHelpersWithLayoutIdentifier(identifierToSearchFor) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.formHelpers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var activeFormHelper = _step3.value;

          if (activeFormHelper.layoutIdentifier == identifierToSearchFor) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return false;
    }
  }, {
    key: "mutationHandler",
    value: function mutationHandler(mutations) {
      var nonAddressFinderChange = function nonAddressFinderChange(mutation) {
        !mutation.target.classList.contains("af_list");
      };

      if (mutations.find(nonAddressFinderChange)) {
        return;
      }

      if (this._mutationTimeout) {
        clearTimeout(this._mutationTimeout);
      }

      this._mutationTimeout = setTimeout(this.resetAndReloadFormHelpers.bind(this), 750);
    }
  }, {
    key: "domAttrModifiedHandler",
    value: function domAttrModifiedHandler(event) {
      this.mutationHandler([event]);
    }
  }, {
    key: "monitorMutations",
    value: function monitorMutations() {
      if (window.MutationObserver) {
        /* for modern browsers */
        var observer = new MutationObserver(this.mutationHandler.bind(this));
        observer.observe(document.body, { childList: true, subtree: true });
      } else if (window.addEventListener) {
        /* for IE 9 and 10 */
        document.body.addEventListener('DOMAttrModified', this.domAttrModifiedHandler.bind(this), false);
      } else {
        if (window.console) {
          console.info('AddressFinder Error - please use a more modern browser');
        }
      }
    }
  }, {
    key: "log",
    value: function log(message) {
      if (this.widgetConfig.debug && window.console) {
        console.log(message);
      }
    }
  }]);

  return BigCommercePlugin;
}();

exports.default = BigCommercePlugin;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
module.exports = __webpack_require__(0).core.Symbol;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var $        = __webpack_require__(0)
  , setTag   = __webpack_require__(7).set
  , uid      = __webpack_require__(3)
  , $def     = __webpack_require__(2)
  , keyOf    = __webpack_require__(16)
  , has      = $.has
  , hide     = $.hide
  , getNames = $.getNames
  , toObject = $.toObject
  , Symbol   = $.g.Symbol
  , Base     = Symbol
  , setter   = false
  , TAG      = uid.safe('tag')
  , SymbolRegistry = {}
  , AllSymbols     = {};

function wrap(tag){
  var sym = AllSymbols[tag] = $.set($.create(Symbol.prototype), TAG, tag);
  $.DESC && setter && $.setDesc(Object.prototype, tag, {
    configurable: true,
    set: function(value){
      hide(this, tag, value);
    }
  });
  return sym;
}

// 19.4.1.1 Symbol([description])
if(!$.isFunction(Symbol)){
  Symbol = function Symbol(description){
    if(this instanceof Symbol)throw TypeError('Symbol is not a constructor');
    return wrap(uid(description));
  };
  hide(Symbol.prototype, 'toString', function(){
    return this[TAG];
  });
}
$def($def.G + $def.W, {Symbol: Symbol});

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  pure: uid.safe,
  set: $.set,
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
    'species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), function(it){
    var sym = __webpack_require__(1)(it);
    symbolStatics[it] = Symbol === Base ? sym : wrap(sym);
  }
);

setter = true;

$def($def.S, 'Symbol', symbolStatics);

$def($def.S + $def.F * (Symbol != Base), 'Object', {
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: function getOwnPropertyNames(it){
    var names = getNames(toObject(it)), result = [], key, i = 0;
    while(names.length > i)has(AllSymbols, key = names[i++]) || result.push(key);
    return result;
  },
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: function getOwnPropertySymbols(it){
    var names = getNames(toObject(it)), result = [], key, i = 0;
    while(names.length > i)has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
    return result;
  }
});

setTag(Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setTag($.g.JSON, 'JSON', true);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function($){
  $.FW   = true;
  $.path = $.g;
  return $;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(0);
module.exports = function(object, el){
  var O      = $.toObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(20);
module.exports = __webpack_require__(1)('iterator');

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var set   = __webpack_require__(0).set
  , at    = __webpack_require__(19)(true)
  , ITER  = __webpack_require__(3).safe('iter')
  , $iter = __webpack_require__(4)
  , step  = $iter.step;

// 21.1.3.27 String.prototype[@@iterator]()
$iter.std(String, 'String', function(iterated){
  set(this, ITER, {o: String(iterated), i: 0});
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , index = iter.i
    , point;
  if(index >= O.length)return step(1);
  point = at.call(O, index);
  iter.i += point.length;
  return step(0, point);
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// true  -> String#at
// false -> String#codePointAt
var $ = __webpack_require__(0);
module.exports = function(TO_STRING){
  return function(pos){
    var s = String($.assertDefined(this))
      , i = $.toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
var $           = __webpack_require__(0)
  , Iterators   = __webpack_require__(4).Iterators
  , ITERATOR    = __webpack_require__(1)('iterator')
  , ArrayValues = Iterators.Array
  , NodeList    = $.g.NodeList;
if($.FW && NodeList && !(ITERATOR in NodeList.prototype)){
  $.hide(NodeList.prototype, ITERATOR, ArrayValues);
}
Iterators.NodeList = ArrayValues;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var $          = __webpack_require__(0)
  , setUnscope = __webpack_require__(6)
  , ITER       = __webpack_require__(3).safe('iter')
  , $iter      = __webpack_require__(4)
  , step       = $iter.step
  , Iterators  = $iter.Iterators;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
$iter.std(Array, 'Array', function(iterated, kind){
  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , kind  = iter.k
    , index = iter.i++;
  if(!O || index >= O.length){
    iter.o = undefined;
    return step(1);
  }
  if(kind == 'key'  )return step(0, index);
  if(kind == 'value')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'value');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
module.exports = __webpack_require__(0).core.Array.find;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var $def = __webpack_require__(2);
$def($def.P, 'Array', {
  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
  find: __webpack_require__(24)(5)
});
__webpack_require__(6)('find');

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var $   = __webpack_require__(0)
  , ctx = __webpack_require__(5);
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function(callbackfn/*, that = undefined */){
    var O      = Object($.assertDefined(this))
      , self   = $.ES5Object(O)
      , f      = ctx(callbackfn, arguments[1], 3)
      , length = $.toLength(self.length)
      , index  = 0
      , result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(26);
module.exports = __webpack_require__(0).core.Array.includes;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/domenic/Array.prototype.includes
var $def = __webpack_require__(2);
$def($def.P, 'Array', {
  includes: __webpack_require__(27)(true)
});
__webpack_require__(6)('includes');

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// false -> Array#indexOf
// true  -> Array#includes
var $ = __webpack_require__(0);
module.exports = function(IS_INCLUDES){
  return function(el /*, fromIndex = 0 */){
    var O      = $.toObject(this)
      , length = $.toLength(O.length)
      , index  = $.toIndex(arguments[1], length)
      , value;
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(29);

__webpack_require__(30);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var FormHelper = function () {
  function FormHelper(widgetConfig, formHelperConfig) {
    _classCallCheck(this, FormHelper);

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


  _createClass(FormHelper, [{
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
      var _this = this;

      var doesntContainElement = function doesntContainElement(element) {
        return !document.body.contains(element);
      };

      if (doesntContainElement(this.formHelperConfig.countryElement)) {
        this._log("Country Element is not in the DOM");
        return false;
      }

      var countryCodes = ['nz', 'au'];
      countryCodes.map(function (countryCode) {
        var formConfig = _this.formHelperConfig[countryCode];

        // check that the config for this country is supplied
        if (formConfig) {
          if (doesntContainElement(formConfig.searchElement)) {
            _this._log("Search Element is not in the DOM");
            return false;
          }

          for (var elementName in formConfig.elements) {
            var element = formConfig.elements[elementName];
            if (element && doesntContainElement(element)) {
              _this._log("Element " + elementName + " is not in the DOM");
              return false;
            }
          }
        }
      });
      return true;
    }
  }, {
    key: "_bindToForm",
    value: function _bindToForm() {
      this.boundCountryChangedListener = this._countryChanged.bind(this); // save this so we can unbind in the destroy() method
      this.formHelperConfig.countryElement.addEventListener("change", this.boundCountryChangedListener);

      var nzWidget = new window.AddressFinder.Widget(this.formHelperConfig.nz.searchElement, this.widgetConfig.nzKey, "nz", this.widgetConfig.nzWidgetOptions);
      nzWidget.on("result:select", this._nzAddressSelected.bind(this));
      this.widgets["nz"] = nzWidget;

      var auWidget = new window.AddressFinder.Widget(this.formHelperConfig.au.searchElement, this.widgetConfig.auKey, "au", this.widgetConfig.auWidgetOptions);
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
      var _this2 = this;

      var activeCountry;
      switch (this.formHelperConfig.countryElement.value) {
        case this.formHelperConfig.nz.countryValue:
          activeCountry = "nz";
          break;
        case this.formHelperConfig.au.countryValue:
          activeCountry = "au";
          break;
        default:
          activeCountry = "null";
      }

      this._setActiveCountry(activeCountry);
      if (!preserveValues) {
        var countryCodes = ["au", "nz"];
        var isInactiveCountry = function isInactiveCountry(countryCode) {
          return countryCode != activeCountry;
        };
        countryCodes.map(function (countryCode) {
          if (isInactiveCountry(countryCode)) _this2._clearElementValues(countryCode);
        });
      }
    }
  }, {
    key: "_clearElementValues",
    value: function _clearElementValues(countryCode) {
      var elements = this.formHelperConfig[countryCode].elements;
      for (var elementName in elements) {
        var element = elements[elementName];
        if (element) this._setElementValue(element, null, elementName);
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
        var addressisNotNull = function addressisNotNull(array) {
          return array != null;
        };
        var combined = [metaData.address_line_1, metaData.address_line_2].filter(addressisNotNull).join(", ");
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
      function filter(f, x) {
        Array.prototype.filter.call(x, f);
      }
      if (element) {
        element.value = value;

        var event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        element.dispatchEvent(event);

        if (element.options) {
          var isValue = function isValue(option) {
            if (option.value == value) return option;
          };
          var option = filter(isValue, element.options);
          if (option) element.option.dispatchEvent(event);
        }
      }

      var errorMessage = 'AddressFinder Error: ' + 'Attempted to update value for element that could not be found.\n' + '\nElement: ' + elementName + '\nValue: ' + value;

      if (window.console) {
        console.warn(errorMessage);
      }
    }
  }, {
    key: "_log",
    value: function _log(message) {
      if (this.widgetConfig.debug && window.console) {
        console.log("FormHelper for layout " + this.formHelperConfig.label + ": " + message);
      }
    }
  }]);

  return FormHelper;
}();

exports.default = FormHelper;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
module.exports = __webpack_require__(0).core.Array.map;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
module.exports = __webpack_require__(0).core.Array.filter;

/***/ })
/******/ ]);
//# sourceMappingURL=bigcommerce-v1-boot.js.map
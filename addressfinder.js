/*
 * The AddressFinder plugin for BigCommerce adds an autocomplete capability to
 * the billing and shipping address fields of your online store.
 *
 * https://github.com/AbleTech/addressfinder-bigcommerce
 *
 * VERSION 1.0.2
 *
 * Copyright (c) 2016 Abletech
 */
(function(d, w) {
  /*
   * We expect BC stores to always have address fields with these IDs,
   * regardless of theme
   */
  w.fieldsForAddressType = {
    billing: {
      address_1: "FormField_8", address_2: "FormField_9", city: "FormField_10",
      country: "FormField_11", state: "FormField_12", postcode: "FormField_13"
    },
    shipping: {
      address_1: "FormField_18", address_2: "FormField_19", city: "FormField_20",
      country: "FormField_21", state: "FormField_22", postcode: "FormField_23"
    }
  };

  /************************** PRIVATE FUNCTIONS *****************************/

  /*
   * Clear all address fields (except country)
   */
  var _clearFields = function(type) {
    var fields = fieldsForAddressType[type];
    delete fields.country;

    for (field in fields) {
      d.getElementById(fields[field]).value = "";
    }
  };

  /*
   * Sets the value of the input field corresponding to a given element id.
   * If the corresponding field is not found an error message is logged to
   * console.
   */
  var _setFieldValue = function(elementId, value) {
    var field = d.getElementById(elementId);

    if (field) {
      field.value = value;

      var options = field.options;

      if (options) {
        var event = document.createEvent("HTMLEvents");
        event.initEvent("change", true, false);
        field.dispatchEvent(event);

        for (var i = 0; i < options.length; i++) {
          if (field.options[i].value === value) {
            field.dispatchEvent(event);
            break;
          }
        }
      }

      return;
    }

    var errorMessage = "AddressFinder Error: "
                       + "Attempted to update value for field that could not be found.\n"
                       + "\nField ID: " + elementId
                       + "\nValue: " + value;

    if (w.console) {
      console.log(errorMessage);
    }
  };

  /*
   * Australian addresses returned by the AF widget have abbreviated states,
   * but the dropdown from BC has the states' names in full. This function
   * looks up the appropriate state name and sets the dropdown value.
   */
  var _setAuState = function(elementId, value) {
    var statesByCode = {
      "ACT": "Australian Capital Territory",
      "NSW": "New South Wales",
      "NT" : "Northern Territory",
      "QLD": "Queensland",
      "SA" : "South Australia",
      "TAS": "Tasmania",
      "VIC": "Victoria",
      "WA" : "Western Australia"
    }
    var state = statesByCode[value];
    _setFieldValue(elementId, state);
  };


  /*
   * Populate the address fields with the NZ address returned by the AF widget
   */
  var _selectNewZealand = function(address, metaData) {
    var type = this.type,
        curr = fieldsForAddressType[type];

    /* split and trim */
    var address = metaData.postal || metaData.a;
    var addressLines = address.split(",");
    for(var i = 0; i < addressLines.length; i++) {
        addressLines[i] = addressLines[i].replace(/^\s+|\s+$/g,'');
    }

    /* remove City/Postcode */
    var city = metaData.mailtown || metaData.city;
    if(addressLines[addressLines.length-1] == city + " " + metaData.postcode) {
      addressLines.pop();
      _setFieldValue(curr.city, city);
      _setFieldValue(curr.postcode, metaData.postcode);
    }

    /* set address_2 */
    if(addressLines.length > 1) {
      _setFieldValue(curr.address_2, addressLines.pop());
    } else {
      _setFieldValue(curr.address_2, "");
    }

    _setFieldValue(curr.address_1, addressLines.join(", "));
    _setFieldValue(curr.state, metaData.region);
  };

  /*
   * Populate the address fields with the AU address returned by the AF widget
   */
  var _selectAustralia = function(address, metaData) {
    var type = this.type,
        curr = fieldsForAddressType[type];

    _setFieldValue(curr.address_1, metaData.address_line_1);
    _setFieldValue(curr.address_2, metaData.address_line_2 || "");
    _setFieldValue(curr.city, metaData.locality_name || "");
    _setAuState(curr.state, metaData.state_territory);
    _setFieldValue(curr.postcode, metaData.postcode);
  };

  /*
   * This function invokes the AF widget, and makes adjustments to the
   * address response data returned by the AF widget
   */
  var _initAF = function(elementId, key, code, onSelectFn) {
    var widget = new AddressFinder.Widget(d.getElementById(elementId), key, code);
    widget.on("result:select", onSelectFn);

    return widget;
  };

  /*
   * This function calls _initAF to invoke the AF widget and binds it to the
   * address_1 fields
   */
  var _bindToAddressPanel = function(type, elementId) {
    var addressPanel = d.getElementById(elementId);

    if (!addressPanel) return;

    var widgets = {};

    var nullWidget = {
      enable: function() { },
      disable: function() { },
      on: function() { }
    };

    if(AddressFinderConfig.key_nz){
      widgets.nz = _initAF(elementId, AddressFinderConfig.key_nz, "nz", _selectNewZealand);
      widgets.nz.type = type;
    } else {
      widgets.nz = nullWidget;
    }

    if(AddressFinderConfig.key_au){
      widgets.au = _initAF(elementId, AddressFinderConfig.key_au, "au", _selectAustralia);
      widgets.au.type = type;
    } else {
      widgets.au = nullWidget;
    }

    var countryField = fieldsForAddressType[type].country;

    var _toggleWidgets = function() {
      var selectedCountry = d.getElementById(countryField).value;

      if (selectedCountry == "New Zealand") {
        widgets.nz.enable();
        widgets.au.disable();
        _clearFields(type);
      } else if (selectedCountry == "Australia") {
        widgets.au.enable();
        widgets.nz.disable();
        _clearFields(type);
      } else {
        widgets.au.disable();
        widgets.nz.disable();
      }
    };

    /* enable/disable correct widget at start */
    _toggleWidgets();

    /* enable/disable correct widget for subsequent changes in country selected */
    d.getElementById(countryField).addEventListener("change", _toggleWidgets);

    /* ensure results are displayed */
    var addresses = d.getElementsByClassName("af_list");
    for (var i = 0; i < addresses.length; i++) {
      addresses[i].style.zIndex = 999;
    }
  };

  /*
   * We expect BC to remove the class "ExpressCheckoutBlockCollapsed" from
   * the selector when the address fields are replaced. Only when we have
   * observed this mutation do we bind an AF widget to the "address_1" field.
   */
  var _setObserver = function(addressType, elementId, oldValue) {
    if (w.MutationObserver) {

      /* for modern browsers */
      var target = d.querySelector("#" + elementId),
          config = { attributes: true, attributeOldValue: true };
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.attributeName === "class" && mutation.oldValue.indexOf(oldValue) !== -1) {
            _bindToAddressPanel(addressType, fieldsForAddressType[addressType]["address_1"]);
            observer.disconnect();
          }
        });
      });
      observer.observe(target, config);

    } else if (w.addEventListener) {

      /* for IE 9 and 10 */
      var target = d.getElementById(elementId);
      var listener = function(event) {
        if (event.attrName.toLowerCase() === "class" && event.prevValue.indexOf(oldValue) !== -1) {
          _bindToAddressPanel(addressType, fieldsForAddressType[addressType]["address_1"]);
          target.removeEventListener("DOMAttrModified", listener, false);
        }
      }
      target.addEventListener("DOMAttrModified", listener, false);

    } else {
      if (w.console) {
        console.log("AddressFinder Error - please use a more modern browser");
      }
    }
  };

  var _hasClass = function(element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
  }

  /*
   * This function binds the AF widget to the address_1 field, either directly
   * or by setting an observer and binding only after the mutation is observed
   */
  var _bindAF = function(addressType, elementId, oldValue) {
    var target = d.getElementById("CheckoutStepBillingAddress");

    if (target && _hasClass(target, "CheckoutStepBillingAddress")) {
      /*
       * For guest checkout, both billing and shipping addresses are collapsed
       */
      _setObserver(addressType, elementId, oldValue);
    } else {
      /*
       * No collapsed address block when:
       *   - customer is logged in, only shipping address is collapsed
       *   - a new account is being created
       *   - a new address is being added to an account
       *   - an existing address for an account is being edited
       */
      _bindToAddressPanel(addressType, fieldsForAddressType[addressType]["address_1"]);
    }
  };

  /*
   * This callback function invokes the AF widget
   */
  var _initPlugin = function() {
    _bindAF("billing", "CheckoutStepBillingAddress", "ExpressCheckoutBlockCollapsed");
    _bindAF("shipping", "CheckoutStepShippingAddress", "ExpressCheckoutBlockCollapsed");
  };

  /*
   * This function is called when the window DOMContentLoaded event fires.
   * It adds the AddressFinder widget script, and when it loads, calls _initAF().
   */
  var _addScript = function() {
      var s = d.createElement('script');
      s.src = 'https://api.addressfinder.io/assets/v3/widget.js';
      s.async = 1;
      s.onload = _initPlugin;
      d.body.appendChild(s);
  };
  /**************************************************************************/

  /*
   * Add the AF widget when DOM content has loaded.
   * The widget (when downloaded) will then call the initAF function
   */
  if (d.readyState != "loading") {
    _addScript();
  } else {
    d.addEventListener("DOMContentLoaded", _addScript);
  }

})(document, window);
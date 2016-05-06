/*
 * The AddressFinder plugin for BigCommerce adds an autocomplete capability to
 * the billing and shipping address fields of your online store.
 *
 * https://github.com/AbleTech/addressfinder-bigcommerce
 */
var fieldsForAddressType = {
    billing: { address_1: "FormField_8", address_2: "FormField_9", city: "FormField_10", country: "FormField_11", state: "FormField_12", postcode: "FormField_13" },
    shipping: { address_1: "FormField_18", address_2: "FormField_19", city: "FormField_20", country: "FormField_21", state: "FormField_22", postcode: "FormField_23" }
};

(function() {

  var initialiseWidget = function(elementId, key, code, onSelectFn) {
    var widget = new AddressFinder.Widget(
      document.getElementById(elementId),
      key,
      code
    );

    widget.on("result:select", onSelectFn);

    widget._getPosition = function(){
      var coords = jQuery(this.element).offset();
      coords.top += jQuery(this.element).outerHeight();
      return coords;
    }

    return widget;
  }

  var bindToAddressPanel = function(type, elementId){
    var widgets = {};

    var nullWidget = {
      enable: function() { },
      disable: function() { },
      on: function() { }
    };

    if(AddressFinderConfig.key_nz){
      widgets.nz = initialiseWidget(elementId, AddressFinderConfig.key_nz, "nz", selectNewZealand);
      widgets.nz.type = type;
    } else {
      widgets.nz = nullWidget;
    }

    if(AddressFinderConfig.key_au){
       widgets.au = initialiseWidget(elementId, AddressFinderConfig.key_au, "au", selectAustralia);
       widgets.au.type = type;
    } else {
       widgets.au = nullWidget;
    }

    var countryChangeHandler = function(clear){
      if(jQuery(this).val() == "New Zealand") {
        widgets.nz.enable();
      } else {
        widgets.nz.disable();
      }

      if(jQuery(this).val() == "Australia") {
        widgets.au.enable();
      } else {
        widgets.au.disable();
      }

      clear = clear === undefined ? true : clear;

      if (clear) {
       clearFields(type);
      }
    };

    var countryField = fieldsForAddressType[type].country;
    jQuery("#" + countryField).change(countryChangeHandler);

    // Run the countryChangeHandler first to enable/disable the currently selected country
    countryChangeHandler.bind(jQuery("#" + countryField))(false);
 };

  var clearFields = function(type) {
    var fields = fieldsForAddressType[type];
    delete fields.country;

    for (field in fields) {
       document.getElementById(fields[field]).value = "";
    }
  }

  var setState = function(elementId, value, countryCode) {
    switch (countryCode) {
      case "nz":
        setNzState(elementId, value);
        break;
      case "au":
        setAuState(elementId, value);
        break;
      default:
        setFieldValue(elementId, value);
    }
  };

  var setNzState = function(elementId, value) {
    var codeByRegion = {
      "Auckland Region"            : "AL",
      "Bay Of Plenty Region"       : "BP",
      "Canterbury Region"          : "CT",
      "Gisborne Region"            : "GI",
      "Hawke's Bay Region"         : "HB",
      "Manawatu-Wanganui Region"   : "MW",
      "Marlborough Region"         : "MB",
      "Nelson Region"              : "NS",
      "Northland Region"           : "NL",
      "Otago Region"               : "OT",
      "Southland Region"           : "SL",
      "Taranaki Region"            : "TK",
      "Tasman Region"              : "TM",
      "Waikato Region"             : "WA",
      "Wellington Region"          : "WE",
      "West Coast Region"          : "WC",
      "No Region (Chatham Islands)": null
    }
    var state = codeByRegion[value];
    setFieldValue(elementId, state);
  }

  var setAuState = function(elementId, value) {
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
    setFieldValue(elementId, state);
    jQuery("#" + elementId).trigger("change");
  };

  var selectNewZealand = function(address, metaData) {
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
      setFieldValue(curr.city, city);
      setFieldValue(curr.postcode, metaData.postcode);
    }

    /* set address_2 */
    if(addressLines.length > 1){
      setFieldValue(curr.address_2, addressLines.pop());
    } else {
      setFieldValue(curr.address_2, "");
    }

    setFieldValue(curr.address_1, addressLines.join(", "));
    setState(curr.state, metaData.region, this.country_code);
  };

  var selectAustralia = function(address, metaData) {
    var type = this.type,
        curr = fieldsForAddressType[type];

    setFieldValue(curr.address_1, metaData.address_line_1);
    setFieldValue(curr.address_2, metaData.address_line_2 || "");
    setFieldValue(curr.city, metaData.locality_name || "");
    setState(curr.state, metaData.state_territory, this.country_code);
    setFieldValue(curr.postcode, metaData.postcode);
  };

  var setFieldValue = function(elementId, value) {
    var field = document.getElementById(elementId);

    if (field) {
      field.value = value;
      return;
    }

    var errorMessage = "AddressFinder Error - unable to find an element with id: " + elementId;

    if (window.console) {
      console.log(errorMessage);
    }
  }

  /*
   * We expect BC to remove the class "ExpressCheckoutBlockCollapsed" from
   * the selector when the address fields are replaced. Only when we have
   * observed thid mutation do we bind an AF widget to the "address_1" field.
   */
  var bindWidget = function(addressType, selector, oldValue) {
    var target = document.querySelector(selector),
        config = { attributes: true, attributeOldValue: true };

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === "class" && mutation.oldValue.indexOf(oldValue) !== -1) {
          bindToAddressPanel(addressType, fieldsForAddressType[addressType]["address_1"]);
          observer.disconnect();
        }
      });
    });

    observer.observe(target, config);
  }

  var initialisePlugin = function() {
    bindWidget("billing", "#CheckoutStepBillingAddress", "ExpressCheckoutBlockCollapsed");
    bindWidget("shipping", "#CheckoutStepShippingAddress", "ExpressCheckoutBlockCollapsed");
  };

  jQuery(document).ready(function(){
    var script = document.createElement("script");
    script.src = "https://api.addressfinder.io/assets/v3/widget.js";
    script.onreadystatechange = function() {
      if (script.readyState === "complete" || script.readyState === "loaded"){
          initialisePlugin();
      }
    };
    script.onload = initialisePlugin;
    document.body.appendChild(script);
  });

})();
# AddressFinder-BigCommerce

[![addressfinder-bigcommerce plugin demo](assets/bigcommerce-nz.gif?raw=true)](https://vimeo.com/166156223)

## Description

The AddressFinder plugin for BigCommerce adds an autocomplete capability to
the billing and shipping address fields for New Zealand and Australian
BigCommerce stores.

* ***Get verified addresses*** – No more mistakes. Save addresses straight from your
  webform to your database.
* ***Access the latest addresses*** – Access addresses frequently refreshed from
  multiple sources.
* ***No software required*** – AddressFinder is a JavaScript widget and API. This
  plugin requires ZERO programming ability.

#### Supported Countries

* [Australia](https://addressfinder.com.au/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Australia&utm_content=Supported%20Countries)
* [New Zealand](https://addressfinder.nz/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=New%20Zealand&utm_content=Supported%20Countries)

Register for a free AddressFinder account at one of these links:

* [Trial Account for Australia](https://portal.addressfinder.net/signup/au/au_business_trial?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Australia&utm_content=Trial%20account%20for%20Australia)
* [Trial Account for New Zealand](https://portal.addressfinder.net/signup/nz/nz_business_trial?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=New%20Zealand&utm_content=Trial%20account%20for%20New%20Zealand)

Existing users can obtain their API key from the [AddressFinder Portal](https://portal.addressfinder.net/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=AddressFinder%20portal&utm_content=exisiting%20users).

Read more on the AddressFinder [BigCommerce Plugin](https://addressfinder.nz/docs/bigcommerce?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Bigcommerce%20Plugin&utm_content=Read%20More) page.

#### Compatibility

Addressfinder-BigCommerce requires IE10, IE11, Edge, Chrome, Safari, or Firefox.

## Installation

#### Demonstration Video

Follow the instructions below, or watch the [installation video](https://vimeo.com/166156223).

[![addressfinder-bigcommerce plugin demo](assets/bigcommerce-install-vimeo.png?raw=true)](https://vimeo.com/166156223)

#### Installation instructions
These instructions are compatible with themes from BigCommerce's new Stencil theme platform. If you created your store within the last 6 months you will have a Stencil theme. If you are unsure check the [BigCommerce documentation](https://support.bigcommerce.com/articles/Public/Which-Theme-Platform-do-I-have) for a list of themes and their platforms.

If you are using a Blueprint theme you can find the alternate setup instructions on the [AddressFinder website](https://addressfinder.com/r/plugins/bigcommerce/)

1. Open the BigCommerce Admin Dashboard
2. Click Settings in the sidebar
3. Scroll down to the Advanced section
4. Click Data solutions
5. Select 'Site Verification Tags' and click Connect

![image](https://user-images.githubusercontent.com/100241767/205749716-7083dedb-56d2-42e2-9ccc-8fa86e9f5ea0.png)

6. Copy and paste the following javascript snippet into the input field.

        <script>
        (function(d,w){
          w.AddressFinderConfig = {
            key: "ADDRESSFINDER_DEMO_KEY",
            debug: false
          }
          w.addEventListener('DOMContentLoaded', function(){
            var s = d.createElement("script");
            s.src = "https://api.addressfinder.io/assets/bigcommerce/v1/boot.js";
            s.async = 1;
            d.body.appendChild(s);
          });
        })(document, window);
        </script>

![image](https://user-images.githubusercontent.com/100241767/205750203-32b4d7d2-fdd3-4ab7-af45-2bee1f9d723b.png)

7. Replace the ADDRESSFINDER_DEMO_KEY in the snippet with your account key and click Connect.
8. Test on your website. The autocomplete service should now be working on the checkout and create account pages.

#### Obtaining a licence key

New users can register for a free AddressFinder account at one of these links:
* [Trial Account for Australia](https://portal.addressfinder.net/signup/au/au_business_trial?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Australia&utm_content=Trial%20account%20for%20Australia)
* [Trial Account for New Zealand](https://portal.addressfinder.net/signup/nz/nz_business_trial?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=New%20Zealand&utm_content=Trial%20account%20for%20New%20Zealand)

Existing users can obtain their API key from the
[AddressFinder Portal](https://portal.addressfinder.net/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=AddressFinder%20Portal&utm_content=Obtaining%20a%20licence%20key).

### Advanced Usage

If you want to adjust the default behaviour of the widget you may add additional options.These options should be added inside an object with the key 'widgetOptions' and should be in the form of key value pairs. This section may be excluded for default behaviour. For a full list of possible options visit our [Widget Documentation](https://addressfinder.nz/docs/widget_docs/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Widget%20Documentation&utm_content=Advanced%20Usage)

```
  w.AddressFinderPlugin = {
    key_nz: "ADDRESSFINDER_DEMO_KEY",
    key_au: "ADDRESSFINDER_DEMO_KEY",
    widgetOptions: {
      byline: false
    }
  };
```
### Country Specific Options
If you need to add different options for each country you can enter them in objects with the keys 'nzWidgetOptions' and 'auWidgetOptions'.

```
  w.AddressFinderPlugin = {
    key_nz: "ADDRESSFINDER_DEMO_KEY",
    key_au: "ADDRESSFINDER_DEMO_KEY",
    nzWidgetOptions: {
      byline: false
    },
    auWidgetOptions: {
      byline: true
    }
  };
```

### Enabling Email and Phone Validation
```
w.AddressFinderConfig = {
  key: "ADDRESSFINDER_DEMO_KEY",

  // Toggle each widget on/off. Options: (true/false)  
  // The address widget is enabled by default
  addressWidgetEnabled: true,
  emailWidgetEnabled: true,
  phoneWidgetEnabled: true,

  // Note: avWidgetOptions, evWidgetOptions and pvWidgetOptions objects are optional. You can optionally omit them if you prefer.

  // visit https://addressfinder.nz/docs/javascript_widget_reference_nz/ for a full list of NZ widget options
  // visit https://addressfinder.com/r/docs/javascript_widget_reference_au/ for a full list of AU widget options
  avWidgetOptions: {
    // address widget options go here
  },

  // visit https://addressfinder.com/r/docs/email/javascript-reference/ for a full list of email validation options
  evWidgetOptions: {
    check: "connection",
    rules: {
      role: {
        rule: "block",
        message: "We do not accept role email addresses, please enter a different email to continue"
      }
    }
  },

  // visit https://addressfinder.com/r/docs/phone/javascript-reference/ for a full list of phone validation options
  pvWidgetOptions: {

    // defaultCountryCode will only be used for pages where there is no country select
    defaultCountryCode: "NZ",
    allowedCountryCodes: "AU,NZ",
    
    // This will format the number after it has been verified
    // Options include: "rawNational", "formattedNational", "rawInternational", "formattedInternational"
    formatNumber: "formattedInternational",
    rules: {
      nonMobile: {
        rule: "block"
      }
    }
  },
  debug: true,
};
```

For the full list of [NZ specific options](https://addressfinder.nz/docs/widget_docs/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Widget%20Documentation&utm_content=Country%20Specific%20Options)
For the full list of [AU specific options](https://addressfinder.com.au/docs/widget_docs/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Widget%20Documentation&utm_content=Country%20Specific%20Options)

## Building the plugin

See [BUILD.md](BUILD.md) for instructions on how to build this plugin from source.

## Software License

The AddressFinder plugin for BigCommerce is released under the permissive free software [MIT License](https://github.com/AbleTech/addressfinder-bigcommerce/blob/master/LICENCE.md).

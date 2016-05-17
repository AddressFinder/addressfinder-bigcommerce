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

* [Australia](https://addressfinder.com.au/)
* [New Zealand](https://addressfinder.nz/)

#### Compatibility

Addressfinder-BigCommerce requires IE9 or higher, Chrome, Safari, or Firefox.

## Installation

#### Demonstration Video

Follow the instructions below, or watch the [installation video](https://vimeo.com/166156223).

[![addressfinder-bigcommerce plugin demo](assets/bigcommerce-install-vimeo.png?raw=true)](https://vimeo.com/166156223)


#### Installation instructions

You will need to:

1.  Log into the control panel for your site, and navigate to Store Setup > Design.
2.  Your current theme will be displayed in the Themes tab; click Edit HTML/CSS
    to access your template files.
3.  Find each of these template files and insert the javascript snippet below.
    You should insert the snippet just before the closing `</body>` tag.

    * checkout_express.html
    * createaccount.html
    * shippingaddressform.html

    ```
    <script>
    (function(d,w){
      w.AddressFinderConfig = {
        key_nz: "MY_NZ_AF_KEY",
        key_au: "MY_AU_AF_KEY"
      };
      w.addEventListener('DOMContentLoaded', function(){
        var s = d.createElement("script");
        s.src = "https://api.addressfinder.io/assets/bigcommerce/v1/boot.js";
        s.async = 1;
        d.body.appendChild(s);
      });
    })(document, window);
    </script>
    ```

     **Don't forget to substitute your own AddressFinder API keys!**

## Sign up for a free AddressFinder account

New users can register for a free AddressFinder account at one of these links:
* [Free Account for Australia](https://portal.addressfinder.io/signup/au/free)
* [Free Account for New Zealand](https://portal.addressfinder.io/signup/nz/free)

Existing users can obtain their API key from the
[AddressFinder Portal](https://portal.addressfinder.io/).

## Software License

The AddressFinder plugin for Salesforce is released under the permissive free software [MIT License](https://github.com/AbleTech/addressfinder-bigcommerce/blob/master/LICENCE.md).
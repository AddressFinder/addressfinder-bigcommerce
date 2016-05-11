# AddressFinder-BigCommerce

[![addressfinder-bigcommerce plugin demo](assets/demo.gif?raw=true)](https://vimeo.com/166156223)

## Description

The AddressFinder plugin for BigCommerce adds an autocomplete capability to
the billing and shipping address fields for New Zealand and Australian
BigCommerce stores.

#### Get Verified Addresses

No more mistakes. Save addresses straight from your webform to your database.

#### Access the latest addresses

Leave the hard work to us. Access addresses frequently refreshed from multiple
sources.

#### No software required

AddressFinder is a JavaScript widget and API. This plugin requires ZERO
programming ability.

#### Supported Countries

* [Australia](https://addressfinder.com.au/)
* [New Zealand](https://addressfinder.nz/)

#### Compatibility

Addressfinder-BigCommerce requires IE9 or higher, Chrome, Safari, or Firefox.

## Installation

#### Demonstration Video

Follow the instructions below, or watch the [installation video](https://vimeo.com/166156223).

#### Installation instructions

You will need to:

1.  Log into the control panel for your site, and navigate to Store Setup > Design.
2.  Your current theme will be displayed in the Themes tab; click Edit HTML/CSS
    to access your template files.
3.  Find each of these template files and the javascript snippet below. You should insert the snippet just before the closing `</body>` tag.
 
    * checkout_express.html 
    * createaccount.html
    * shippingaddressform.html

    ```
    <script type="text/javascript">
      var AddressFinderConfig = { key_nz: "my_nz_af_key", key_au: "my_au_af_key" };
      jQuery(document).ready(function() {
        var script = document.createElement("script");
        script.src = "https://api.addressfinder.io/assets/bigcommerce/v1/boot.js";
        document.body.appendChild(script);
      });
    </script>
    ```

     **Don't forget to substitute your own AddressFinder API keys!**

## Sign up for a free AddressFinder account

New users can register for a free AddressFinder account at one of these links:
* [Free Account for Australia](https://portal.addressfinder.io/signup/au/free)
* [Free Account for New Zealand](https://portal.addressfinder.io/signup/nz/free)

Existing users can obtain their API key from the
[AddressFinder Portal](https://portal.addressfinder.io/).

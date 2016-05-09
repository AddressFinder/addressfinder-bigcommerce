# AddressFinder-BigCommerce

## Description

The AddressFinder plugin for BigCommerce adds an autocomplete capability to
the billing and shipping address fields for New Zealand and Australian
BigCommerce stores.

### Get Verified Addresses

No more mistakes. Save addresses straight from your webform to your database.

### Access the latest addresses

Leave the hard work to us. Access addresses frequently refreshed from multiple
sources.

### No software required

AddressFinder is a JavaScript widget and API. This plugin requires ZERO
programming ability.

### Supported Countries

* [Australia](https://addressfinder.com.au/)
* [New Zealand](https://addressfinder.nz/)

### Demonstration Video

Coming soon.

## Installation

### Demonstration Video

Follow the instructions below, or watch the [installation video](http://placeholder.com).

### Installation instructions

This plugin may be installed wherever an address input is required:

| Address input                          | Corresponding template file |
| -------------------------------------- | --------------------------- |
| at checkout                            | checkout_express.html       |
| creating new account                   | createaccount.html          |
| adding a new address to an account     | shippingaddressform.html    |
| editing a saved address for an account | shippingaddressform.html    |

You will need to:

1.  Log into the control panel for your site, and navigate to Store Setup > Design.
2.  Your current theme will be displayed in the Themes tab; click Edit HTML/CSS
    to access your template files.
3.  Add the following to the bottom of the approprate template file, e.g.
    checkout_express.html, just before the closing `</body>` tag.
    **Don't forget to substitute your own AddressFinder API keys!**

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

    New users can register for a free AddressFinder account at one of these links:
    * [Free Account for Australia](https://portal.addressfinder.io/signup/au/free)
    * [Free Account for New Zealand](https://portal.addressfinder.io/signup/nz/free)

    Existing users can obtain their API key from the
    [AddressFinder Portal](https://portal.addressfinder.io/).

## Screenshots

Autocomplete billing and shipping address in checkout page.

![addressfinder-bigcommerce plugin demo](assets/demo.gif?raw=true)

---

Find your AddressFinder API key at
[https://portal.addressfinder.io](https://portal.addressfinder.io).

![installation: find address finder key](assets/key.png?raw=true)

---

Log into the control panel for your site, then navigate to
Store Setup > Design > Edit HTML/CSS to access your template files.

![installation: access template files](assets/installation_edit.png?raw=true)

---

Insert snippet just before the closing `</body>` tag.

![installation: paste javascript snippet](assets/installation_snippet.png?raw=true)

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

#### Compatibility

Addressfinder-BigCommerce requires IE9 or higher, Chrome, Safari, or Firefox.

## Installation

#### Demonstration Video

Follow the instructions below, or watch the [installation video](https://vimeo.com/166156223).

[![addressfinder-bigcommerce plugin demo](assets/bigcommerce-install-vimeo.png?raw=true)](https://vimeo.com/166156223)


#### Installation instructions

1.  Log into the control panel for your site, and navigate to Store Setup > Design.
2.  Your current theme will be displayed in the Themes tab; click Edit HTML/CSS
    to access your template files.
Install the plugin:
3. Find the **checkout_express.html** file
4. Scroll to the bottom of the page
5. Copy the following javascript snippet and paste it in just before the closing `</body>` tag

        ```
        <script>
        (function(d,w){
          w.AddressFinderConfig = {
            key_nz: "MY_NZ_AF_KEY",
            key_au: "MY_AU_AF_KEY"
          }
          w.addEventListener('DOMContentLoaded', function(){
            var s = d.createElement("script");
            s.src = "https://api.addressfinder.io/assets/bigcommerce/v1/boot.js";
            s.async = 1;
            d.body.appendChild(s);
          });
        })(document, window);
        </script>
        ```

6. Replace the `MY_NZ_AF_KEY` and `MY_AU_AF_KEY` placeholders in the snippet you added in the previous step with your own AddressFinder keys

7. Then, repeat Step 3 for the files **createaccount.html** and **shippingaddressform.html**.

#### Obtaining a licence key

New users can register for a free AddressFinder account at one of these links:
* [Free Account for Australia](https://portal.addressfinder.io/signup/au/free?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Free%20Account%20for%20Australia&utm_content=Obtaining%20a%20licence%20key)
* [Free Account for New Zealand](https://portal.addressfinder.io/signup/nz/free?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Free%20Account%20for%20New%20Zealand&utm_content=Obtaining%20a%20licence%20key)

Existing users can obtain their API key from the
[AddressFinder Portal](https://portal.addressfinder.io/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=AddressFinder%20Portal&utm_content=Obtaining%20a%20licence%20key).

### Advanced Usage

If you want to adjust the default behaviour of the widget you may add additional options.These options should be added inside an object with the key 'widgetOptions' and should be in the form of key value pairs. This section may be excluded for default behaviour. For a full list of possible options visit our [Widget Documentation](https://addressfinder.nz/docs/widget_docs/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Widget%20Documentation&utm_content=Advanced%20Usage)

```
  w.AddressFinderPlugin = {
    key: "ADDRESSFINDER_NZ_DEMO_KEY",
    widgetOptions: {
      byline: false
    }
  };
```
### Country Specific Options
If you need to add different options for each country you can enter them in objects with the keys 'nzWidgetOptions' and 'auWidgetOptions'.

```
  w.AddressFinderPlugin = {
    key: "ADDRESSFINDER_NZ_DEMO_KEY",
    nzWidgetOptions: {
      byline: false
    },
    auWidgetOptions: {
      byline: true
    }
  };
```

For the full list of [NZ specific options](https://addressfinder.nz/docs/widget_docs/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Widget%20Documentation&utm_content=Country%20Specific%20Options)
For the full list of [AU specific options](https://addressfinder.com.au/docs/widget_docs/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Widget%20Documentation&utm_content=Country%20Specific%20Options)

## Software License

The AddressFinder plugin for Salesforce is released under the permissive free software [MIT License](https://github.com/AbleTech/addressfinder-bigcommerce/blob/master/LICENCE.md).

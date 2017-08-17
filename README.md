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

* [Free Account for Australia](https://portal.addressfinder.io/signup/au?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Australia&utm_content=Free%20Account%20for%20Australia)
* [Free Account for New Zealand](https://portal.addressfinder.io/signup/nz?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=New%20Zealand&utm_content=Free%20Account%20for%20New%20Zealand)

Existing users can obtain their API key from the [AddressFinder Portal](https://portal.addressfinder.io/?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=AddressFinder%20portal&utm_content=exisiting%20users).

Read more on the AddressFinder [BigCommerce Plugin](https://addressfinder.nz/docs/bigcommerce?utm_source=bigcommerce%20plugin&utm_medium=plugin&utm_campaign=plugin&utm_term=Bigcommerce%20Plugin&utm_content=Read%20More) page.

#### Compatibility

Addressfinder-BigCommerce requires IE10, IE11, Edge, Chrome, Safari, or Firefox.

## Installation

#### Demonstration Video

Follow the instructions below, or watch the [installation video](https://vimeo.com/166156223).

[![addressfinder-bigcommerce plugin demo](assets/bigcommerce-install-vimeo.png?raw=true)](https://vimeo.com/166156223)

#### Installation instructions
These instructions are compatible with themes from BigCommerce's new Stencil theme platform. If you created your store within the last 6 months you will have a Stencil theme. If you are unsure check the [BigCommerce documentation](https://support.bigcommerce.com/articles/Public/Which-Theme-Platform-do-I-have) for a list of themes and their platforms.

If you are using a Blueprint theme you can find the alternate setup instructions on the [AddressFinder website](https://addressfinder.nz/docs/bigcommerce_instructions_for_other_themes/)

1.  Log into the control panel for your site, and navigate to Advanced Settings > Web Analytics.
2.  Click 'Google Analytics' in the Providers panel and save your changes.
3.  Click on the 'Google Analytics' tab that appears beside the 'General Settings Tab'
4.  Copy and paste the following javascript snippet into the 'Tracking Code' box

        ```
        <script>
        (function(d,w){
          w.AddressFinderConfig = {
            key: "ADDRESSFINDER_NZ_DEMO_KEY",
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
        ```
6. Replace the `ADDRESSFINDER_NZ_DEMO_KEY` placeholder in the snippet you added in the previous step with your own AddressFinder key and save.

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
    key_nz: "ADDRESSFINDER_NZ_DEMO_KEY",
    key_au: "ADDRESSFINDER_AU_DEMO_KEY",
    widgetOptions: {
      byline: false
    }
  };
```
### Country Specific Options
If you need to add different options for each country you can enter them in objects with the keys 'nzWidgetOptions' and 'auWidgetOptions'.

```
  w.AddressFinderPlugin = {
    key_nz: "ADDRESSFINDER_NZ_DEMO_KEY",
    key_au: "ADDRESSFINDER_AU_DEMO_KEY",
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

## Building the plugin

See [BUILD.md](BUILD.md) for instructions on how to build this plugin from source.

## Software License

The AddressFinder plugin for BigCommerce is released under the permissive free software [MIT License](https://github.com/AbleTech/addressfinder-bigcommerce/blob/master/LICENCE.md).


<!-- "scripts": {
  "compile": "babel src --source-maps --out-dir lib",
  "concat": "concat lib/*.js -o dist/bigcommerce-v1-boot.js",
  "minify": "uglifyjs dist/bigcommerce-v1-boot.js -m -o dist/bigcommerce-v1-boot.min.js",
  "build": "npm run compile && npm run concat",
  "build:production": "npm run build && npm run minify",
  "watch": "watch 'npm run build' src/"
} -->

<!-- "scripts": {
  "build:test": "webpack --config webpack.config.js",
  "build:production": "NODE_ENV=production webpack --config webpack.config.js",
  "build:development": "webpack -w --config webpack.config.js"
} -->

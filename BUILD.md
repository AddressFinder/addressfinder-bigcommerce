# Building the plugin

This project uses npm scripts to lint, concat, and minify the JS used in this BigCommerce plugin.

### Dependencies:

 - Node.js
 - npm
 - uglify-js
 - eslint

### Setting up your development environment

 1. `npm install -g uglifyjs eslint`
 2. `npm install`

Once your dependencies are installed, please install EditorConfig in your development environment to avoid whitespace changes.
See [editorconfig.org](http://editorconfig.org) for more.

### Building the JS

 - `npm run build:production`

### Export

The generated file [dist/bigcommerce-v1-boot.min.js](dist/bigcommerce-v1-boot.min.js) is exported to the AddressFinder API servers for hosting with the path [https://api.addressfinder.io/assets/bigcommerce/v1/boot.js](https://api.addressfinder.io/assets/bigcommerce/v1/boot.js).

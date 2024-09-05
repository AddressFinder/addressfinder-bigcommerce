# Building the plugin

This project uses npm scripts to lint, concat, and minify the JS used in this BigCommerce plugin.

### Dependencies:

 - Node.js
 - npm
 - uglify-js
 - eslint

### Setting up your development environment

Consider using a version manager like [asdf](https://asdf-vm.com/).

 1. `npm install -g uglifyjs eslint`
 2. `npm install`

Once your dependencies are installed, please install EditorConfig in your development environment to avoid whitespace changes.
See [editorconfig.org](http://editorconfig.org) for more.

### Building the JS

 - `npm run build:production`

### Export

The generated file [dist/boot.min.js](dist/boot.min.js) is exported to the AddressFinder API servers for hosting with the path [https://api.addressfinder.io/assets/bigcommerce/v1/boot.js](https://api.addressfinder.io/assets/bigcommerce/v1/boot.js).The sourcemap [dist/boot.min.js.map](dist/boot.min.js.map) should also be copied into this same folder. It is important the file name of the sourcemap is not changed, as the name is used to generate the sourceMappingURL, which points the minified code to its sourcemap.

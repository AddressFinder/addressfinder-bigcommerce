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

 - `npm run build` or `npm run build:production`

# Development

Follow the setup instructions in [BUILD.md](BUILD.md), and then:

1. `npm install -g live-server`
2. `npm install -g live-server-https`
3. `live-server --https=/usr/local/lib/node_modules/live-server-https dist/`

If `live-server-https` throws a module not found error, find the proper directory by running `npm -g ls live-server-https` and adding `node_modules` to the result.

This will open up a browser window (https://127.0.0.1:8080) with the `dist` directory contents displayed.

To develop and test this plugin, you should:

1. Visit https://login.bigcommerce.com/login to login. Credentials are in 1Password
2. On the store's admin pages, click settings, scroll down to the advanced section. Then click data solutions.
3. Connect Site Verification Tags if not already connected.
4. Copy and Paste the boot script from the [README.md](README.md) file into the input area.
5. Adjust the path of the script from
```
s.src = "https://api.staging.addressfinder.io/assets/bigcommerce/v2/boot.js"
```
to 
```
s.src = "https://127.0.0.1:8080/boot.js"
```
6. Press Save

Now you can click the _View Store_ link and trial the plugin by selecting an item to purchase and
visiting the checkout.

# Live reload

In a separate window, run:

1. `npm run watch`

Then whenever a file is edited, it will be re-compiled and available for reloading.

# Testing Themes
BigCommerce has different themes which can have different input `id`'s and form configurations. To test these you can use the below themes.

 - Classic Next Light
 - Cornerstone Bold
 - Cornerstone Warm
 - Cornerstone Lite

Navigate to Storefront -> Theme market place -> my themes.

# Testing Checkouts
BigCommerce has different checkouts which can have different input `id`'s and form configurations. To test these you can use the below checkout options.

  - Optimised Checkout
  - Multipage Checkout
  - Single Page Checkout

Navigate to Settings -> Advanced -> Checkout

# Debugging
If you are debugging a customer site, you can type `addressfinderDebugMode()` into the javascript console. This will reinitialise the widget,
with the debug flag set to true, so you can see console logs from the addressfinder-webpage-tools npm package.
This works in Chrome and FireFox

# Troubleshooting
### Legacy packages
Depending on the machine packages you have installed it is possible you may run into OpenSSL implementations of algorithms that have been deemed legacy.
Simply run `export NODE_OPTIONS=--openssl-legacy-provider` in your terminal.

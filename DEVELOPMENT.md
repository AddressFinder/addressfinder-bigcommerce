# Development

Follow the setup instructions in [BUILD.md](BUILD.md), and then:

1. `npm install -g live-server`
1. `npm install -g live-server-https`
2. `live-server --https=live-server --https=/usr/local/lib/node_modules/live-server-https dist/`

This will open up a browser window (https://127.0.0.1:8080) with the `dist` directory contents displayed.

To develop and test this plugin, you should:

1. Visit https://bigcommerce.com and create a trial account.
1. On the store's admin pages, click Advanced Settings then Web Analytics
1. Tick Google Analytics then Save
1. Select the Google Analytics tab
1. Copy and Paste the boot script from the [README.md](README.md) file
1. Adjust the path of the script to be https://127.0.0.1:8080/bigcommerce-v1-boot.js
1. Press Save

Now you can click the _View Store_ link and trial the plugin by selecting an item to purchase and
visiting the checkout.

# Live reload

In a separate window, run:

1. `npm run watch`

Then whenever a file is edited, it will be re-compiled and available for reloading.

# Development

Follow the setup instructions in [BUILD.md](BUILD.md), and then:

1. `npm install -g live-server-https`
2. `live-server --https=/Users/nigelramsay/.nvm/versions/node/v5.12.0/lib/node_modules/live-server-https dist/`

This will open up a browser window (https://127.0.0.1:8080) with the `dist` directory contents displayed.

# Live reload

In a separate window, run:

1. `npm run watch`

Then whenever a file is edited, it will be re-compiled and available for reloading.

const TerserPlugin = require('terser-webpack-plugin');
const pathLib = require("path");

const config = {
  entry: [
    "./src/bigcommerce_plugin.js"
  ],
  devtool: 'source-map',
  output: {
    path: pathLib.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

switch (process.env.NODE_ENV) {
  case "production":
    config.output.filename = "boot-min.js";
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            warnings: false
          }
        })
      ]
    }
    break;
  default:
    config.output.filename = "boot.js";
    config.optimization = {
      minimizer: []
    }
}

module.exports = config;

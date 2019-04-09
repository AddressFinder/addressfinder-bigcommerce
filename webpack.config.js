const webpack = require("webpack");
const pathLib = require("path");

const config = {
  entry: [
    "./src/bigcommerce_plugin.js"
  ],
  output: {
    path: pathLib.resolve(__dirname, "./lib"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};

switch (process.env.NODE_ENV) {
  case "production":
    config.output.filename = "bigcommerce-v1-boot-min.js";
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
    break;
  default:
    config.output.filename = "bigcommerce-v1-boot.js";
    config.plugins = [];
}

module.exports = config;

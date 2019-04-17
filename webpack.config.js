const webpack = require("webpack");
const pathLib = require("path");

const config = {
  entry: [
    "./src/bigcommerce_plugin.js"
  ],
  output: {
    path: pathLib.resolve(__dirname, "./dist"),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
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
    config.output.filename = "bigcommerce-v1-boot-min.js";
    config.plugins = [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-modules-commonjs",
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

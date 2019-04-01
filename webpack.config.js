const webpack = require("webpack");
const pathLib = require("path");

const config = {
  entry: [
    "./src/bigcommerce_plugin.js"
  ],
  devtool: "source-map",
  output: {
    path: pathLib.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
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

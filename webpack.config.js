const webpack = require("webpack");
const pathLib = require("path");

const config = {
  entry: [
    "iterators-polyfill",
    "./src/index.es6"
  ],
  devtool: "source-map",
  output: {
    path: pathLib.resolve(__dirname, "./dist"),
  },
  module: {
    loaders: [
      {test: /\.es6$/,
       loader: "babel-loader",
       include: [ pathLib.resolve(__dirname, "src") ],
       query: {
         presets: ["es2015"]
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

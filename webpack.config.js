const webpack = require("webpack");
const pathLib = require("path");

var PROD = JSON.parse(process.env.PROD_ENV || "0");

const config = {
  entry: [
    "iterators-polyfill",
    "./src/index.es6"
  ],
  devtool: "source-map",
  output: {
    path: pathLib.resolve(__dirname, "./dist"),
    filename: PROD ? "bigcommerce-v1-boot-min.js" : "bigcommerce-v1-boot.js"
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : [],
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

module.exports = config;
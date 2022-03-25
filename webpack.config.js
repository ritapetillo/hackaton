const path = require("path");
// webpack.config.js
const webpack = require("webpack");

module.exports = {
  entry: __dirname + "/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
  },
};

const { merge } = require("webpack-merge");
const config = require("./config");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",

  // ローカル開発用環境を立ち上げる
  devServer: {
    static: {
      directory: config.pages,
    },
    hot: true,
    port: 3000,
  },
});

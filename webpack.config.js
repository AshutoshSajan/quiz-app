const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
var webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/public/index.html",
  filename: "./index.html",
});

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ["./client/src/index.js"],
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "/static/[name].[ext]",
        },
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist/bundle/",
    publicPath: "/static/",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
  ],
  resolve: {
    extensions: [".webpack.js", ".web.js", ".tsx", ".ts", ".js", ".json"],
  },
  externals: [nodeExternals()],
  externals: {
    "react/lib/ReactContext": "window",
    "react/lib/ExecutionEnvironment": true,
    "react/addons": true,
  },
};

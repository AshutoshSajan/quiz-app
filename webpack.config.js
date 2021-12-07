const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const htmlPlugin = new HtmlWebPackPlugin({
  // template: "./client/public/index.html",
  template: "./server/views/index.ejs",
  filename: "./index.ejs",
});

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ["./client/src/index.js"],
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
    path: `${__dirname}/dist/bundle/`,
    publicPath: "/static/",
  },
  plugins: [
    htmlPlugin,
    // new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
  ],
  resolve: {
    extensions: [".webpack.js", ".web.js", ".tsx", ".ts", ".js", ".json"],
  },
  externals: [
    nodeExternals(),
    {
      "react/lib/ReactContext": "window",
      "react/lib/ExecutionEnvironment": true,
      "react/addons": true,
    },
  ],
  optimization: {},
};

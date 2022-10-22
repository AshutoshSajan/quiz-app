const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const esbuild = require('esbuild');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const htmlPlugin = new HtmlWebPackPlugin({
  // template: "./client/public/index.html",
  template: './server/views/index.ejs',
  filename: './index.ejs',
});

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./client/src/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx', // Remove this if you're not using JSX
          target: 'es2015', // Syntax to compile to (see options below for possible values)
          implementation: esbuild,
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'css',
              minify: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '/static/[name].[ext]',
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist/bundle/`,
    publicPath: '/static/',
  },
  plugins: [
    htmlPlugin,
    // new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
  ],
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js', '.json'],
  },
  externals: [
    nodeExternals(),
    {
      'react/lib/ReactContext': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/addons': true,
    },
  ],
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015', // Syntax to compile to (see options below for possible values)
        css: true, // Apply minification to CSS assets
      }),
    ],
  },
};

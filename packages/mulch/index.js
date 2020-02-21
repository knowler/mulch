#!/usr/bin/env node

const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const _ = require('lodash');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

/** Load environment variables from Bedrock */
require('dotenv').config({path: path.resolve('../../.env')});

const CWD = process.cwd();

const sageConfig = require(path.resolve(CWD, 'sage.config.js'));

const entry = _.groupBy(
  sageConfig.assets.map(asset => `./${path.normalize(asset)}`),
  asset => path.parse(asset).name,
);

const statsConfig = {
  hash: false,
  version: false,
  timings: false,
  children: false,
  errors: false,
  errorDetails: false,
  warnings: false,
  chunks: false,
  modules: false,
  reasons: false,
  source: false,
  publicPath: false,
};

const defaultConfig = {
  mode: 'production',
  context: path.resolve(CWD, 'resources/assets'),
  entry,
  output: {
    path: path.resolve(CWD, 'dist'),
    filename: 'scripts/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: ['cache-loader', 'babel-loader'],
      },
    ],
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.ProgressPlugin(),
  ],
};

webpack(sageConfig.webpack(defaultConfig, {webpack})).run((err, stats) => {
  console.log(stats.toString(statsConfig));
  process.exit();
});

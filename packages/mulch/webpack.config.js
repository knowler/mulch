const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const deriveEntriesFromFilenames = require('./deriveEntriesFromFilenames');

const CWD = process.cwd();
const sageConfig = require(path.resolve(CWD, 'sage.config.js'));

const baseConfig = {
  mode: 'production',
  output: {
    path: path.resolve(CWD, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: ['cache-loader', 'babel-loader'],
      },
    ],
  },
  plugins: [new FriendlyErrorsWebpackPlugin(), new webpack.ProgressPlugin()],
};

const defaultAdminConfig = merge(baseConfig, {
  context: path.resolve(CWD, 'resources/assets/admin'),
  entry: deriveEntriesFromFilenames(sageConfig.admin),
  output: {
    filename: 'admin-[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});

const defaultPublicConfig = merge(baseConfig, {
  context: path.resolve(CWD, 'resources/assets/public'),
  entry: deriveEntriesFromFilenames(sageConfig.public),
  output: {
    filename: 'public-[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'public-[name].css',
    }),
  ],
});

module.exports = [
  sageConfig.public.webpack(defaultPublicConfig, {webpack}),
  sageConfig.admin.webpack(defaultAdminConfig, {webpack}),
];

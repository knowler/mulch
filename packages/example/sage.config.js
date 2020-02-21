const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  assets: ['scripts/main.js', 'styles/main.css'],
  webpack: config => {
    config.plugins.push(new WebpackAssetsManifest());

    return config;
  },
};

const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  /** Specify your assets here. */
  assets: ['scripts/main.js', 'styles/main.css'],

  /** Override the webpack config here. Note: it’s just the full webpack config object. */
  webpack: (config, {webpack}) => {
    config.plugins.push(new WebpackAssetsManifest());

    return config;
  },
};

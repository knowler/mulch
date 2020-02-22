module.exports = {
  public: {
    /** Specify your assets here. */
    assets: ['scripts/main.js', 'styles/main.css', 'scripts/home.js'],

    /** Override the webpack config here. Note: it’s just the full webpack config object. */
    webpack: (config, {webpack}) => {
      return config;
    },
  },
  admin: {
    /** Specify your assets here. */
    assets: ['scripts/main.js', 'styles/main.css'],

    /** Override the webpack config here. Note: it’s just the full webpack config object. */
    webpack: (config, {webpack}) => {
      return config;
    },
  },
};

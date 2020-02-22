const path = require('path');
const _ = require('lodash');

module.exports = config =>
  _.groupBy(
    config.assets.map(asset => `./${path.normalize(asset)}`),
    asset => path.parse(asset).name,
  );

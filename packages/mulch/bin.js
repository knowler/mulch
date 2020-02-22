#!/usr/bin/env node

const webpack = require('webpack');
const config = require('./webpack.config');

webpack(config).run((err, stats) => {
  process.stdout.write(
    stats.toString({
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
    }),
    +'/n',
  );

  process.exit();
});

'use strict'

import path from 'path'
import webpack from 'webpack'
import cssnext from 'postcss-cssnext'

let _env = process.env['NODE_ENV']

let env = {
  production: _env === 'production',
  staging: _env === 'staging',
  test: _env === 'test',
  development: _env === 'development' || typeof _env === 'undefined',
}

module.exports = {
  target: 'web',

  entry: './src/client/index.js',

  output: {
    path: path.resolve('./static/dist/client'),
    pathinfo: true,
    publicPath: '/static/dist/client',
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: JSON.stringify(_env),
      BROWSER: true,
    })
  ],

  module: {
    loaders: [{
      test: /\.pcss$/,
      loader: 'style-loader!css-loader!postcss-loader'},
    ],
    noParse: /\.min\.js/,
  },

  postcss: [cssnext],

  resolve: {
    root: path.resolve('./src/client'),
    extensions: ['', '.js', '.jsx', '.scss'],
  },
}

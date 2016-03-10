'use strict'

import path from 'path'
import webpack from 'webpack'
import config from './webpack.base.config.js'

if (process.env['NODE_ENV'] !== 'test') {
  const port = process.env.PORT || 5000
  config.entry = [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    config.entry,
  ]
}

config.devtool = 'eval-source-map'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    }
  })
])

config.module.loaders = config.module.loaders.concat([{
  test: /\.jsx?$/,
  loaders: ['babel'],
  include: [path.resolve('./src/')],
}])

export default config

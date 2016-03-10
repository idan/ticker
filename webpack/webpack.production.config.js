'use strict'

import path from 'path'
import webpack from 'webpack'
import config from './webpack.base.config.js'

config.bail = true
config.debug = false
config.profile = false
config.devtool = '#source-map'

config.output = {
  path: path.resolve('./static/dist/client'),
  pathInfo: false,
  publicPath: '/static/dist/client/',
  filename: 'bundle.min.js',
}

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({ output: {comments: false} }),
  new webpack.DefinePlugin({
    'process.env': {NODE_ENV: JSON.stringify('production')},
  })
])

config.module.loaders = config.module.loaders.concat([{
  test: /\.jsx?$/,
  loaders: ['babel'],
  include: [path.resolve('./src/')],
}])

export default config

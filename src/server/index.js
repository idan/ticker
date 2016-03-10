import http from 'http'
import path from 'path'
import express from 'express'

const app = express()
const server = http.Server(app)

const NODE_ENV = process.env.NODE_ENV

console.log('NODE_ENV is ', NODE_ENV)

if (NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require(path.join(process.cwd(), './webpack/webpack.development.config')).default
  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))

  console.log('🚧  ==> webpack dev middleware active')
}

app.disable('x-powered-by')

app.use('/static', express.static(path.join(process.cwd(), '/static')))
console.log(`✅  ==> '/static' mapped to ${path.join(process.cwd(), '/static')}`)

const port = Number(process.env.PORT || 5000)

server.listen(port, function () {
  console.log(`✅  ==> server running at http://localhost:${port}`)
})

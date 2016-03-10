'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'production'
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

// Can't use export default using babel@6.x, see https://github.com/babel/babel/issues/2760
module.exports = require(`./webpack.${process.env.NODE_ENV}.config.js`).default

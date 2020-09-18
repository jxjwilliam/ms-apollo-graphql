const { createProxyMiddleware } = require('http-proxy-middleware')

const URLS = 'http://localhost'

require('dotenv').config()
const { GATEWAY_PORT } = process.env

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/graphql', {
      target: `${URLS}:${GATEWAY_PORT}/`,
      changeOrigin: true,
    })
  )
}

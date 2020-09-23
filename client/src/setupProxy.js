const { createProxyMiddleware } = require('http-proxy-middleware')

require('dotenv').config()

const URL = `http://localhost:${process.env.REACT_APP_GATEWAY_PORT}`

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/graphql', {
      target: URL,
      changeOrigin: true,
    })
  )
}

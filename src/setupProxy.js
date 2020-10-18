const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://brieffeed-back.herokuapp.com',
      changeOrigin: true,
    })
  );
};

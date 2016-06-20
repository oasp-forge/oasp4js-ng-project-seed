/*global config*/
'use strict';

var httpProxy = require('http-proxy');
var chalk = require('chalk');
/**
 * Additional logging for 500
 */
var onError = function (error, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  console.error(chalk.red('[Proxy]'), error);
};
/**
 * Update cookie to allow app be served on /.
 */
var onProxyRes = function (proxyRes) {
  if (proxyRes.headers['set-cookie']) {
    proxyRes.headers['set-cookie'][0] = proxyRes.headers['set-cookie'][0].replace(config.proxy.context(), '');
  }
};
/**
 * Support Websockets.
 */
var provideOnUpgrade = function (currentProxyServer) {
  return function onUpgrade (req, socket, head) {
    currentProxyServer.ws(req, socket, head);
  };
};



var proxyWrappers = config.proxies.map(function (proxyConf) {

  var proxyServer = httpProxy.createProxyServer({
    target: proxyConf.url(),
    ws: true // Support Websockets.
  });

  proxyServer.on('error', onError);
  proxyServer.on('proxyRes', onProxyRes);
  proxyServer.on('upgrade', provideOnUpgrade(proxyServer));

  return {
    proxy: proxyServer,
    config: proxyConf
  };
});

/**
 * Create middleware and define routing
 */
function proxyMiddleware(req, res, next) {

  var calledProxy = false;

  // currently order of defining proxies is important as first match will execute.
  // if default proxy needs to be expicitly specified, then implementation needs 
  // to be extended

  proxyWrappers.forEach(function (proxyWrapper) {
    if (new RegExp(proxyWrapper.config.servicesPath).test(req.url)
      || new RegExp(proxyWrapper.config.websocketPath).test(req.url)) {

      proxyWrapper.proxy.web(req, res);
      calledProxy = true;
    }
  }, this);

  if (!calledProxy) {
    next();
  }

}
module.exports = [proxyMiddleware];

/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const compression = require('compression');
const pkg = require(path.resolve(process.cwd(), 'package.json'));

// Dev middleware
const addDevMiddlewares = (app, webpackConfig) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  if (pkg.dllPlugin) {
    app.get(/\.dll\.js$/, (req, res) => {
      const filename = req.path.replace(/^\//, '');
      res.sendFile(path.join(process.cwd(), pkg.dllPlugin.path, filename));
    });
  }

  app.get('*', (req, res) => {
    res.set('Cache-Control', 'no-cache, must-revalidate')
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};

// Production middlewares
const addProdMiddlewares = (app, options) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  app.get('*', (req, res) => {
    res.set('Cache-Control', 'max-age=14400, must-revalidate') // 4 hour max age
    res.sendFile(path.resolve(outputPath, 'index.html'))
  });
};

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  app.get('*', (req, res, next) => {
    const {host} = req.headers
    if (host.includes('sound.') || host.includes('sounds.'))  {
      res.redirect('https://soundcloud.com/expressyourmess')
    } else if (host.includes('video.') || host.includes('videos.')) {
      res.redirect('https://www.youtube.com/channel/UCne9Pv9CARxNz8rNMaDm7Dw')
    } else {
      next()
    }
  })

  if (isProd) {
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../internals/webpack/webpack.dev.babel');
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};

/* eslint consistent-return:0 */

const quarkArt = require('./quarkArt')
const submissions = require('./submissions')

const express = require('express');
const logger = require('./logger');
const bodyParser = require('body-parser')

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = process.env.ENABLE_TUNNEL || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1073741824, // ~1GB
  }
});

// In production we need to pass these values in instead of relying on webpack
app.get('*', (req, res) => {
  res.redirect('https://www.redbubble.com/people/purplerepublic/portfolio');
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});

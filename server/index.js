/* eslint consistent-return:0 */

const quarkArt = require('./quarkArt')
const submissions = require('./submissions')
const bubbles = require('./bubbles')

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
}));

// quark art
app.post('/quarkArt.upload', quarkArt.upload)
app.get('/quarkArt.list', quarkArt.list)

// audio/video/writing submissions
app.post('/submissions.upload', upload.single('blob'), submissions.upload)

// bubbles
app.get('/bubbleStageDirection.js', bubbles.getStageDirectionScript)
app.post('/bubbles.upload', bubbles.upload)
app.post('/bubbles.delete', bubbles.delete)
app.post('/bubbles.update.arrangement', bubbles.updateArrangement)
app.post('/bubbles.upload.galleryImage', bubbles.uploadGalleryImage)

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
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

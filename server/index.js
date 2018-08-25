/* eslint consistent-return:0 */

const quarkArt = require('./quarkArt')
const submissions = require('./submissions')
const bubbles = require('./bubbles')

const express = require('express');
const logger = require('./logger');
const bodyParser = require('body-parser')
const https = require('https');

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

// for crawlers/bots
app.use(require('prerender-node').set('protocol', 'https'))

// for file uploads
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


let InstagramToken
try {
  InstagramToken = require('../instagram.config')
} catch {
  InstagramToken = process.env.INSTAGRAM_TOKEN
}
app.get('/instagram.posts.recent', (req, res) => {
  https.get(
    'https://api.instagram.com/v1/users/self/media/recent?access_token=' + InstagramToken,
    response => {
      let data = ''
      response.on('data', chunk => data += chunk)
      response.on('end', () => res.send(JSON.parse(data)))
    }
  )
})

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

const customHost = argv.host || process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';
const port = argv.port || process.env.PORT || 3000;

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

const aws = require('aws-sdk')

loadConfig()

module.export = {
  s3: new aws.S3(),
}

function loadConfig() {
  let config = require('../aws.config.json')
  if (!config) {
    config = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    }
  }

  aws.config.update(config)
}

const aws = require('aws-sdk')

const BUCKET = 'purplerepublic.us'

loadConfig()
const s3 = new aws.S3()

module.exports = {
  s3,
  uploadFileToS3,
}

function uploadFileToS3({key, fileData}) {
  const params = {
    Bucket: BUCKET,
    Key: key,
    ACL: 'public-read',
    Body: fileData.buffer,
    ContentType: fileData.mimetype,
  }
  console.log(params)
  return new Promise((resolve, reject) => {
    console.log('promise')
  	s3.putObject(params, (err, data) => {
      console.log('put done')
  		if (err) {
  	    	console.error('failed to upload to S3', err)
  	    	reject(err)
  	    } else {
  	    	console.log('successfully uploaded to S3', data)
  	    	resolve(data)
  	    }
  	})
  })
}

function loadConfig() {
  let config;
  try {
    config = require('../aws.config.json')
  } catch (e) {
    config = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    }
  }

  aws.config.update(config)
}

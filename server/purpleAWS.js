const aws = require('aws-sdk')

const BUCKET = 'purplerepublic.us'

loadConfig()
const s3 = new aws.S3()

module.exports = {
  s3,
  uploadFileToS3,
  deleteFolderS3,
  BUCKET,
}

function deleteFolderS3(key) {
  const params = {
    Bucket: BUCKET,
    Prefix: key + '/',
  }
  return new Promise((resolve, reject) => {
    s3.listObjects(params, function(err, data) {
      if (err) return reject(err)
      if (data.Contents.length == 0) return resolve()

      const deleteParams = {
        Bucket: BUCKET,
        Delete: {
          Objects: [],
        },
      }
      data.Contents.forEach(o => {
        deleteParams.Delete.Objects.push({Key: o.Key})
      })

      s3.deleteObjects(deleteParams, (err, data) => {
        if (err) {
          console.log('failed to delete folder from s3', key, err)
          reject(err)
        } else {
          console.log('successfully deleted folder from s3', key)
          resolve()
        }
      })
    })
  })
}

function uploadFileToS3({key, fileData}) {
  const params = {
    Bucket: BUCKET,
    Key: key,
    ACL: 'public-read',
    Body: fileData.buffer,
    ContentType: fileData.mimetype,
  }
  return new Promise((resolve, reject) => {
  	s3.putObject(params, (err, data) => {
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

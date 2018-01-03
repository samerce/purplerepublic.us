const {s3} = require('./purpleAWS')

const BUCKET = 'purplerepublic.us'

module.exports = {

  upload: (req, res) => {
    uploadToS3(req.file)
      .then(response => res.status(200).end())
      .catch(e => res.status(500).end('upload failed: ' + e))
  },

}

function uploadToS3(fileData) {
  const contentInfo = fileData.mimetype.split('/')
  const type = contentInfo[0]
  const extension = contentInfo[1]
  const params = {
    Bucket: BUCKET,
    Key: `submissions/${type}/${new Date().getTime()}`,
    ACL: 'public-read',
    Body: fileData.buffer,
    ContentType: fileData.mimetype,
  }
  return new Promise((resolve, reject) => {
  	s3.putObject(params, (err, data) => {
  		if (err) {
  	    	console.error(type + ' failed to upload to S3', err)
  	    	reject(err)
  	    } else {
  	    	console.log(type + ' successfully uploaded to S3', data)
  	    	resolve(data)
  	    }
  	})
  })
}

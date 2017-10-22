const aws = require('aws-sdk')
const imageConverter = require('base64-img')

aws.config.loadFromPath('aws.config.json')
const s3 = new aws.S3({region: 'us-east-2'})

module.exports = {

  upload: (req, res) => {
    uploadToS3(req.body)
      .then(() => res.status(200).end('quark art uploaded to s3'))
      .catch((err) => res.status(500).end('upload failed: ' + err))
  }

}

const uploadToS3 = ({imageData, description, sourceImage, cropBox}) => {
  const imageBuffer = new Buffer(
    imageData.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  )
  const params = {
    Bucket: 'quark-art',
    Key: description.substr(0, 20) + '-' + new Date().getTime() + '.jpg',
    ACL: 'public-read',
    Body: imageBuffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    Metadata: {
      'description': description,
      'source-image': sourceImage,
      'crop-box': cropBox,
   },
  }
  return new Promise((resolve, reject) => {
  	s3.putObject(params, (err, data) => {
  		if (err) {
  	    	console.error("Error uploading image: ", err)
  	    	reject(err)
  	    } else {
  	    	console.log("Successfully uploaded image to S3", data)
  	    	resolve(data)
  	    }
  	})
  })
}

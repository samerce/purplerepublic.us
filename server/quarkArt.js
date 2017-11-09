const imageConverter = require('base64-img')
const {s3} = require('./purpleAWS')

const REVIEW_BUCKET = 'quark-art'
const GALLERY_BUCKET = 'quark-art-gallery'
const GALLERY_BUCKET_BASE_URL = 'https://d3sclm0qnx89jv.cloudfront.net/'

module.exports = {

  upload: (req, res) => {
    try {
      uploadToS3(req.body)
        .then(() => res.status(200).end('quark art uploaded to s3'))
        .catch((err) => res.status(500).end('upload failed: ' + err))
    } catch (e) {
      console.error('quark upload failed: ' + e)
    }

  },

  list: (req, res) => {
    try {
      listGalleryItems(req.body)
        .then((listResponse) => res.status(200).send(listResponse).end())
        .catch((err) => res.status(500).end('quark art gallery fetch failed: ' + err))
    } catch (e) {
      console.error('gallery fetch failed: ' + e)
    }
  },

}

var uploadToS3 = ({imageData, description, sourceImage, cropBox}) => {
  const imageBuffer = new Buffer(
    imageData.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  )
  const params = {
    Bucket: REVIEW_BUCKET,
    Key: new Date().getTime() + '.jpg',
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
  	    	console.error("error uploading image: ", err)
  	    	reject(err)
  	    } else {
  	    	console.log("successfully uploaded image to S3", data)
  	    	resolve(data)
  	    }
  	})
  })
}

function listGalleryItems({maxObjects, continuationToken}) {
  const params = {
    Bucket: GALLERY_BUCKET,
    ContinuationToken: continuationToken,
    EncodingType: 'url',
    MaxKeys: maxObjects,
  }
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err, listResponse) => {
      if (err) {
        console.error(err, err.stack)
        reject(err)
      } else {
        const itemPointers = listResponse.Contents
        const galleryItems = []
        const itemRequests = []
        for (let i = 0; i < itemPointers.length; i++) {
          const itemRequest = getGalleryItem(itemPointers[i])
          itemRequest.then(item => item && galleryItems.push(item))
          itemRequests.push(itemRequest)
        }

        Promise.all(itemRequests)
        .then(() => {
          if (galleryItems.length === 0) {
            const noItemsError = 'error fetching gallery items'
            console.error(noItemsError)
            return reject(noItemsError)
          }
          if (galleryItems.length < itemPointers.length) {
            console.warning('fetched some gallery items, but some failed')
          }
          resolve({
            items: galleryItems,
            continuationToken: listResponse.continuationToken
          })
        })
        .catch(reject)
      }
    })
  })
}

function getGalleryItem(itemPtr) {
  return new Promise((resolve, reject) => {
    s3.getObject({
      Bucket: GALLERY_BUCKET,
      Key: itemPtr.Key,
    }, (err, item) => {
      if (err) {
        console.error('error fetching gallery item: ', err)
        reject(err)
      } else {
        resolve({
          url: GALLERY_BUCKET_BASE_URL + itemPtr.Key,
          description: unescape(item.Metadata.description),
          sourceImage: item.Metadata['source-image'],
          width: item.Metadata['crop-box'].width,
          height: item.Metadata['crop-box'].height,
        })
      }
    })
  })
}

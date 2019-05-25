const {
  s3,
  BUCKET,
  deleteFolderS3,
  deleteObjectS3,
  resetCache,
} = require('./purpleAWS')

const BubbleImageRootKey = 'bubbles/buttonImages/'
const GalleryBaseKey = 'bubbles/galleryImages/'

const {STAGE_DIRECTION_KEY_SUFFIX = 'beta'} = process.env
const BubbleStageDirectionKey = `bubbles/stageDirection/${STAGE_DIRECTION_KEY_SUFFIX}/`

let bubbleStageDirection = null
fetchBubbleStageDirection()

module.exports = {

  upload: (req, res) => {
    const {
      imageData,
      bubbleProps: bubblePropsJSONString,
      existingBubbleIndex,
    } = req.body
    const bubbleProps = JSON.parse(bubblePropsJSONString)

    if (imageData) {
      uploadJPEG(imageData, BubbleImageRootKey + bubbleProps.id)
        .then(() => {
          updateStageDirection(bubbleProps, existingBubbleIndex, res)
        })
        .catch(e => res.status(500).end('image upload failed: ' + e))
    } else {
      updateStageDirection(bubbleProps, existingBubbleIndex, res)
    }
  },

  uploadGalleryImage: (req, res) => {
    const {data, id} = req.body
    uploadJPEG(data, id)
      .then(() => res.status(200).end())
      .catch(e => res.status(500).end(e))
  },

  delete: (req, res) => {
    const {bubbleId} = req.body
    const bubble = bubbleStageDirection.find(b => b.id === bubbleId)

    deleteObjectS3(BubbleImageRootKey + bubbleId + '.jpg')
    if (bubble && bubble.type === 'gallery') {
      deleteFolderS3(GalleryBaseKey + bubbleId)
    }

    bubbleStageDirection = bubbleStageDirection.filter(
      bubbleProps => bubbleProps.id !== bubbleId
    )
    uploadJSON(bubbleStageDirection, BubbleStageDirectionKey + 'latest')
      .then(() => res.status(200).end())
      .catch((e) => res.status(500).end(e))
  },

  updateArrangement: ({body: newBubbles}, res) => {
    uploadJSON(newBubbles, BubbleStageDirectionKey + 'latest')
      .then(() => {
        bubbleStageDirection = newBubbles
        res.status(200).end()
      })
      .catch((e) => res.status(500).end('update failed: ' + e))
  },

  getStageDirectionScript(req, res) {
    res.set('Cache-Control', 'max-age=1')
    res.send(JSON.stringify(bubbleStageDirection))
  },

}

function updateStageDirection(bubble, existingBubbleIndex, res) {
  const newStageDirection = [...bubbleStageDirection]
  if (existingBubbleIndex) {
    newStageDirection[existingBubbleIndex] = bubble
  } else {
    newStageDirection.push(bubble)
  }

  uploadJSON(
    newStageDirection,
    BubbleStageDirectionKey + 'latest'
  ).then(() => {
    bubbleStageDirection = newStageDirection
    res.status(200).end()
  }).catch(e => res.status(500).end('json upload failed: ' + e))
}

function fetchBubbleStageDirection() {
  s3.getObject({
    Bucket: BUCKET,
    Key: BubbleStageDirectionKey + 'latest.json',
    ResponseCacheControl: 'no-cache',
  }, (err, data) => {
    if (err) console.error('stage direction fetch failed!', err)
    else bubbleStageDirection = JSON.parse(data.Body.toString())
  })
}

function uploadJSON(json, key) {
  const fullKey = key + '.json'
  const params = {
    ...getDefaultS3Params(),
    Key: fullKey,
    ContentType: 'application/json',
    Body: JSON.stringify(json),
    Metadata: {
      'Cache-Control': 'no-cache',
    }
  }
  return new Promise((resolve, reject) => {
  	s3.putObject(params, (err, data) => {
  		if (err) {
  	    	console.error("error uploading json to S3: ", err)
  	    	reject(err)
  	    } else {
  	    	console.log("successfully uploaded json to S3", data)
          resetCache(['/' + fullKey])
          resolve(data)
  	    }
  	})
  })
}

function uploadJPEG(imageData, key, metadata = {}) {
  const fullKey = key + '.jpg'
  const imageBuffer = Buffer.from(
    imageData.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  )
  const params = {
    ...getDefaultS3Params(),
    Key: fullKey,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    Body: imageBuffer,
    Metadata: metadata,
  }
  return new Promise((resolve, reject) => {
  	s3.putObject(params, (err, data) => {
  		if (err) {
  	    	console.error("error uploading image: ", err)
  	    	reject(err)
  	    } else {
  	    	console.log("successfully uploaded image to S3", data)
          // resetCache(['/' + fullKey])
  	    	resolve(data)
  	    }
  	})
  })
}

function getDefaultS3Params() {
  return {
    Bucket: BUCKET,
    ACL: 'public-read',
  }
}

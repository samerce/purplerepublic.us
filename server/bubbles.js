const {s3, BUCKET} = require('./purpleAWS')

const KEY_BUBBLE_STAGE_DIRECTION_ROOT = 'bubbles/stageDirection/'
const BubbleImageRootKey = 'bubbles/buttonImages/'

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
    uploadJSON(
      bubbleStageDirection,
      KEY_BUBBLE_STAGE_DIRECTION_ROOT + new Date().toISOString()
    ).then(() => {
      bubbleStageDirection = bubbleStageDirection.filter(
        bubbleProps => bubbleProps.id !== req.body.bubbleId
      )
      uploadJSON(bubbleStageDirection, KEY_BUBBLE_STAGE_DIRECTION_ROOT + 'latest')
        .then(() => res.status(200).end())
        .catch((e) => res.status(500).end(e))
    }).catch((e) => res.status(500).end(e))
  },

  updateArrangement: ({body: newBubbles}, res) => {
    uploadJSON(newBubbles, KEY_BUBBLE_STAGE_DIRECTION_ROOT + 'latest')
      .then(() => {
        bubbleStageDirection = newBubbles
        res.status(200).end()
      })
      .catch((e) => res.status(500).end('update failed: ' + e))
  },

  getStageDirectionScript(req, res) {
    return res.send('window.bubbles=' + JSON.stringify(bubbleStageDirection))
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
    KEY_BUBBLE_STAGE_DIRECTION_ROOT + 'latest'
  ).then(() => {
    bubbleStageDirection = newStageDirection
    res.status(200).end()
  }).catch(e => res.status(500).end('json upload failed: ' + e))
}

function fetchBubbleStageDirection() {
  s3.getObject({
    Bucket: BUCKET,
    Key: KEY_BUBBLE_STAGE_DIRECTION_ROOT + 'latest.json',
  }, (err, data) => {
    if (err) console.error('stage direction fetch failed!', err)
    else bubbleStageDirection = JSON.parse(data.Body.toString())
  })
}

function uploadJSON(json, key) {
  const params = {
    ...getDefaultS3Params(),
    Key: key + '.json',
    ContentType: 'application/json',
    Body: JSON.stringify(json),
  }
  return new Promise((resolve, reject) => {
  	s3.putObject(params, (err, data) => {
  		if (err) {
  	    	console.error("error uploading json to S3: ", err)
  	    	reject(err)
  	    } else {
  	    	console.log("successfully uploaded json to S3", data)
  	    	resolve(data)
  	    }
  	})
  })
}

function uploadJPEG(imageData, key, metadata = {}) {
  const imageBuffer = Buffer.from(
    imageData.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  )
  const params = {
    ...getDefaultS3Params(),
    Key: `${key}.jpg`,
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
  	    	resolve(data)
  	    }
  	})
  })
}

function getDefaultS3Params() {
  return {
    Bucket: 'purplerepublic.us',
    ACL: 'public-read',
  }
}
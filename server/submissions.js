const {uploadFileToS3} = require('./purpleAWS')

module.exports = {

  upload: (req, res) => {
    const contentInfo = req.file.mimetype.split('/')
    const type = contentInfo[0]
    const extension = contentInfo[1]
    uploadFileToS3({
      key: `submissions/${type}/${new Date().getTime()}`,
      fileData: req.file,
    })
      .then(response => res.status(200).end())
      .catch(e => res.status(500).end('upload failed: ' + e))
  },

}

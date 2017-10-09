const formidable = require('formidable')
const Image = require('./../models/ImageSchema')
const Tag = require('./../models/TagSchema')
let form = new formidable.IncomingForm()
let addImage = (req, res) => {
  form.parse(req, (err, imageObj) => {
    if (err) {
      console.log(err)
      return
    }

    imageObj.tags = imageObj.tagsID.split(',')
    imageObj.tags.pop()
    delete imageObj.tagsID

    Image.create(imageObj)
      .then(img => {
        Tag.update(
          {
            _id: { $in: imageObj.tags }
          },
          { $push: { images: img._id } },
          { multi: true }
        ).then(console.log)
      })
      .catch(errorHandler)
    res.writeHead(302, {
      location: '/'
    })
    res.end()
  })
}
module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}

function errorHandler (err) {
  console.warn(err)
}

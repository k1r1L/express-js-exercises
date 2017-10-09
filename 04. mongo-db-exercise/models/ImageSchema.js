const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const imageSchema = mongoose.Schema({
  imageUrl: { type: String, required: true },
  imageTitle: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now() },
  description: { type: String, required: true },
  tags: [ { type: ObjectId, ref: 'Tag' } ]
})

module.exports = mongoose.model('Image', imageSchema)

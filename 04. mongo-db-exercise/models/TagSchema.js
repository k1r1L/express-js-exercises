const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const tagSchema = mongoose.Schema({
  tagName: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now() },
  images: [ { type: ObjectId, ref: 'Image' } ]
})

tagSchema.pre('save', function (next) {
  this.tagName = this.tagName.toLowerCase()
  next()
})

module.exports = mongoose.model('Tag', tagSchema)

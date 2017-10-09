const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let connectionString = 'mongodb://localhost:27017/imageDb'

module.exports = mongoose.connect(connectionString, err => {
  if (err) {
    console.log(err)
  }
})

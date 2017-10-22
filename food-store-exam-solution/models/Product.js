const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: Number, required: true },
  toppings: { type: [], default: [] }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product

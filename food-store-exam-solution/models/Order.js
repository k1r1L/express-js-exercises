const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  status: { type: String, required: true, default: 'Pending' },
  toppings: { type: [], default: [] },
  orderedOn: { type: Date, default: Date.now() }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order

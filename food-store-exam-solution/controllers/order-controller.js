const Order = require('../models/Order')
const Product = require('../models/Product')
module.exports = {
  place: {
    get: (req, res) => {
      let productId = req.params.productId
      Product.findById(productId)
        .then(product => {
          if (!product) {
            return res.redirect('/error?=No such product')
          }

          res.render('order/orderForm', product)
        })
        .catch(console.warn)
    },
    post: (req, res) => {
      let orderData = {
        user: req.user._id,
        product: req.params.productId,
        toppings: req.body.toppings
      }

      Order.create(orderData)
        .then(order => {
          res.redirect(`/order/myorders/${req.user._id}`)
        })
        .catch(err => {
          res.redirect(`/error=?${err.errors}`)
        })
    }
  },
  myorders: (req, res) => {
    let userId = req.params.userId
    Order.find({ user: userId })
      .populate('product')
      .then(orders => {
        for (let order of orders) {
          order.orderedOnStr = order.orderedOn.toDateString()
        }
        res.render(`order/myorders`, { orders })
      })
      .catch(err => {
        res.redirect(`/error=?${err.errors}`)
      })
  },
  details: (req, res) => {
    let orderId = req.params.orderId

    Order.findById(orderId)
      .populate('product')
      .then(order => {
        order.pendingStatus = 'checkpoint'
        order.inProgressStatus = 'checkpoint'
        order.inTransitStatus = 'checkpoint'
        order.deliveredStatus = 'checkpoint'

        if (order.status === 'Pending') {
          order.pendingStatus += ' current'
        } else if (order.status === 'In Progress') {
          order.inProgressStatus += ' current'
        } else if (order.status === 'In transit') {
          order.inTransitStatus += ' current'
        } else {
          order.deliveredStatus += ' current'
        }

        order.orderedOnStr = order.orderedOn.toDateString()
        console.log(order)
        res.render('order/details', order)
      })
      .catch(err => {
        res.redirect(`/error=?${err.errors}`)
      })
  },
  allGet: (req, res) => {
    Order.find({})
      .populate('product')
      .then(allOrders => {
        for (let order of allOrders) {
          order.pending = order.status === 'Pending'
          order.inProgress = order.status === 'In Progress'
          order.inTransit = order.status === 'In transit'
          order.delivered = order.status === 'Delivered'
          order.orderedOnStr = order.orderedOn.toDateString()
        }

        res.render('admin/allOrders', { allOrders })
      })
      .catch(err => {
        res.redirect(`/error=?${err.errors}`)
      })
  },
  allPost: async (req, res) => {
    let ids = req.body.orderId
    let statuses = req.body.status

    // console.log(ids)
    await Order.find({ _id: { $in: ids } })
      .then(orders => {
        let i = 0
        for (let status of statuses) {
          if (orders[i].status !== status) {
            if (status === 'Delivered') {
              Order.findByIdAndRemove(orders[i]._id, (err, removed) => {
                if (err) {
                  console.log(err)
                }
                console.log(removed)
              })
            } else {
              orders[i].status = status
              orders[i].save()
            }
          }
          i++
        }

        res.redirect('/admin/orders/all')
      })
      .catch(err => {
        res.redirect(`/error=?${err.errors}`)
      })
  }
}

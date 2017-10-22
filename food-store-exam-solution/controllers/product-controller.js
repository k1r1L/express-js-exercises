const Product = require('../models/Product')

module.exports = {
  createGet: (req, res) => {
    res.render('admin/productForm')
  },
  createPost: (req, res) => {
    let productData = req.body
    productData.size = Number(productData.size)

    Product.create(productData)
      .then(p => {
        console.log(p)
      })
      .catch(console.warn)
    res.redirect('back')
  }
}

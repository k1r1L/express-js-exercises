const Product = require('../models/Product')

module.exports = {
  get: async (req, res) => {
    let data = {} // All Doners
    // Lamb Doners
    await Product.find({ category: 'lamb' })
      .then(lambDoners => {
        data.lambDoners = lambDoners
      })
      .catch(console.warn)

    // Beef Doners
    await Product.find({ category: 'beef' })
      .then(beefDoners => {
        data.beefDoners = beefDoners
      })
      .catch(console.warn)

    // Chicken Doners
    await Product.find({ category: 'chicken' })
      .then(chickenDoners => {
        data.chickenDoners = chickenDoners
      })
      .catch(console.warn)
    
    res.render('home/index', data)
  }
}

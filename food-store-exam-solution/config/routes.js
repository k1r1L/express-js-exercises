const controllers = require('../controllers')
const auth = require('./auth')

module.exports = app => {
  // Authentication Routes
  app.get('/', controllers.home.get)
  app.get('/user/register', controllers.user.register.get)
  app.post('/user/register', controllers.user.register.post)
  app.post('/user/logout', controllers.user.logout)
  app.get('/user/login', controllers.user.login.get)
  app.post('/user/login', controllers.user.login.post)

  // Order Routes
  app.get('/order/place/:productId', auth.isAuthed, controllers.order.place.get)
  app.post('/order/place/:productId', auth.isAuthed, controllers.order.place.post)
  app.get('/order/myorders/:userId', auth.isAuthed, controllers.order.myorders)
  app.get('/order/details/:orderId', auth.isAuthed, controllers.order.details)

  // Admin Routes
  app.get('/admin/product/create', auth.hasRole('Admin'), controllers.product.createGet)
  app.post('/admin/product/create', auth.hasRole('Admin'), controllers.product.createPost)
  app.get('/admin/orders/all', auth.hasRole('Admin'), controllers.order.allGet)
  app.post('/admin/orders/all', auth.hasRole('Admin'), controllers.order.allPost)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}

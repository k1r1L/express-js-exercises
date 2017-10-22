const express = require('express')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const fileUpload = require('express-fileupload')
const passport = require('passport')
const path = require('path')

module.exports = (app, config) => {
  app.use(fileUpload())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(
    session({
      secret: '123456',
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // Custom middleware
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.user = req.user
    }

    next()
  })

  app.use((req, res, next) => {
    if (req.user) {
      let isAdmin = req.user.roles.indexOf('Admin') !== -1
      res.locals.isAdmin = isAdmin
    } else {
      res.locals.isAdmin = false
    }

    next()
  })

  // Set View Engine
  app.engine(
    '.hbs',
    handlebars({
      defaultLayout: 'main',
      extname: '.hbs'
    })
  )
  app.set('view engine', '.hbs')

  // Configure "public" folder
  app.use(express.static('./public'))
}

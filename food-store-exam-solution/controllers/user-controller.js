const User = require('../models/User')
const encryption = require('../util/encryption')

module.exports = {
  register: {
    get: (req, res) => {
      res.render('user/register')
    },
    post: (req, res) => {
      let userData = req.body

      if (
        userData.password &&
        userData.password !== userData.confirmedPassword
      ) {
        userData.error = 'Passwords do not match'
        res.render('user/register', userData)
        return
      }

      let salt = encryption.generateSalt()
      userData.salt = salt

      if (userData.password) {
        userData.hashedPass = encryption.generateHashedPassword(
          salt,
          userData.password
        )
      }

      User.create(userData)
        .then(user => {
          req.logIn(user, (err, user) => {
            if (err) {
              res.render('users/register', { error: 'Wrong credentials!' })
              return
            }

            res.redirect('/')
          })
        })
        .catch(error => {
          userData.error = error
          res.render('user/register', userData)
        })
    }
  },
  login: {
    get: (req, res) => {
      res.render('user/login')
    },
    post: (req, res) => {
      let userData = req.body

      User.findOne({ username: userData.username }).then(user => {
        if (!user || !user.authenticate(userData.password)) {
          res.render('user/login', { error: 'Wrong credentials!' })
          return
        }

        req.logIn(user, (err, user) => {
          if (err) {
            res.render('user/login', { error: 'Wrong credentials!' })
            return
          }

          res.redirect('/')
        })
      })
    }
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}

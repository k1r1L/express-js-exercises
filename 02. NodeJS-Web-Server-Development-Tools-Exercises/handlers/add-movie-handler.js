const fs = require('fs')
const formidable = require('formidable')
const db = require('../config/dataBase')

module.exports = (req, res) => {
  let isValid = false
  if (req.path === '/views/addMovie') {
    let isPost = req.method === 'POST'
    if (isPost) {
      let form = new formidable.IncomingForm()

      form.parse(req, (err, movieObj) => {
        if (err) {
          console.log(err.message)
          return
        }

        if (movieObj['movieTitle'] !== '' && movieObj['moviePoster'] !== '') { // The movie is valid (insert to DB)
          db.push(movieObj)
          isValid = true
        }
      })
    }

    fs.readFile('.' + req.path + '.html', (err, data) => {
      if (err) {
        console.log(err.message)
        return
      }
      if (isPost) {
        if (isValid) {
          data = data.toString()
            .replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>')
        } else {
          data = data.toString()
            .replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>')
        }
      }

      res.writeHead(200, {
        'content-type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}

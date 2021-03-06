const fs = require('fs')
const db = require('../config/dataBase')

module.exports = (req, res) => {
  if (req.path.startsWith('/movies/details')) {
    fs.readFile('./views/details.html', (err, data) => {
      if (err) {
        console.log(err.message)
        return
      }
      let movieId = Number(req.path.substring(req.path.lastIndexOf('/') + 1))
      let movieObj = db[movieId]
      let movieResult = `<div class="content">
      <img src="${unescape(movieObj['moviePoster'])}" alt=""/>
      <h3>Title  ${decodeURI(movieObj['movieTitle'])}</h3>
      <h3>Year ${movieObj['movieYear']}</h3>
      <p>${decodeURI(movieObj['movieDescription'])}</p></div>`

      data = data.toString()
      .replace('<div id="replaceMe">{{replaceMe}}</div>', movieResult)

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

const fs = require('fs')
const db = require('../config/dataBase')

module.exports = (req, res) => {
  if (req.path === '/views/viewAll') {
    fs.readFile('.' + req.path + '.html', (err, data) => {
      if (err) {
        console.log(err.message)
        return
      }

      let moviesResult = ''
      let id = 0
      for (let movieObj of db) {
        let decodedUri = unescape(movieObj.moviePoster)
        moviesResult += `<a href="/movies/details/${id}"><div class="movie">
        <img class="moviePoster" src="${decodedUri}"/>          
      </div></a>`
        id++
      }

      data = data.toString()
      .replace('<div id="replaceMe">{{replaceMe}}</div>', moviesResult)

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

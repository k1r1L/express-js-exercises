const fs = require('fs')
let getContentType = (url) => {
  let contentType = ''
  if (url.endsWith('.css')) {
    contentType = 'text/css'
  } else if (url.endsWith('.js')) {
    contentType = 'application/javascript'
  } else if (url.endsWith('.png')) {
    contentType = 'image/png'
  } else if (url.endsWith('.jpg')) {
    contentType = 'image/jpeg'
  }

  return contentType
}

module.exports = (req, res) => {
  if (req.path.startsWith('/content')) {
    fs.readFile('.' + req.path, (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      res.writeHead(200, {
        'content-type': getContentType(req.path)
      })
      res.write(data)
      res.end()
    })
  } else {
    fs.readFile('./views/error.html', (err, data) => {
      if (err) {
        console.log(err.message)
        return
      }

      res.writeHead(404, {
        'content-type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  }
}

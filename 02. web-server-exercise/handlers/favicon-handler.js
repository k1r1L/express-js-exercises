const fs = require('fs')
const faviconIco = '/favicon.ico'
module.exports = (req, res) => {
  if (req.path === faviconIco) {
    fs.readFile('.' + faviconIco, (err, data) => {
      if (err) {
        console.log(err.message)
        return
      }

      res.writeHead(200, {
        'content-type': 'image/x-icon'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}

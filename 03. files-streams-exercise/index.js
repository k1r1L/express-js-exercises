const http = require('http')
const url = require('url')
const handlers = require('./handlers/handlerBlender')
const db = require('./config/dataBase')
const port = 1337

db
  .load()
  .then(() => {
    http
      .createServer((req, res) => {
        for (let handler of handlers) {
          req.pathname = url.parse(req.url).pathname
          let next = handler(req, res)
          if (!next) {
            break
          }
        }
      })
      .listen(port)
    console.log('Im listening on ' + port)
  })
  .catch(() => {
    console.log('Failed to load DB')
  })

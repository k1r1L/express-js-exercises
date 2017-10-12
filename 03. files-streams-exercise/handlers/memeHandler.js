const fs = require('fs')
const db = require('../config/dataBase')
const formidable = require('formidable')
const url = require('url')
const qs = require('querystring')
const randomstring = require('randomstring')
const form = new formidable.IncomingForm()

function viewAll (req, res) {
  db
    .load()
    .then(() => {
      let allMemes = db.getDb()
      allMemes = allMemes.sort((a, b) => {
        return a.datestamp < b.datestamp
      })

      fs.readFile('./views/viewAll.html', (err, data) => {
        if (err) {
          console.log(err['message'])
          return
        }

        let memesResult = ''
        for (let meme of allMemes) {
          memesResult += `<div class="meme">
                <a href="/getDetails?id=${meme.id}">
                <img class="memePoster" src="${meme.memeSrc}"/></div>`
        }

        data = data
          .toString()
          .replace('<div id="replaceMe">{{replaceMe}}</div>', memesResult)
        res.writeHead(200, {
          'content-type': 'text/html'
        })
        res.end(data)
      })
    })
    .catch(console.warn)
}

function viewAddMeme (req, res) {
  fs.readFile('./views/addMeme.html', (err, data) => {
    if (err) {
      console.log(err['message'])
      return
    }
    res.writeHead(200, {
      'content-type': 'text/html'
    })
    res.end(data)
  })
}

function addMeme (req, res) {
  form.parse(req, (err, imageObj, files) => {
    if (err) {
      console.log(err['message'])
      return
    }

    let memeImage = files['meme']
    let imageSrc = randomstring.generate(10) + '.jpg'
    fs.rename(memeImage['path'], './public/memeStorage/1/' + imageSrc, err => {
      if (err) {
        console.log(err['message'])
        return
      }

      imageObj.id = randomstring.generate(9)
      imageObj.memeSrc = `./public/memeStorage/1/${imageSrc}`
      imageObj.datestamp = Date.now()
      db.add(imageObj)
      db
        .save()
        .then(() => {
          res.writeHead(302, {
            location: '/viewAllMemes'
          })
          res.end()
        })
        .catch(console.warn)
    })
  })
}

function getDetails (req, res) {
  fs.readFile('./views/details.html', (err, data) => {
    if (err) {
      console.log(err['message'])
      return
    }
    let urlObj = url.parse(req.url)
    let memeId = qs.parse(urlObj.query).id
    let targetedMeme = db.getDb().find(meme => meme.id === memeId)

    let resultStr = `<div class="content">
    <img src="${targetedMeme.memeSrc}" alt=""/>
    <h3>Title  ${targetedMeme.title}</h3>
    <p> ${targetedMeme.description}</p>
    <button><a href="${targetedMeme.memeSrc}" download=" ${targetedMeme.title}.jpg">Download Meme</a></button>
    </div>`

    data = data
      .toString()
      .replace('<div id="replaceMe">{{replaceMe}}</div>', resultStr)
    res.writeHead(200, {
      'content-type': 'text/html'
    })
    res.end(data)
  })
}
module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else {
    return true
  }
}

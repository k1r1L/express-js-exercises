const Tag = require('../models/TagSchema')
const formidable = require('formidable')

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let form = formidable.IncomingForm()
    form.parse(req, (err, tagObj) => {
      if (err) {
        console.log(err)
        return
      }

      if (tagObj['tagName'] !== '') {
        new Tag({tagName: tagObj['tagName']})
          .save()
          .then((tagInDb) => {
            console.log(tagInDb)
          })
          .catch(console.warn)
      }
    })

    res.writeHead(302, {
      'location': '/'
    })
    res.end()
  } else {
    return true
  }
}

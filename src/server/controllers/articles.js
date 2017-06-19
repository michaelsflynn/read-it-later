const Articles = require('../models/articles')
const read = require('node-readability')

exports.post = (req, res, next) => {
  console.log('Article Post Req:', req.body)
  read(req.body.url, (err, result) => {
    (err) ? console.error(err) : Articles.create({title: result.title, body: result.textBody, user: req.body.user},
    (err, article) => {
      (err) ? console.error(err) : console.log('Artical Saved')
    })
  })
  res.send('Formatted and Saved Article')
}

exports.get = (req, res, next) => {
  Articles.find({user: req.params.email}, (err, articles) => {
    (err)
    ? console.error(err)
    : res.send(articles)
  })
}

exports.del = (req, res, next) => {
  console.log('Delete Request:', req)
  Articles.findByIdAndRemove(req.params.id, (err, doc) => {
    (err) ? console.error(err) : res.send('Deleted Saved Article For You!')
  })
}

exports.upd = (req, res, next) => {
  // console.log(req.params, req.body)
  Articles.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    (err) ? console.error(err) : console.log(doc)
  })
  res.send('Updated Document')
}

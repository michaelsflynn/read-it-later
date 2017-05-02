const Articles = require('../models/articles')
const read = require('node-readability')

// exports.post = (req, res, next) => {
//   articles.create({title: req.body.title, author: req.body.author},
//   (err, article) => { if (err) console.error(err) })
//   res.send('Article Saved')
// }

exports.post = (req, res, next) => {
  read(req.body.url, (err, result) => {
    (err) ? console.error(err) : Articles.create({title: result.title, body: result.content},
    (err, article) => {
      (err) ? console.error(err) : console.log('Artical Saved')
    })
  })
  res.send('Formatted Saved Article')
}

exports.get = (req, res, next) => {
  Articles.find({}, (err, articles) => {
    (err) ? console.error(err)
    : res.format({
      html: () => {
        res.render('articles.ejs', { articles: articles })
      },
      json: () => {
        res.send(articles)
      }
    })
  })
  console.log('Retrieved Saved Articles')
}

exports.del = (req, res, next) => {
  // console.log(req.params)
  Articles.findByIdAndRemove(req.params.id, (err, doc) => {
    (err) ? console.error(err) : console.log(doc)
  })
  res.send('Deleted Document')
}

exports.upd = (req, res, next) => {
  // console.log(req.params, req.body)
  Articles.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    (err) ? console.error(err) : console.log(doc)
  })
  res.send('Updated Document')
}

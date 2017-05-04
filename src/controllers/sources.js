const Sources = require('../models/sources')

exports.get = (req, res, next) => {
  Sources.find({}, (err, sources) => {
    (err) ? console.error(err)
    : res.format({
      html: () => {
        res.render('sources.ejs', { sources: sources })
      },
      json: () => {
        res.send(sources)
      }
    })
  })
  console.log('Retrieved Sources from Mongo')
}

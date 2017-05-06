const Sources = require('../models/sources')

exports.get = (req, res, next) => {
  Sources.find({}, (err, sources) => {
    (err) ? console.error(err)
    : res.format({
      json: () => {
        res.send(sources)
      }
    })
  })
  console.log('Retrieved Sources from Mongo')
}

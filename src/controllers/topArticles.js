const TopArticles = require('../models/topArticles')

exports.get = (req, res, next) => {
  TopArticles.find({}, (err, topArticles) => {
    (err) ? console.error(err)
    : res.format({
      html: () => {
        res.render('topArticles.ejs', { topArticles: topArticles })
      },
      json: () => {
        res.send(topArticles)
      }
    })
  })
  console.log('Retrieved Top Articles from Mongo')
}

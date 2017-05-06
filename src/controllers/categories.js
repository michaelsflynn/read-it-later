const Categories = require('../models/categories')

exports.get = (req, res, next) => {
  Categories.find({}, (err, cats) => {
    (err) ? console.error(err)
    : res.format({
      json: () => {
        res.send(cats)
      }
    })
  })
  console.log('Retrieved Categories from Mongo')
}

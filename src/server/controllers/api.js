const Sources = require('../models/sources')
const Categories = require('../models/categories')
const fetch = require('node-fetch')

exports.get = (req, res, next) => {
  console.log('Data Param:', req.params.data)
  if (req.params.data === 'src') {
    fetch('https://newsapi.org/v1/sources?language=en')
    .then((response) => response.json())
    .then((data) => loadSources(data))
    .then((response) => res.send(response))
    .catch((err) => res.send(err.toString()))
  }
  if (req.params.data === 'cat') {
    Sources.distinct('category')
    .then((data) => writeCategories(data))
    .then((response) => res.send(response))
    .catch((err) => res.send(err.toString()))
  }
}

// ********************************************
// Helper Functions not Exported - Load Sources
// ********************************************

function loadSources (data) {
  console.log('Running loadSources Function')
  return new Promise(
    function (resolve, reject) {
      if (data.sources.length > 0) {
        console.log('Sources Data Available')
        resolve(
          Sources.remove({}, (err, count) => { // remove callback
            (err) ? err
          : console.log('Sources Documents Removed:', count.result.n)
          }) // remove close
        .then(() => {
          data.sources.forEach((src) => { // forEach
            writeSourceDoc(src)
          }) // forEach close
          return 'Sources Documents Written to MongoDB'
        }) // then close
        .catch((err) => err) // catch
        ) // resolve
      } // if
      reject(new Error('Sources Did Not Return New Data'))
    } // function promise close
  ) // Promise close
} // loadSources close

function writeSourceDoc (src) {
  Sources.create({
    id: src.id,
    name: src.name,
    description: src.description,
    url: src.url,
    category: src.category,
    language: src.language,
    country: src.country,
    urlsToLogos: {
      small: src.urlsToLogos.small,
      medium: src.urlsToLogos.medium,
      large: src.urlsToLogos.large
    },
    sortBysAvailable: src.sortBysAvailable,
    fetchdata: false
  }
    , (err, src) => {
    (err) ? console.log(err)
      : console.log('Source:', src.name)
  } // create callback
  ) // create close
}

// **************************************************
// Helper Functions not Exported - Loading Categories
// **************************************************

function writeCategories (data) {
  console.log('Running writeCategories Function')
  return new Promise(
    function (resolve, reject) {
      if (data.length > 0) {
        console.log('Categories Data Available')
        resolve(
          Categories.remove({}, (err, count) => { // remove callback
            (err) ? err
          : console.log('Categories Documents Removed:', count.result.n)
          }) // remove close
        .then(() => {
          data.sort().forEach((cat) => { // forEach
            Categories.create({
              id: cat,
              category: cat
            }
            , (err, src) => {
            (err) ? console.log(err)
              : console.log('Category:', cat)
            } // create callback
          ) // create close
          }) // forEach close
          return 'Categories Documents Written to MongoDB'
        }) // then close
        .catch((err) => err) // catch
        ) // resolve
      } // if
      reject(new Error('Categories Did Not Return New Data'))
    } // function promise close
  ) // Promise close
} // writeCategories close

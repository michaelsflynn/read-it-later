const Sources = require('../models/sources')
const TopArticles = require('../models/topArticles')
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
  if (req.params.data === 'top') {
    Sources.find().where('fetchdata').equals(true).select('id -_id')
    .then((data) => getTopArticles(data))
    .then((response) => res.send(response))
    .catch((err) => res.send(err.toString()))
  }
}
// setFetchData()

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

// *************************************************
// Helper Functions not Exported - Load Top Articles
// *************************************************

function getTopArticles (data) {
  return new Promise(
    function (resolve, reject) {
      if (data.length > 0) {
        resolve(
          TopArticles.remove({}, (err, count) => { // remove callback
            (err) ? err
          : console.log('Top Articles Documents Removed:', count.result.n)
          }) // remove close
          .then(() => {
            data.forEach((src) => {
              const url = 'https://newsapi.org/v1/articles?source=' + src.id + '&sortBy=top&apiKey=c6a6b6c8a55d4ddcacd7ca0a32c8f20a'
              fetch(url)
              .then((response) => response.json())
              .then((data) => loadTopArticles(data))
              .then((response) => console.log(response))
              .catch((err) => console.log(err.toString()))
            }) // forEach **
            return 'Top Articles Load Complete for Specified Sources'
          }) // then
          .catch((err) => err)
        ) // resolve
      } // if
      reject(new Error('No Sources Marked to FetchData for Top Articles'))
    } // promise function
  ) // promise
} // getTopArticles

function loadTopArticles (data) {
  console.log('Running loadTopArticles Function For:', data.source)
  return new Promise(
    function (resolve, reject) {
      if (data.status === 'ok') {
        console.log(data.source + ': Articles Data Available')
        data.articles.forEach((art) => { // forEach
          writeTopArticleDoc(art, data.source)
        }) // forEach close
        resolve(data.source + ': Documents Written to MongoDB')
      } // if
      reject(new Error(data.message))
    } // function promise close
  ) // Promise close
} // loadTopArticles close

function writeTopArticleDoc (art, src) {
  TopArticles.create({
    id: src,
    author: art.author,
    title: art.title,
    description: art.description,
    url: art.url,
    urlToImage: art.urlToimage,
    publishedAt: art.publishedAt
  }
  , (err, topArt) => {
    (err) ? console.log(err)
    : console.log('Title: ', topArt.title)
  }) // create
}

function setFetchData () {
  Sources.findOneAndUpdate({id: 'business-insider'}, {fetchdata: true}, (err) => err)
  Sources.findOneAndUpdate({id: 'cnbc'}, {fetchdata: true}, (err) => err)
  Sources.findOneAndUpdate({id: 'hacker-news'}, {fetchdata: true}, (err) => err)
  Sources.findOneAndUpdate({id: 'mashable'}, {fetchdata: true}, (err) => err)
  Sources.findOneAndUpdate({id: 'nfl-news'}, {fetchdata: true}, (err) => err)
  Sources.findOneAndUpdate({id: 'techcrunch'}, {fetchdata: true}, (err) => err)
  Sources.findOneAndUpdate({id: 'buzzfeed'}, {fetchdata: true}, (err) => err)
  Sources.findOneAndUpdate({id: 'the-verge'}, {fetchdata: true}, (err) => err)
  Sources.findOneAndUpdate({id: 'recode'}, {fetchdata: true}, (err) => err)
  Sources.findOneAndUpdate({id: 'reddit-r-all'}, {fetchdata: true}, (err) => err)
}

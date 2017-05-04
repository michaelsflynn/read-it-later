const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const topArticlesSchema = new Schema({
  id: String,
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date
})

// Create a mongoose model using schema
const TopArticles = mongoose.model('TopArticles', topArticlesSchema)

// Make model available to the Node application
module.exports = TopArticles

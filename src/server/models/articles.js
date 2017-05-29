const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const articleSchema = new Schema({
  title: String,
  author: String,
  body: String,
  website: String,
  created_at: Date,
  updated_at: Date
})

// Create a mongoose model using schema
const Articles = mongoose.model('Articles', articleSchema)

// Make model available to the Node application
module.exports = Articles

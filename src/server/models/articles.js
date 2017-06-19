const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const articleSchema = new Schema({
  user: String,
  title: String,
  body: String
},
  { timestamps: true }
)

// Create a mongoose model using schema
const Articles = mongoose.model('Articles', articleSchema)

// Make model available to the Node application
module.exports = Articles

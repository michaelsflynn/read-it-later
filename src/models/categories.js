const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const categoriesSchema = new Schema({
  id: String,
  category: String
})

// Create a mongoose model using schema
const Categories = mongoose.model('Categories', categoriesSchema)

// Make model available to the Node application
module.exports = Categories

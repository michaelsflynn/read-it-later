const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  website: String,
  created_at: Date,
  updated_at: Date
})

// Create a mongoose model using schema
const User = mongoose.model('User', userSchema)

// Make model available to the Node application
module.exports = User

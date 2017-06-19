// Import required modules
const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = require('promise')
const bodyParser = require('body-parser')
const config = require('./config/main')
const router = require('./router')

// Initialize Server and DB
const server = express()
mongoose.connect(config.database)

// Start Server and DB
const db = mongoose.connection
db.on('error', console.error.bind(console, 'DB Connection Error:'))
db.once('open', () => {
  server.listen(config.port)
  console.log('DB connected successfully and APP listening at: ' + Date())
})

// Setup Request Handling
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(express.static('dist'))

// Call router to connect the routing of requests
router(server)

module.exports = server

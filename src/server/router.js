const controllers = require('./controllers')
const express = require('express')
const passport = require('passport')
const passportService = require('./config/passport')

// Middleware to require login/auth
// const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

module.exports = (server) => {
  // ***********************
  // Initializing route groups
  // ***********************
  const authRoutes = express.Router()
  const artRoutes = express.Router()

  // Registration and Login routes
  authRoutes.post('/register', controllers.authentication.register)
  authRoutes.post('/login', requireLogin, controllers.authentication.login)

  // Artile routes for read it later
  artRoutes.get('/get/:email', controllers.articles.get)
  artRoutes.post('/post', controllers.articles.post)
  artRoutes.delete('/del/:id', controllers.articles.del)

  // Set urls for incoming routes
  server.use('/auth', authRoutes)
  server.use('/articles', artRoutes)
  server.use('/', controllers.handleRender.get)
  // server.use('/', mainRoutes)

  // api loads Sources and rolls up Categories
  // server.get('/api/:data', controllers.api.get)

  // crud for saved articles
  // server.get('/articles', controllers.articles.get)
  // server.post('/articles', controllers.articles.post)
  // server.delete('/articles/:id', controllers.articles.del)
  // server.put('/articles/:id', controllers.articles.upd)
}

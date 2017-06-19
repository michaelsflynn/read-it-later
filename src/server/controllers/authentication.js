const jwt = require('jsonwebtoken')
const User = require('../models/users')
const config = require('../config/main')

// Registration Route
exports.register = (req, res, next) => {
  console.log('Register Handler Body:', req.body)
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const password = req.body.password
  const category = req.body.category
  const source = req.body.source
  const role = req.body.role

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' })
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' })
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.' })
  }

  // Return error if no preferences provided
  if (!category || !source) {
    return res.status(422).send({ error: 'You must enter your preferred category and source.' })
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err) }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' })
    }

    // If email is unique and password was provided, create account
    let user = new User({
      email: email,
      password: password,
      profile: { firstName: firstName, lastName: lastName },
      category: category,
      source: source,
      role: role
    })

    user.save((err, user) => {
      if (err) { return next(err) }

      // Respond with JWT if user was created
      let userInfo = setUserInfo(user)
      console.log('Register userInfo:', userInfo)
      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      })
    })
  })
}

// Login Route
exports.login = (req, res, next) => {
  console.log('Login Handler Body:', req.body)
  console.log('Login Handler User:', req.user)

  let userInfo = setUserInfo(req.user)
  console.log('Login userInfo:', userInfo)
  res.status(201).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  })
}

// Helper functions for auth handler
const generateToken = (user) => {
  return jwt.sign(user, config.secret, {
    expiresIn: 600 // in seconds
  })
}

const setUserInfo = (request) => {
  return {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    role: request.role,
    category: request.category,
    source: request.source
  }
}

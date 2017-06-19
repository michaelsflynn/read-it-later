const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// create a schema
const userSchema = new Schema({
  email: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    firstName: { type: String },
    lastName: { type: String }
  },
  role: { type: String, enum: ['Admin', 'Member'], default: 'Member' },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
  category: { type: String },
  source: { type: String }
},
  { timestamps: true }
)

// Pre-save of user to database, hash password if password is modified or new
userSchema.pre('save', function (next) {
  const user = this
  const SALT_FACTOR = 5

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  }) // genSalt
})

// Method to compare password for login
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err) }

    callback(null, isMatch)
  })
}

// Create a mongoose model using schema
const User = mongoose.model('User', userSchema)

// Make model available to the Node application
module.exports = User

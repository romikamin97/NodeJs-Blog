const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Hash password before saving to database
UserSchema.pre('save', async function () {
  const user = this
  if (!user.isModified('password')) {
    return
  }
  const salt = await bcrypt.genSalt(saltRounds)
  user.password = await bcrypt.hash(user.password, salt)
})

// Compare password with hashed password in database
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// Generate a JWT token
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
  return token
}

UserSchema.statics.findByToken = async function (token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return await this.findOne({ _id: decoded._id })
  } catch (err) {
    return NaN
  }
}

module.exports = mongoose.model('User', UserSchema)

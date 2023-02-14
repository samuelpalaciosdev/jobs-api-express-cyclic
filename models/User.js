const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must be provided'],
    trim: true,
    maxLength: 20,
  },
  email: {
    type: String,
    required: [true, 'Name must be provided'],
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a valid password with minimum 8 characters'],
    trim: true,
    minLength: 8,
  },
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10); // Creates random string that is added to the password
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
});

module.exports = mongoose.model('User', UserSchema);

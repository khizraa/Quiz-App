var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

require('dotenv').config();

mongoose.connect(process.env.mongo_url);

const user_signup = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});



user_signup.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', user_signup);


const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const  validator = require('validator');
const  findOrCreate = require('mongoose-findorcreate')

const userSchema = new mongoose.Schema({
// username and password feild is automaically added by the passport-local-mongoose
  email : {
    type : String,
    unique : true,
    required : true,
    validate: [validator.isEmail, 'Email format is invalid']
  },
  profilepic : {
    type : String,
  }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const user = mongoose.model("user" , userSchema);

module.exports = user;
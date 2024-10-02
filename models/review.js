const { required } = require('joi');
const mongoose = require('mongoose');

const rewiewSchema = new mongoose.Schema({
     comment : {
        type : String,
        required : true,
     },
     rating : {
        type : Number,
        min : 1,
        max : 5,
        default : 1,
        required : true,
     },
     createdAt : {
        type : Date,
        default : Date.now(),
     },
     author : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "user"
     }
});

const review = mongoose.model("review" , rewiewSchema);




module.exports = {
   review,
};
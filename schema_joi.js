const joi = require('joi');

const listingSchema = joi.object({
  listing : joi.object({
       title : joi.string().required(),
       description : joi.string().required(),
       image : joi.string().allow("" , null),
       price : joi.number().required().min(0),
       location : joi.string().required(),
       country : joi.string().required(),
       categories : joi.string().required()
  }).required(),
});


const reviewSchema = joi.object({
   review : joi.object({
       comment : joi.string().required(),
       rating : joi.number().min(1).max(5).required()
   }).required()
});

const userSchema = joi.object({
       username : joi.string().required(),
       password : joi.string().required(),
       profilepic : joi.string(),
       email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()

}).required()

module.exports = {
  listingSchema,
  reviewSchema,
  userSchema
};
const listing = require("./models/listing.js");
const { review } = require("./models/review.js");
const {listingSchema} = require("./schema_joi.js");
const expressError = require("./utils/expessError.js");


module.exports.isloginIn = (req , res , next) => {
    if(!req.isAuthenticated()){
      req.session.originalUrl = req.originalUrl;
        req.flash("error" , "you must login or signup to unlock all options");
        res.redirect("/login");
      }
      else{
        next();
      }
}

module.exports.saveredirectedUrl = (req , res , next) => {
if(req.session.originalUrl){
  res.locals.redirectedUrl = req.session.originalUrl;
}

// this is used to hnadle like url presnt in user.js and index.ejs
if(req.session.originalUrl && req.session.originalUrl.includes('like')){
    res.locals.redirectedUrl = "/listings";
}
  next();
};


module.exports.isOwner = async (req , res , next) => {
   
 let  listingdetails = await listing.findById(req.params.id);
    if(!listingdetails.owner._id.equals(res.locals.user._id)){
    req.flash("error", "You are not authorized to delete this listing.");
     res.redirect(`/listings/${req.params.id}`);
 }
 else{
  next();
 }
};


module.exports.isreviewOwner = async (req , res , next) => {
   
  let  reviewdetails = await review.findById(req.params.reviewId);
     if(!reviewdetails.author._id.equals(res.locals.user._id)){
     req.flash("error", "You are not authorized to delete this review.");
      res.redirect(`/listings/${req.params.id}`);
  }
  else{
   next();
  }
 };



// middleware validate listing
module.exports.validatelisting = (req , res , next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
       throw new expressError(400 , error.message);
    }
    else{
      next();
    }
  }


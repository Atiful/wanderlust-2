const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require('../utils/wrapAsync.js');
const expressError = require("../utils/expessError.js");
const {reviewSchema} = require("../schema_joi.js");
const {isloginIn , isreviewOwner} = require("../middleware.js");
const reviewController = require("../controller/reviewController.js");

// review middleware
const validatereview = (req , res , next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
     throw new expressError(400 , error.message);
    }
    else{
     next();
    }
   
   };


// review section where review will get post
router.post("/", isloginIn , validatereview , wrapAsync (reviewController.postReview));
  
  
  // delete review
  router.delete("/:reviewId" , isloginIn , isreviewOwner ,   wrapAsync(reviewController.deleteReview));
  module.exports = router;
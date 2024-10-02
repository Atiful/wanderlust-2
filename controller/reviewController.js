const listing = require("../models/listing.js");
const {review} = require("../models/review.js");

module.exports.postReview =  async (req , res) => {
    let list = await listing.findById(req.params.id);
     let review1 = new review(req.body.review);
     review1.author = req.user._id;
     list.reviews.push(review1);
  
     await review1.save();
     await list.save();
     req.flash("sucess" , "new review created!!");
     res.redirect(`/listings/${req.params.id}`);
  };


  module.exports.deleteReview = async(req , res) => {
    let {id , reviewId} = req.params;
     await listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
     await review.findByIdAndDelete(reviewId);
     req.flash("sucess" , "review is sucessfully deleted!!");
    res.redirect(`/listings/${id}`);
  };
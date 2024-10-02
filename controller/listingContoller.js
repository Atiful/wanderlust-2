const listing = require("../models/listing.js");
const expressError = require("../utils/expessError.js");

module.exports.indexGetListing = (async (req , res) => {
    let AllListings = await listing.find();
    res.render("listings/index.ejs" , {listings : AllListings});
});

module.exports.handleFormData = async(req , res) => {

     if(req.file.size >= 1.3 * 1024 * 1024){
      req.flash("error" , "file size if must be lass that 1.3MB");
      res.status(400);
      return res.redirect("/listings/new");
     }
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename};
     await newListing.save();
     req.flash("sucess" , "new listing is sucessfully added!!");
    res.redirect("/listings");
    };


module.exports.renderNewform = (req , res) => {
    res.render("listings/form.ejs");
};

module.exports.showListing = async (req , res) => {
    let {id} = req.params;
    let listing_details = await listing.findById(id)
    .populate({
      path: 'reviews',        // Populate reviews
      populate: {
        path: 'author',       // Then populate the author inside each review
      }
    })
    .populate('owner');  
    if(!listing_details){
      req.flash("error", "The listing you are look for is not found");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing : listing_details});
  }

  module.exports.editListing = async (req , res) => {
    let {id} = req.params;
    let single_listing = await listing.findById(id);
  res.render("listings/edit.ejs" , {listing : single_listing});
  };

  module.exports.updateListing = async (req , res) => {
    let new_details = await   listing.findByIdAndUpdate(req.params.id , req.body.listing , { new : true , runValidators: true});

    if(typeof req.file !== "undefined"){
      if(req.file.size >= 1.3 * 1024 * 1024){
        res.status(404);
        req.flash("error" , "file size  must be lass that 1.3MB");
        return res.redirect("/listings/new");
       }
      let url = req.file.path;
      let filename = req.file.filename;
      new_details.image = {url , filename};
      await new_details.save();
    }
   
    req.flash("sucess" , "listing is updated sucessfully!!");
    res.redirect(`/listings/${req.params.id}`);
  };

  module.exports.deleteListing = async (req , res) => {
    // authorization part
        await listing.findByIdAndDelete(req.params.id);
        req.flash("sucess" , "listing is sucessfully deleted!!");
        res.redirect("/listings");
   };
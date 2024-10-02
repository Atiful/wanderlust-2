const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require('../utils/wrapAsync.js');
const listing = require("../models/listing.js");


// for price low to high
router.get("/lowToHigh" , wrapAsync(async(req , res) => {
    const data = await listing.find({}).sort({ price : 1 }); // Sort by price ascending
    res.render("listings/index.ejs" , {listings : data});
}));

// for high to low
router.get("/highToLow" , wrapAsync(async(req , res) => {
    const data = await listing.find({}).sort({ price : -1 }); // Sort by price ascending
    res.render("listings/index.ejs" , {listings : data});
}));


// for filters
router.get("/:filter" , wrapAsync(async(req , res) => {
    const data = await listing.find({categories : `${req.params.filter}`});
    if(!data){
        req.flash("error" , "There is no listing present present");
        res.redirect("/listings");
    }
    res.render("listings/index.ejs" , {listings : data});
}));





module.exports = router;
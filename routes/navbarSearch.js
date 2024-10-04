const express = require("express");
const router = express.Router({mergeParams : true});
const listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");


router.get("/" , wrapAsync(async (req , res) => {
    let {search} = req.query;
    const allListings = await listing.find({});
    let ByTitle = allListings.filter((listing) => {
       return listing.title.toLowerCase().includes(search.toLowerCase());
    });

    let ByDes = allListings.filter((listing) => {
        return listing.description.toLowerCase().includes(search.toLowerCase());
     });

     let ByLocation = allListings.filter((listing) => {
        return listing.location.toLowerCase().includes(search.toLowerCase());
     });

     let Bycountry = allListings.filter((listing) => {
        return listing.country.toLowerCase().includes(search.toLowerCase());
     });


     let finalListings  = [...new Set([...ByDes, ...ByLocation, ...Bycountry, ...ByTitle])];
     if(finalListings.length == 0){
        res.redirect("/listings");
     }
    res.render("listings/index.ejs" , {listings : finalListings});
   
}));

module.exports = router;
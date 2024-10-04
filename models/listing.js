const mongoose = require('mongoose');
const { review } = require('./review.js');
const { required, boolean } = require('joi');
const listingSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
         url  : {
          type : String,
          required : true
         },
        filename : String,
    },
    price : {
        type : Number,
        required : true,
    },
    location : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "review"
        }
    ],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    categories : {
        type : [String],
        enum : ["Trending" , "Castles" , "Treehouse" , "TopCities" , "Mountains" , "Camping" , "Artic" , "Lake" ,"Beaches" , "Luxury" , "Cottages" , "Eco-Friendly" , "Historic" ,"Nature" , "Modern"],  
    }
});

// post middleware to handle delete 
listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing){
       await review.deleteMany({_id : {$in : listing.reviews}});
    }
  });

const listing = mongoose.model("listing" , listingSchema);


module.exports = listing;
const user = require("../models/user.js");
const expressError = require("../utils/expessError.js");

module.exports.renderSignupForm = (req , res) => {
    res.render("users/signup.ejs");
 };

 module.exports.postSignup = async (req , res , error) => {
    try{
       let {username , password , email , profilepic} = req.body;
    const newuser = new user({username , email});
     const registerUser = await user.register(newuser , password);
     req.login(registerUser , async (error) => {
         if(error){
          return next(error);
         }
         else{
            newuser.profilepic = profilepic;
            await newuser.save();
    
          req.flash("sucess" , "welcome to wanderLust");
          let redirect = res.locals.redirectedUrl || "/listings";
             res.redirect(redirect);
            
         }
     });
    }
    catch(error){
       req.flash("error" , error.message);
       res.redirect("/signup");
    }
 }

 module.exports.renderLoginForm = (req , res) => {
    res.render("users/login.ejs");
  }

  module.exports.postLogin = (req , res) => {
    req.flash("sucess" , "welcome to wanderlust");
    let redirect = res.locals.redirectedUrl || "/listings";
    res.redirect(redirect);
}


  module.exports.logout = (req , res , next) => {
    req.logOut((error) => {
      if(error){
        return  next(error);
      }
      else{
       req.flash("sucess" , "you have been sucessfully logout");
       res.redirect("/listings");
      }
    });
 };

 module.exports.handleLikedListing = async (req , res) => {
   let {liked} = req.body;
   let {id} = req.params;
   if(liked){
      let user_details = await user.findById(req.user.id);
      if(!user_details.likedListing.includes(id)){
         user_details.likedListing.push(id);
         let updated_value = await user.findByIdAndUpdate(req.user.id , {...user_details} , {new : true});
      }
   }
   else{
         let new_details = await user.findByIdAndUpdate(req.user.id , {$pull : {likedListing : id}} , {new : true});
   }
   res.json({ message: 'Data received successfully!'});
  };



  module.exports.seeAllLikesListing = async(req , res) => {
   let users = await user.findById(req.user._id).populate("likedListing");
   res.render("listings/index.ejs" , {listings : users.likedListing});
};

module.exports.deleteAllLikedlisting = async(req , res) => {
   let updated_user = await user.findByIdAndUpdate(req.user._id , {likedListing : []} , {new : true});
   req.flash("sucess" , "All saved Listings is removed");
   res.redirect("/listings");
};




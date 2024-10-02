const user = require("../models/user.js");

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




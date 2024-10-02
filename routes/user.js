const express = require("express");
const router = express.Router({mergeParams : true});
const {userSchema} = require("../schema_joi.js");
const expressError = require("../utils/expessError.js");

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveredirectedUrl} = require("../middleware.js");
const userController = require("../controller/userController.js");

const validateuser = (req , res , next) => {
      let {error} = userSchema.validate(req.body);
      if(error){
         throw new expressError(400 , error.message);
      }
      else{
         next();
      }
};


router.route("/signUp")
.get(userController.renderSignupForm)
.post(saveredirectedUrl ,  validateuser , wrapAsync(userController.postSignup));

//login form
router.route("/login")
.get(userController.renderLoginForm)
.post(saveredirectedUrl ,
   passport.authenticate("local" ,  { failureRedirect: '/login' , failureFlash : true}) , userController.postLogin);


router.get("/logout" , userController.logout);



module.exports = router;
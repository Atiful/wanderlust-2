const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const path = require("path");
const  methodOverride = require('method-override');
const engine = require('ejs-mate');
const expressError = require("./utils/expessError.js");
const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const  LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const user = require("./models/user.js");
const listing = require("./models/listing.js");
if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}


// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' });

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const usersRouter = require("./routes/user.js");
const OuthRouter = require("./routes/OuthRouter.js");
const filterRouter = require("./routes/filter.js");
const searchRouter = require("./routes/navbarSearch.js");
const wrapAsync = require("./utils/wrapAsync.js");


app.use(express.urlencoded({extended : true}));
app.use(express.json()); 
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname, 'public')));

const store = MongoStore.create({
  mongoUrl : process.env.mongo_atlas,
  crypto: {
    secret: process.env.secret
  },
  touchAfter : 24 * 3600
});

app.use(session({
  store,
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 60 * 1000,
    httpOnly : true,
    secure : false
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


// middlewaere for falsh
app.use((req , res , next) => {
res.locals.sucess = req.flash("sucess");
res.locals.error = req.flash("error");
res.locals.user = req.user;
next();
});




app.use("/listings" , listingsRouter);
app.use("/listings/:id/reviews" , reviewsRouter);
app.use("/filter", filterRouter);
app.use("/search" , searchRouter)
app.use("/" , usersRouter);
app.use("/auth/google" , OuthRouter);





main()
.then((res) => {
    console.log("connection of mongoDb is build sucessfully");
})
.catch((error) => {
    console.log(error);
});

async function main() {
  // process.env.mongo_atlas
  // mongodb://127.0.0.1:27017/wanderlust-2
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust-2");
}



// this is error handling
app.all("*" , (req , res , next) => {
  throw new expressError(500 , "page not found! please visit the explore section");
});


app.use((err , req , res , next) => {
  let {status = 300 , message} = err;
  res.status(status);
  res.render("error.ejs" , {status , message});
});



app.listen(port , () => {
    console.log(`server is started at port : ${port}`);
});













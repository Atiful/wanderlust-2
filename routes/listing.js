const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require('../utils/wrapAsync.js');
const {isloginIn , isOwner , validatelisting} = require("../middleware.js");
const listingController = require("../controller/listingContoller.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });


router.route("/")
// all listing route
.get(wrapAsync(listingController.indexGetListing))
// form is recieved submit
.post(isloginIn, upload.single('listing[image]'), validatelisting ,  wrapAsync(listingController.handleFormData));




// create new listing
router.get("/new" , isloginIn , listingController.renderNewform);

// show route
router.get("/:id" , wrapAsync(listingController.showListing));

// edit route
router.get("/:id/edit" , isloginIn , isOwner ,  wrapAsync(listingController.editListing));

router.route("/:id")
// update route
.put(isloginIn , isOwner , upload.single('listing[image]'), wrapAsync(listingController.updateListing))
// delete route
.delete(isloginIn , isOwner ,  wrapAsync(listingController.deleteListing));

module.exports = router;
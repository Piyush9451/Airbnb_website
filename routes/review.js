const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const reviewController=require("../controllers/reviews.js")
 //reviews route
 //post route
 router.post("/",wrapAsync(reviewController.createReview));

 //dlete review route
router.delete(
    "/:reviewId",
    wrapAsync(reviewController.destroyReview)
 );

 module.exports=router;
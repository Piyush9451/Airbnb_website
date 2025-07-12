const Listing=require("../models/listing");
//index route
module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index",{allListings});
}

//new route
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
}
//show
module.exports.showListing=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
      req.flash("error","Listing you requested for does not exist");
      res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing}); 
  }

//post
module.exports.createListing=async(req,res,next)=>{
    if(!req.body.listing){
       throw(new ExpressError(404,"page not found"));
    }
    let url=req.file.path;
    let filename=req.file.filename;
     const newListing=new Listing(req.body.listing);
      newListing.owner=req.user._id;
     newListing.image={url,filename};
    await newListing.save();
     req.flash("success","new listing created successfully");
     res.redirect("/listings");
  }
  //edit
  module.exports.renderEditForm=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
   }
   //update route
   module.exports.updateListing=async(req,res)=>{
    if(!req.body.listing){
       throw(new ExpressError(404,"page not found"));
    }
       let{id}=req.params;
       let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
       if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
       }
       req.flash("success"," listing updated!");
       res.redirect("/listings");
  }
  //delete
  module.exports.destroyListing=async(req,res)=>{
    let{id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","listing deleted successfully");
    res.redirect("/listings");
   }
const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    //    res.send(allListing);
    res.render("listing/index.ejs", { allListing });
  }




  module.exports.newRoute  = async (req, res) => {
    res.render("listing/new.ejs");
  }


  module.exports.showRoute  = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({path:"reviews" ,populate: {
        path:"author",
      }}).populate("owner");
    if (!listing) {
      req.flash("error", " Listing does not Exist !");
      res.redirect("/listings");
    }
    console.log(listing);
    res.render("listing/show.ejs", { listing });
  };

  


  module.exports.createRoute = async (req, res) => {
   let url = req.file.path;
   let filename = req.file.filename;
   console.log(filename,"..",url);

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
  };



  module.exports.editRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", " Listing does not Exist !");
      res.redirect("/listings");
    }

    let orignalImageUrl = listing.image.url;
    orignalImageUrl.replace("/upload", "/upload/w_250")

    res.render("listing/edit.ejs", { listing ,orignalImageUrl });
  };



  module.exports.updateRoute = async (req, res) => {

    let { id } = req.params;
   let listing =  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   if(typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
   }

 
    
    req.flash("success", "Listing Edited Succesfully !");
    res.redirect(`/listings/${id}`);
  };



  module.exports.deleteRoute = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted Succesfully !");
    res.redirect("/listings");
  };
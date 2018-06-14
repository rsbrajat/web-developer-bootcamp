var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp");    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String 
});

//model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
//         description: "This is Granite Hill Campground, with limitless beauty!!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }    else{
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });  //this may be needed to add data by ourself

app.get("/", function(req, res){
    res.render("landing");    
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    //get all campgrounds from the database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }   else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    //get data from form and add to campground array or now DB
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};  //we made this js object because our array is having js objects...
    //create a new campground and save it to the database
    Campground.create(newCampground, function(err, newlyCreatedCampground){
        if(err){
            console.log(err);
        }   else{
               //redirect back to campgrounds page
               res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");    
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    // Campground.findById(id, callback)
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       }  else{
            // render show template with that campground
            res.render("show", {campground: foundCampground});
       }
    });
    
    
    // console.log("This will be the show page");    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has Started!");
});
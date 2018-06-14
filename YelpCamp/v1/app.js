var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
        {name: "Granite Hill", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"}
    ];

app.get("/", function(req, res){
    res.render("landing");    
});

app.get("/campgrounds", function(req, res){
    
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campground array
    
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image: image};  //we made this js object because our array is having js objects...
    campgrounds.push(newCampground);
    
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs")    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has Started!");
});
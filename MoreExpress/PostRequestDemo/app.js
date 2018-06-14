var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); //one of that copy and paste things most of the times, mainly it parses only UTF coding of encoded URl: lol haha

app.set("view engine", "ejs");

var friends = ["Rahul", "Dhoni", "Rohit", "Suresh", "Sachin"];

app.get("/", function(req, res){
    res.render("home");    
});

app.post("/addfriend", function(req, res){
    var newfriend = req.body.newfriend;     //this is possible, just because of body-parser, and next we tell our app to use it.(no wonder how?);lol
    friends.push(newfriend);
    // res.send("post request here!!"); 
    res.redirect("/friends");   //to redirect to the reqiured page
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");    
});
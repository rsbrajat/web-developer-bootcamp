var express = require("express");
var app = express();

app.use(express.static("public")); //tells express to serve the contents of publice directory
app.set("view engine", "ejs");  //tells express to render files in ejs format
// #saves time #saves more code #savewritting same things multiple times

app.get("/", function(req, res){
    res.render("home")  //see line 5, for explaination, we can use home.ejs as well
});

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});      //this javaScript Object is send to love.ejs file
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "author 1"},
        {title: "Post 2", author: "author 2"},
        {title: "Post 3", author: "author 3"}
    ];    
    
    res.render("posts.ejs", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Sever has started");    
});
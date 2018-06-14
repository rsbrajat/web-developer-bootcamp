var express = require("express");
var app = express();

// '/' => "Hi There!"
app.get("/", function(req, res){
    res.send("Hi There!");
});

// '/bye' => "GoodBye"
app.get("/bye", function(req, res){
    res.send("GoodBye"); 
});

// '/dog' => "Meow"
app.get("/dog", function(req, res){
    console.log("Someone has made a req");   
    res.send("Meow!!"); 
});

//important to know, notes!!
//route with a single param.
app.get("/r/:sub_routeName", function(req, res) {
    var subroute = req.params.sub_routeName;
    // console.log(req.params);
    res.send("Welcome to the " + subroute.toUpperCase() + " subroute");
});

//route with multiple params.
app.get("/r/:sub_routName/comments/:id/:title", function(req, res) {
    console.log(req.params);
    res.send("This is comment section");
});

// '*' => "To respond to any other request, that we have not designed"
app.get("*", function(req, res) {
    res.send("404 Page Not Found");
});


//tell express to listen for the request, <start server>
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
var express = require("express");
var app = express();
var request = require("request");

app.set("view engine","ejs");

app.get("/", function(req, res) {
    res.render("search");    
});

app.get("/results",function(req, res){
    // console.log(req.query.search);  //important to note
    var query = req.query.search;   //notes, to recieve, what is in the name=search, as a query!!valid because this page is rendered from ""
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;   //we are creating a dynamic URL
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
            // res.send(results["Search"][0]["Title"]);
        }        
    });   
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie app has started");    
});
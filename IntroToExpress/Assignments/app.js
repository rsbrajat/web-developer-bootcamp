var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi There, Welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    var sounds = {
        pig: "Oink",
        dog: "Woof Woof",
        cow: "Moo",
        fish: "..."
    }
    var animal = req.params.animal.toLowerCase();   //to get rid of trouble of uppercase and lowercase requests
    var sound = sounds[animal];
    /* This is tiresome, we can define a dicitionary, as in the form of class and objects
     * if (animal === "dog") {
        sound = "woof woof!";
    } else if(animal === "pig"){
        sound = "oink";
    } **/
    res.send("The " + animal + " says \'" + sound + "\'");
});

app.get("/repeat/:word/:index", function(req, res) {
    var message = req.params.word;
    var times = Number(req.params.index);   //as request comes in the form of a string
    var result = "";
    for(var i = 0; i < times; i++){
        result += message + " ";
    }
    res.send(result);
});

app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?"); 
});

//starting a server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started"); 
});
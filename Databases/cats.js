var mongoose = require("mongoose"); //mongoose is an object data mapper

mongoose.connect("mongodb://localhost/cat_app");    //will connect to db named, cat_app, and if it don't exists, it willmake it for me

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
}); //defining pattern for the data, it is just a blue print

var Cat = mongoose.model("Cat", catSchema);     //saving to a varibale, after compiling it to a model, we can perform our CRUD operations using this variable Cat
//"Cat", makes the collection name as Cats inside our db named as cat_app
//"Cat", single item lekr, uska collection bnna deta hai ye model, eg person ko people collection bnna dega


// adding a new cat to db
// var george = new Cat({
//     name: "George",
//     age: 11,
//     temperament: "Grouchy"
// });//collected information about the Cat

// var george = new Cat({
//     name: "Mrs. Mossie",
//     age: 7,
//     temperament: "Evil"
// });
// //george is what, how we refer things, inside our js code

// george.save(function(err, cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG!!");
//     }    else{
//         console.log("WE JUST SAVED A CAT TO THE DB:");
//         console.log(cat);   //cat, it is what cameback from the database, while george is what, we have in javaScript,
//         //but cat is coming from db, after saving
//     }
// });  //saves our cat to database, but this operation may get fail, so we use use a callback funciton

//above process of creating a cat, SUCKS!!, new method will be new and save all at once

Cat.create({
    name: "Woffy",
    age: 10,
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    }   else{
        // console.log("Cat has beeen saved in the DB:");
        console.log(cat);
    }
});

// retrive cats from db and console.log each one
Cat.find({}, function(err, cats){   //{}because we are not loooking for any particular cat, we are looking for all
    if(err){
        console.log("OH NO!! ERROR");
        console.log(err);
    }   else{
        console.log("All the cats are:")
        console.log(cats);
    }
});
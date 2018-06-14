// data association using refrencing data,
//in here we assign IDs to each post, and use that particular ID to save or retrieve data

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");
//to refernece a current directory, we need a ./ path in beginning
var Post = require("./models/post");
var User = require("./models/user")

//now we to design two models, user and posts

// User.create({
//     email: "goelaakash79@gmail.com",
//     name: "Aakash Goel"
// }, function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });

// A LOT OF CODE, COLT, Let us have some break;

Post.create({       // post creation
    title: "Codewars",
    content: "A great to source to fine hands on your coding!"
}, function(err, post){
    if(err){
        console.log(err);
    } else{
        // console.log(post);
        User.findOne({name: "Aakash Goel"}, function(err, foundUser){   // finding a user
            if(err){
                console.log(err);
            } else{
                foundUser.posts.push(post._id);     // colt told, but this has been changed in this version that im using  // associationg post to the found user 
                foundUser.save(function(err, data){
                    if(err){
                        console.log(err);
                    } else{
                        console.log(data);      // taking look what we had done
                    }    
                });
            }    
        });
    }
});

//  find USER
//  find all posts for that user

// User.findOne({name: "Aakash Goel"}).populate("posts").exec(function(err, foundUser){    //populate data about the posts  //linking our posts in scema to here...its type and all....
//     if(err){
//         console.log(err);
//     } else{
//         console.log(foundUser);
//     }
// });
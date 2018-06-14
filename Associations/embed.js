// data association using embedding data

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//now we to design two models, user and posts


// POSTS: title, content 
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// USER: email, name
var userSChema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSChema);

// var newUser = new  User({
//     email: "shruti@kiet.edu",
//     name: "Shruti Mishra"
// });
// newUser.posts.push({
//     title: "Fashion Designing",
//     content: "I love fashion designing as a hobby"
// })

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }    
// });

// var newPost = new Post({
//     title: "Life at College",
//     content: "Don't ask, that really sucks!!"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(post);
//     }    
// });

User.findOne({name: "Shruti Mishra"}, function(err, foundUser){     // findone : to find one item from the db
    if(err){
        console.log(err);
    } else{
        // console.log(foundUser);
        foundUser.posts.push({
            title: "Guggu is a bad guy!!",
            content: "Guggu calls me motu, he is very irritating!!"
        });
        foundUser.save(function(err, user){
            if(err){
                console.log(err);
            } else{
                console.log(user);
            }    
        });
    }    
});

// now we a user and a post, now we need to link them up
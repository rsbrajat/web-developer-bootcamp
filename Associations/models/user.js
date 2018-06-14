var mongoose = require("mongoose");

// USER: email, name
var userSChema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [        // array of mongoose Ids refrencing towards the post
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});
module.exports = mongoose.model("User", userSChema);    // we  are exporting out this one thing out 
                                                        //of our whole code in this file,
                                                        //to the place where it is called using reuire
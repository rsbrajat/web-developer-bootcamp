var express = require("express"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    app = express();
    
// APP CONFIG    
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); //this goes after bodyParser..basically it deletes all the script that user enters through a form, and leaves us with pure html
app.use(methodOverride("_method")); //this will look for _method in the query string

// MONGOOSE/ MODEL CONFIG
var blogSchema = new mongoose.Schema({
    heading: String,
    url: String,
    body: String,
    category: String,
    slug: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);  //model

//  TEST ENTRY
// Blog.create({
//     heading: "How to Give a Society Better Health? Give the Women Contraception First",
//     url: "https://www.thebetterindia.com/wp-content/uploads/2018/04/DSC00529-1.jpg",
//     body: "Among the slums of M/East Ward in Mumbai, Salma, a field worker of the Society for Nutrition, Education and Health Action (SNEHA) came across a woman named Kusum, who was reluctant to use any contraception.\n“I don’t want any more children. But I will not use Copper T or condoms as the Copper T will rise up into my body and using a condom will make my man infertile. I will use the traditional methods that everyone in my family uses.” an adamant Kusum expressed.",
//     category: "motivation",
//     slug: "slug_one"
// });

// RESTFUL ROUTES
app.get("/", function(req, res) {
    res.redirect("/blogs");    
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");    
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    //create blog
    console.log(req.body);  //contains script tags by the user
    req.body.blog.body = req.sanitize(req.body.blog.body);  //sanitizes our input content::that blog post part
    console.log(req.body);  //pure html, or simple text, no script tags
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new"); 
        }  else{
            //redirect to index
            res.redirect("/blogs");
        }    
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id,  function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else{
           res.render("show", {blog: foundBlog});
       }
    });        
});

// EDIT ROUTE : somewhat like combination of new and show
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit", {blog: foundBlog});     
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    // Blog.findByIdAndUpdate(id, newData, callback);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");    
        } else{
            res.redirect("/blogs/" + req.params.id);
        }    
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    //destory blog
    Blog.findByIdAndRemove(req.params.id, function(err, deletedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            //redirect somewhere
            res.redirect("/blogs");
        }
    });
});

// APIs

app.get("/api/blogs", function(req, res) {
    Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else{
           res.send({"blogs":blogs});
       } 
    });    
});

app.get("/api/blogs/slug/:slug", function(req, res) {
    var slug = req.params.slug;
    Blog.find({slug:slug}, function(err, blog) {
        if(err)
            console.log(err);
        else
            res.send({"blogs":blog});
    });
});

app.get("/api/blogs/category/:category", function(req, res) {
    var category = req.params.category;
    Blog.find({category:category}, function(err, blog) {
        if(err)
            console.log(err);
        else
            res.send({"blogs":blog});
    });
});

// APIs

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");    
});
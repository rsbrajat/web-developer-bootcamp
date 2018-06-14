const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost/nodekb');

let db = mongoose.connection;

//check connection
db.once('open', function(){
   console.log("Connected to mongoDB"); 
});

//check for db errors
db.on('error', function(err){
    console.log(err);    
});

//app init
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//bring in models
let Article = require("./models/article");

//set view engine
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
//   cookie: { secure: true }
}));    

// express messages middleware
app.use(require("connect-flash")());
app.use(function(req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//express validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
        
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg : msg,
            value: value
        };
    }
}));


//home route
app.get("/", function(req, res){
    // let articles = [
    //     {
    //         id: 1,
    //         title: 'Article 1',
    //         author: 'Aakash',
    //         body: 'this is article one'
    //     },
    //     {
    //         id: 3,
    //         title: 'Article 3',
    //         author: 'Goel',
    //         body: 'this is article three'
    //     }
    // ];
    
    Article.find({}, function(err, articles){
        if(err){
            console.log(err);
        } else{
            res.render('index', {
                title: 'Articles',
                articles: articles
            }); 
        }
    });
});

// get single article
app.get("/article/:id", function(req, res) {
    Article.findById(req.params.id, function(err, singleArticle){
        if(err){
            console.log(err);
        } else{
            res.render('article', {
                article: singleArticle
            });
        }
    });
});

//add article route
app.get("/articles/add", function(req, res){
    res.render('add_article', {
        title : "Add Article"
    });
});

//add submit POST route
app.post('/articles/add', function(req, res){
    req.checkBody('title', 'Title is required').notEmpty;
    req.checkBody('author', 'Author is required').notEmpty;
    req.checkBody('body', 'Body is required').notEmpty;
    
    
    //get errors
    let errors = req.validationErrors();
    
    if(errors){
        res.render('add_article', {
            title: 'Add Article',
            errors: errors
        });
    } else{
        let article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;
        article.save(function(err){
            if(err){
                console.log(err);
                return;
            } else{
                req.flash('success', 'Article Added');
                res.redirect("/");
            }
        });    
    }
});

// load edit form
app.get("/article/edit/:id", function(req, res) {
    Article.findById(req.params.id, function(err, editArticle){
        if(err){
            console.log(err);
        } else{
            res.render('edit_article', {
                title:'Edit Article',
                article: editArticle
            });
        }
    });
});

// update article POST route
app.post('/articles/edit/:id', function(req, res){
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    
    let query = {_id:req.params.id};
    
    Article.update(query, article, function(err){
        if(err){
            console.log(err);
            return;
        } else{
            req.flash('success', "Article Updated");
            res.redirect("/");
        }
    });
});

app.delete('/article/:id', function(req, res){
    let query = {_id: req.params.id}; 
    Article.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});

//starting server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Server has started");    
});
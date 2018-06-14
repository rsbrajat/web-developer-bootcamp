var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var assert = require('assert');


var upload = multer();
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var url = 'mongodb://127.0.0.1:27017/quicknotes';

if(process.env.OPENSHIFT_MONGODB_DB_URL){
  url = process.env.OPENSHIFT_MONGODB_DB_URL + "quicknotes";
}
mongoose.connect(url);
var db = mongoose.connection;
db.on('error',function () {
    console.log(console,'connection error');
});
db.once('open',function () {
    console.log('connected');
});
var ObjectID = require('mongodb').ObjectID;
var users = require('./user_schema.js');
var notes = require('./note_schema.js');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret:'secretkey',saveUninitialized:true,resave:true,cookie:{maxAge:24*60*60*1000}}));
app.set('view engine','pug');
app.set('views','./views');



app.get('/',function(req,res){
    res.redirect('/login');
});
app.get('/notes',function(req,res){
    if(!req.session.username) {
        if(req.query.isAppClient)
            return res.send(JSON.stringify({error:true,code:400,msg:'Invalid Session'}));
        else
            return res.redirect('/login');
    }
    notes.find({username:req.session.username},function(err,data){
        if(!err) {
            if(req.query.isAppClient)
                return res.send(JSON.stringify({error:false,list:data.reverse()}));
            else
                return res.render('notes',{list:data,name:req.session.name});
        }

    });
});
app.get('/logout',function(req,res){
    if(req.session.username) {
        req.session.destroy();
    }
    res.redirect('/login');
});
app.get('/login',function(req,res){
    var ua = req.headers['user-agent'];
    if(req.session.username) {
        return res.redirect('/notes');
    }
    if (/Android/.test(ua))
        res.render('login',{mobile:true});
    else
        res.render('login',{mobile:false});
});
app.post('/register',function(req,res){
    if(req.session.username) {
        return res.redirect('/notes');
    }
    var newuser = new users(req.body);
    newuser.save(function (err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                var ua = req.headers['user-agent'];
                var mobile=false;
                if (/Android/.test(ua))
                    mobile=true;
                if  (req.body.isAppClient)
                    var response=res.send(JSON.stringify({error:true,msg:'User already exists! Try a different username'}));
                else
                    var response=res.render('signup',{error:true,mobile:mobile,msg:'User already exists! Try a different username'});
                return response;
            }
            if  (req.body.isAppClient)
                var response=res.send(JSON.stringify({error:true,msg:'An error occured please try again later'}));
            else
                var response=res.render('signup',{error:true,msg:'An error occured please try again later'});
            return response;
        }
        users.find({},function(err,data){
                if(err) throw err;
                var mobile=false;
                var ua = req.headers['user-agent'];
                if (/Android/.test(ua))
                    mobile=true;
                if  (req.body.isAppClient)
                    var response=res.send(JSON.stringify({error:false,msg:'You are registered! Please login to continue'}));
                else
                    var response=res.render('login',{error:false,mobile:mobile,msg:'You are registered! Please login to continue'});
                return response;
            }
        );
    });
});
app.post('/validate',function(req,res){
    if(req.session.username) {
        return res.redirect('/notes');
    }
    console.log(req.body);
    console.log(req.body.username);
    users.findOne({username: req.body.username},function (err,user) {
        if (!user) {
            if  (req.body.isAppClient)
                var response=res.send(JSON.stringify({error:true,msg:'Invalid username or password'}));
            else
                var response=res.render('login',{error:true,msg:'Invalid username or password'});
            return response;
        }
        if (req.body.password!=user.password) {
            if  (req.body.isAppClient)
                var response=res.send(JSON.stringify({error:true,msg:'Invalid username or password'}));
            else
                var response=res.render('login',{error:true,msg:'Invalid username or password'});
            return response;
        }
        req.session.username = user.username;
        req.session.name = user.name;
        if  (req.body.isAppClient)
            return res.send(JSON.stringify({error:false,msg:"success",name:user.name}));
        else {
            res.redirect('/notes');
        }
    });
});
app.post('/deletenote',function(req,res){
    if(!req.session.username) {
        return res.send(JSON.stringify({error:true,code:400,msg:'Invalid Session'}));
    }
    id=new ObjectID(req.body.id);
    notes.remove({username:req.session.username,_id: id},function(err,result) {
        if (!err) {
            return res.send(JSON.stringify({error:false}));
        }
        else {
            return res.send(JSON.stringify({error: true, code: 500, msg: 'An error occured'}));
        }
    });
});
app.post('/addnote',function(req,res){
    if(!req.session.username) {
        return res.send(JSON.stringify({error:true,code:400,msg:'Invalid Session'}));
    }
    var newnote = new notes({username:req.session.username,title:req.body.title,text:req.body.text});
    newnote.save(function(err,data){
        if(!err) {
            return res.send(JSON.stringify({id:data._id,title:req.body.title,text:req.body.text,error:false}));
        }
        else {
            return res.send(JSON.stringify({error: true, code: 500, msg: 'An error occured'}));
        }

    });
});
app.get('/signup',function(req,res){
    var ua = req.headers['user-agent'];
    if(req.session.username) {
        return res.redirect('/notes');
    }
    if (/Android/.test(ua))
        res.render('signup',{mobile:true});
    else
        res.render('signup',{mobile:false});
});
app.get('/*',function(req,res){
    res.render('404',{});
});
app.listen(server_port, server_ip_address,function(){
	console.log("Server Started");
});
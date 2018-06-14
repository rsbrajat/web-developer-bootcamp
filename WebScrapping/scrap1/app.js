var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var url = 'https://www.reddit.com/top/';

request(url, function(err, res, html){
   if(!err){
       var $ = cheerio.load(html);
       
   } 
});
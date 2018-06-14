const   express = require("express"),
        bodyParser = require("body-parser"),
        app = express(),
        request = require("request"),
        apikey = 'd77ebdac5b381493e82a368610e969a1';
        
app.set('view engine', 'ejs');    
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
        
app.get("/", function(req, res){
    res.render("index");
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;
    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weather = JSON.parse(body);
          res.render("index", weather);
        //   if(weather.main == undefined){
        //     res.render('index', {weather: null, error: 'Error, please try again'});
        //   } else {
        //     let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        //     res.render('index', {weather: weatherText, error: null});
        //   }
        }
  });
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Server Running");
});        
        
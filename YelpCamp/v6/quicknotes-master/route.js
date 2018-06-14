var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.send('GET route on page.');
	next();
}
);
module.exports = router;
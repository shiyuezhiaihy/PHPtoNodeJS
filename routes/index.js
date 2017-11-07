var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res){
    //res.writeHead(200, {'Content-Type': 'text/html'});
    res.send("Hey! " + req.param('username'));
});

module.exports = router;

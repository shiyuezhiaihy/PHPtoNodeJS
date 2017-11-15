var express = require('express');
var router = express.Router();

var controllerMain = require('../controllers/database');   //this will load the main controller file
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Routes collection
/* GET home page. */
router.get('/getAllOrders', controllerMongoCollection.getAllOrders);
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;

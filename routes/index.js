var express = require('express');
var router = express.Router();
var ControllerDatabase = require('../controllers/database');
/* GET home page. */
router.post('/herokuConnect', function(req, res, next) {
    res.render('index', { title: 'Express'});
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express'});
});

router.get('/mLabConnect', function(req, res, next) {

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://Yue1:Love123456@ds153015.mlab.com:53015/heroku_6wmwvjg8";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("ORDERS").find({name: "Yue"}).toArray(function (err, docs) {
            if (err) throw err;
            docs.forEach(function (doc) {
                res.send(doc['name'] + " " + doc['order']);
            });
        });
    });
});

router.post('/storeData', ControllerDatabase.storeData);

module.exports = router;
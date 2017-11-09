var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://Yue1:Love123456@ds153015.mlab.com:53015/heroku_6wmwvjg8";


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

    });
});
router.post('/', function(req, res){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://Yue1:Love123456@ds153015.mlab.com:53015/heroku_6wmwvjg8";


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("ORDERS").find({name: req.param('username')}).toArray(function (err, docs) {
            if (err) throw err;
            docs.forEach(function (doc) {
                res.send(doc['name'] + " " + doc['order']);
            });
        });
    });
});

module.exports = router;
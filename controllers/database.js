
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://Yue1:Love123456@ds153015.mlab.com:53015/heroku_6wmwvjg8";

module.exports.getAllOrders =  function (request, response) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection('ORDERS').find().toArray(function(err, docs) {
            response.render('getAllOrders', {results: docs});
        });
    });

};
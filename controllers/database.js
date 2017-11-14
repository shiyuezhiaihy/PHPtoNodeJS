var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://Yue1:Love123456@ds153015.mlab.com:53015/heroku_6wmwvjg8';

module.exports.getAllOrders =  function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        var Routes = db.collection('Routes');

        var c = Routes.find({});

        c.forEach(
            function(myDoc) {
                console.log( "name: " + myDoc.name );  //just  loging the output to the console
            }
        );

        Routes.find().toArray(function (err, docs) {
            if(err) throw err;

            response.render('getAllOrders', {results: docs});

        });

        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function
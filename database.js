var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI ||
    'mongodb://Yue1:Love123456@ds153015.mlab.com:53015/heroku_6wmwvjg8';
var bodyParser = require('body-parser');

// var x={
//     "bi_address1":"27752 hummingbird ct.",
//     "bi_address2":"",
//     "bi_city":"hayward",
//     "bi_state":"CA",
//     "bi_zip":"94545",
//     "name_card":"ert",
//     "card_number":"1234123412341234",
//     "cvs":"324",
//     "last_name":"hu",
//     "first_name":"yue",
//     "date":"2017-11",
//     "email":"xzx1231@gmail.com",
//     "phone":"5104155842",
//     "state":"CA",
//     "address1":"27752 hummingbird ct.",
//     "address2":"","zip":"94545"
// }
module.exports.storeData = function (req, res) {


    var body = JSON.stringify(req.body);
    var params = JSON.stringify(req.params);
    console.log(body)
    console.log(params)

    // user info
    var theid = req.body.theid;
    var first = req.body.first_name;
    var last = req.body.last_name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.bi_address1;
    var city = req.body.bi_city;
    var state = req.body.bi_state;
    var zip = req.body.bi_zip;
    // billing info
    var name_card = req.body.name_card;
    var card_num = req.body.card_number;
    var exp_date = req.body.date;
    // shipping info
    var ship_address = req.body.address;
    var ship_city = req.body.city;
    var ship_state = req.body.state;
    var ship_zip = req.body.zip;
    // var provector = req.body.provector;
    // var splitData = provector.split('|');


    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        // Create IDs for all the collections.
        var customerID = Math.floor((Math.random() * 100000000000) + 1);
        var billingID = Math.floor((Math.random() * 10000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000) + 1);
        var orderID = Math.floor((Math.random() * 100000000) + 1);
        // Get collection of customers, billing, shipping, orders.
        var customers = db.collection('CUSTOMERS');
        var billing = db.collection('BILLING');
        var shipping = db.collection('SHIPPING');
        var orders = db.collection('ORDERS');

        // Create a document to insert into CUSTOMERS.
        var customerData = {_id : customerID, FIRSTNAME : first, LASTNAME : last,
            STREET : address, CITY : city, STATE : state, ZIP : zip, EMAIL: email, PHONE:phone};

        // Create a document to insert into BILLING.
        var billingData = {_id : billingID, CUSTOMER_ID : customerID, CREDITCARDTYPE : name_card,
            CREDITCARDNUM : card_num, CREDITCARDEXP : exp_date};

        // Create a document to insert into SHIPPING.
        var shippingData = {_id : shippingID, CUSTOMER_ID : customerID, SHIPPING_STREET : ship_address,
            SHIPPING_CITY : ship_city, SHIPPING_STATE : ship_state, SHIPPING_ZIP : ship_zip};

        // Create a document to insert into ORDERS.
        try {
            var orderData = {_id: orderID,CUSTOMER_ID : customerID, BILLING_ID : billingID, SHIPPING_ID : shippingID,
                ORDER_TOTAL: 123, DATE : new Date().toDateString()};
        } catch (err) {
            response.render('storeData', { status1: 'Order NOT Successful'});
            throw err;
        }


        // Insert document into SHIPPING
        // // Insert document into BILLING.
        // // Insert document into CUSTOMERS.
        // // Insert document into ORDERS.
        customers.insertOne(customerData, function (err, result){ if(err)
        {response.render('storeData', { status1: 'Order NOT Successful'});
            throw err; }});
        billing.insertOne(billingData, function (err, result){ if(err)
        {response.render('storeData', { status1: 'Order NOT Successful'});
            throw err; }});
        shipping.insertOne(shippingData, function (err, result){ if(err)
        {response.render('storeData', { status1: 'Order NOT Successful'});
        throw err; }});
        orders.insertOne(orderData, function (err, result){ if(err)
        {response.render('storeData', { status1: 'Order NOT Successful'});
            throw err; }});

        //get data


        //    response.render('storeData', {results: docs});

        res.render('storeData', {customer: customerData, order: orderData,
            billing: billingData, shipping: shippingData, title: "store data" });
        // Close connection.

        // db.close(function  (err) {
        //     if(err) throw err;
        // });
        db.close(function (err){ if(err) throw err; });
    });
};
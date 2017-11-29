var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI ||
    'mongodb://Yue1:Love123456@ds153015.mlab.com:53015/heroku_6wmwvjg8';
var bodyParser = require('body-parser');


module.exports.storeData = function (req, res) {


    var body = JSON.stringify(req.body);
    var params = JSON.stringify(req.params);
    console.log(body)
    console.log(params)

    // customers info
    var first = req.body.first_name;
    var last = req.body.last_name;
    var phone = req.body.phone;
    var email = req.body.email;
    var address = req.body.bi_address1;
    var city = req.body.bi_city;
    var state = req.body.bi_state;
    var zip = req.body.bi_zip;
    // billing info
    var card_type = req.body.card_type;
    var card_num = req.body.card_number;
    var exp_date = req.body.date;
    var cvs = req.body.cvs;
    // shipping info
    var ship_address = req.body.address1;
    var ship_city = req.body.city;
    var ship_state = req.body.state;
    var ship_zip = req.body.zip;
    //order info
    var total = req.body.TOTALPRICE;
    // var provector = req.body.provector;
    // var splitData = provector.split('|');


    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;


        var customerID = Math.floor((Math.random() * 100000000000) + 1);
        var billingID = Math.floor((Math.random() * 10000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000) + 1);
        var orderID = Math.floor((Math.random() * 100000000) + 1);

        var customers = db.collection('CUSTOMERS');
        var billing = db.collection('BILLING');
        var shipping = db.collection('SHIPPING');
        var orders = db.collection('ORDERS');


        var customerData = {_id : customerID, FIRSTNAME : first, LASTNAME : last,
            STREET : address, CITY : city, STATE : state, ZIP : zip, EMAIL: email, PHONE:phone};


        var billingData = {_id : billingID, CUSTOMER_ID : customerID,
            CREDITCARDNUM : card_num, CREDITCARDEXP : exp_date, CREDITCARDSECURITYNUM : cvs};

        // Create a document to insert into SHIPPING.
        var shippingData = {_id : shippingID, CUSTOMER_ID : customerID, SHIPPING_STREET : ship_address,
            SHIPPING_CITY : ship_city, SHIPPING_STATE : ship_state, SHIPPING_ZIP : ship_zip};

        // Create a document to insert into ORDERS.
        try {
            var orderData = {_id: orderID,CUSTOMER_ID : customerID, BILLING_ID : billingID, SHIPPING_ID : shippingID,
                ORDER_TOTAL: total, DATE : new Date().toDateString()};
        } catch (err) {
            response.render('storeData', { status1: 'Order NOT Successful'});
            throw err;
        }



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


        // Close connection.
        res.render('storeData', {customer: customerData, order: orderData,
            billing: billingData, shipping: shippingData, status1: 'Your Current Order was Successful Placed!!!'});

        db.close(function (err){ if(err) throw err; });
    });
};
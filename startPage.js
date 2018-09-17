 var express= require("express");
 var MongoClient = require("mongodb");
 var url = "mongodb://localhost:27017/";
 var bodyParser = require("body-parser");
 var app = express();

var urlencodedParser = bodyParser.urlencoded({extended:false});

 app.get('/getAllCart', function (req, res) {
    MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
        if(err) throw err;
        var dbo = db.db("cartDB");
        dbo.collection("cartId").find({}).toArray(function(err, result) {
            if(err) throw err;
            db.close();
            res.send( {result});
        });
    });
 })
 
 app.get('/getSingle/:cartId', function (req, res) {
    var objId = req.params.cartId;
    MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
        if(err) throw err;
        var dbo = db.db("cartDB");
        //5b9f7db66d92f31f70e32f6d,
        var query = {_id:objId};
        dbo.collection("cartId").find(query).toArray((err,result)=>{
            if (err) throw err;
            db.close();
            res.send({result});
        });
    });
 })

 app.post('/process_post', urlencodedParser ,function (req, res) {
    var name1 = req.body.name;
    var price1 = req.body.price;
    var brand1 = req.body.brand;
    var currency1 = req.body.currency;
    console.log(name1,price1,brand1,currency1);
     MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
         if(err) throw err;
         var dbo = db.db("cartDB");
         var myNewObj = { name :name1 , price :price1, status:'Available', stockLeft:18, curreny:currency1, brand:brand1}
         dbo.collection("cartId").insertOne(myNewObj,(err,res)=>{
             if(err) throw err;
             console.log("1 ROW OR DOCUMENT CREATED");
             db.close();
         var myNewObj = { name :name1 , price :price1, status:'Available', stockLeft:18, curreny:currency1, brand:brand1}
             res.send(myNewObj);
         });
     });
 })

 app.delete('/delete/:cartId' ,function (req, res) {
    var cartId1 = req.params.cartId;
    console.log(cartId1);
      MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
          if(err) throw err;
          var dbo = db.db("cartDB");
          var myquery = { _id: cartId1 };
         dbo.collection("cartId").deleteMany(myquery, function(err, obj) {
             if (err) throw err;
             console.log("1 document deleted");
             db.close();
             res.send(obj);
         });
      });
 })
 
 var server = app.listen(8081, function () {
 });
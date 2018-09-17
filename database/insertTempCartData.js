var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("cartDB");
  var myobj = [
    { name: 'Item 1', price:50, status:'Available', stockLeft:10, curreny:'USD', brand:'Nike'},
    { name: 'Item 1', price:10, status:'Available', stockLeft:15, curreny:'INR', brand:'Adidas'},
    { name: 'Item 1', price:40, status:'Available', stockLeft:18, curreny:'USD', brand:'Reebok'}
  ];
  dbo.collection("cartId").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log(res);
    db.close();
  });
});
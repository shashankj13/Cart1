var MongoClient = require("mongodb");
var url = "mongodb://localhost:27017/";

var finalObj = MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
    if(err) throw err;
    var dbo = db.db("cartDB");
    dbo.collection("cartId").find({}).toArray(function(err, res) {
        if(err) throw err;
        db.close();
    });
});

module.exports = finalObj;
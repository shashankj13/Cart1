var MongoClient = require("mongodb");
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser:true},(err,db)=>{
    if(err) throw err;
    var dbo = db.db("cartDB");
    dbo.createCollection("cartId",(err,res)=>{
        if(err) throw err;
        console.log("Collection created");
        db.close();
    });
});
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/cartDB";

MongoClient.connect(url,{useNewUrlParser: true}, (err,db)=>{
    if(err) throw err;
    console.log("DB CREATED");
    db.close();
})
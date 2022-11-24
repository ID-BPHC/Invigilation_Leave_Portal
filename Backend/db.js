const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://td:td@cluster0.yhitu.mongodb.net/TDLeave?retryWrites=true&w=majority"


const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongod successfully!!");
    })
}

module.exports = connectToMongo;




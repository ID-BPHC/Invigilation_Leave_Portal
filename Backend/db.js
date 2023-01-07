const mongoose = require("mongoose");
require('dotenv').config()

// const mongoURI = process.env.MONGO_URI
const mongoURI = "mongodb://localhost:27017/TDLeave";


const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongod successfully!!");
    })
}

module.exports = connectToMongo;




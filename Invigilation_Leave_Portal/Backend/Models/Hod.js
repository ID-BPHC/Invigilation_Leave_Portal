const mongoose = require("mongoose");

const hodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    hpsrn:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("Hod",hodSchema);



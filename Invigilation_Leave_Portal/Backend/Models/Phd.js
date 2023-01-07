const mongoose = require("mongoose");

const phdSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true,
    },
    campusId:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:Number,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
    },
    reason:{
        type:String,
        required:true,
    },
    date:{
        type:Array,
        required:true,
    },
    leave:{
        type:Boolean,
    }
});

const Phd = mongoose.model("phd",phdSchema);
module.exports = Phd;


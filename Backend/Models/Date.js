const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
    start:{
        type:String,
        required:true,
    },
    end:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("Date",dateSchema);
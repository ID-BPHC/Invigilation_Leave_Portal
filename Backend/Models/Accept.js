const mongoose = require("mongoose");

const acceptSchema = new mongoose.Schema({
    student_portal:{
        type:Boolean,
        required:true,
    },
    hod_portal:{
        type:Boolean,
        required:true,
    }
});

module.exports = mongoose.model("Accept",acceptSchema);




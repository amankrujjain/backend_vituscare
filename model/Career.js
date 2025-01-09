const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema({
    job_title:{
        type:String,
        required: true,
        unique: true
    },
    job_location:{
        type:String,
        required: true,
    },
    job_type:{
        type:String,
        required: true,
    },
    job_experience:{
        type:String,
        required: true,
    },
    job_created_on:{
        type:Date,
        default: Date.now()
    },
    job_description:{
        type:String,
        required: true,
    },
    is_active:{
        type: Boolean,
        default: true
    }

})

const CareerModel = mongoose.model("CareerSchema",CareerSchema);
module.exports = CareerModel;
const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
    name_of_center:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    date:{
        type:String,
        required:true
    },
    originalPdfPath:{
        type:String,
        required: true
    },
    processedPdfPath:{
        type: String,
        required: true
    }

})
module.exports = mongoose.model('Pdf', DocumentSchema);
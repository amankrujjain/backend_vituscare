const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    blog_title:{
        type:String,
        required: true,
    },
    blog_description:{
        type: String,
        required: true
    },
    blog_author:{
        type: String,
        required: true
    },
    blog_author_pic:{
        type: String,
    },
    created_on:{
        type:Date,
        default: new Date()
    },
    blog_image:{
        type: String,
        required: true
    },
    blog_category:{
        type: String,
        required: true
    },
    is_active:{
        type: Boolean,
        default: true
    }
})

const BlogModel = mongoose.model("BlogModel", BlogSchema);

module.exports = BlogModel;
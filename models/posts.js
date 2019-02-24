const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = require('./users');
const postsSchema = new Schema({
    name:{
        type : String,
        required : [true,"Book name is required"],
        min : [3,"Book name length must be at least 3 characters"]
    },
    price:{
        type: Number,
        required: [true,"Book price is required"]
    },
    description:{
        type : String
    },
    seller:[{
        type:Schema.Types.ObjectId,
        ref:'Users'
    }],
    postDate:{
        type:String,
        required:[true,"Post date is required"]
    },
    expired :{
        type:Boolean
    }
})

const Posts = mongoose.model('Posts',postsSchema);
module.exports = Posts;
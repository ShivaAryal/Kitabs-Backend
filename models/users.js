const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Posts = require('./posts');
const usersSchema = new Schema({
    name:{
        type:String,
        required:[true,"User name is required"],
        minlength:[4,"User name length must be at least 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        minlength:[10,"Email length must be at least 10 characters"],
        validate:{
            validator: function(v){
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(v).toLowerCase());
            },
            message: "It is not a valid email id!"
        }
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password length must be at least 6 characters"]
    },
    phoneNumber:{
        type:Number,
        required:[true,"Phone number is required"],
        validate:{
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: 'It is not a valid phone number!'
        }
    },
    college:{
        type:String,
        required:[true,"College name is required"],
        minlength:[5,"College name must be at least 5 characters"]
    },
    semester:{
        type:String,
        required:[true,"Semester name is required"]
    },
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Posts'
    }]
})

usersSchema.pre('save',function(next){
    if(this.isModified("password")){
        this.password=bcrypt.hashSync(this.password)
    }
    next();
})

let Users = mongoose.model('Users', usersSchema);
module.exports = Users;
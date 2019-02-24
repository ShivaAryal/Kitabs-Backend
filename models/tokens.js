const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    email : {
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
    token:{
        type: Number
    }
},{
    timestamps: true
})

const Token = mongoose.model('Token',tokenSchema.index({createdAt: 1},{expireAfterSeconds: 60}));
module.exports = Token;
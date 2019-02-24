const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs')
const secret = 'shiva'
const nodeMailer = require('nodemailer');
const Users = require('./../../models/users');
const Token = require('./../../models/tokens');

const verifyEmail = (email) => new Promise((resolve,reject)=>{
    let verificationCode = Math.floor(100000 + Math.random() * 900000)
    let transporter = nodeMailer.createTransport({
        service:'gmail',
        auth:{
            user:'hostelappinfo@gmail.com',
            pass:'randompassword'
        }
    });

    let mailOptions ={
        from : 'hostelappinfo@gmail.com',
        to : email,
        subject:'Your verification code for Kitabs is',
        text : verificationCode.toString()
    };

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            reject(err);
        }else{
            /// check here if token already exists for the same email or not
            Token.findOne({email:email},(err,tokens)=>{
                if(err) reject(err)
                if(!tokens){
                    let tokenData = new Token({email:email,token:verificationCode})
                    tokenData.save((err,data)=>{
                        err && reject(err) || resolve(data)
                    })
                }else{
                    reject({message:"Token already exists"})
                }
            })
        }
    })
})

const registerUser = (body) => new Promise((resolve,reject)=>{
    Token.findOne({email:body.email},(err,data)=>{
        if(err) reject(err)
        if(data.token==body.verificationCode){
            let userData = new Users(body);
            userData.save((error,info)=>{
                error && reject(error) || resolve(info)
            })
        }else{
            reject({message:'Verification code mismatched'})
        }
    })
})

const resendToken = (email) => new Promise((resolve,reject)=>{
    Token.findOne({email:email},(err,data)=>{
        if(err) reject(err)
        if(data){
            data.email = email
            let verificationCode = Math.floor(100000 + Math.random() * 900000)
            let transporter = nodeMailer.createTransport({
                service:'gmail',
                auth:{
                    user:'hostelappinfo@gmail.com',
                    pass:'randompassword'
                }
            });
        
            let mailOptions ={
                from : 'shivaaryalj7@gmail.com',
                to : email,
                subject:'Your verification code for Kitabs is',
                text : verificationCode.toString()
            };
        
            transporter.sendMail(mailOptions,(err,info)=>{
                if(err){
                    reject(err);
                }else{
                    data.token = verificationCode
                    data.save((err,newData)=>{
                        err && reject(err) || resolve(newData)
                    })
                }
            })
        }
    })
})

const login = (email,password) => new Promise((resolve,reject)=>{
    Users.findOne({email:email},(err,user)=>{
        if(err) reject(err);
        if(user){
            var passwordIsValid = bcrypt.compareSync(password,user.password);
            if(!passwordIsValid){
                reject("Email/Password doesn't match")
            }else{
                token = jwt.sign({id:user._id,name:user.name},secret)
                let userObj = {
                    token,
                    name:user.name
                }
                resolve(userObj)
            }
        }
    })
})

module.exports = {
    verifyEmail,registerUser, resendToken, login
}
const router = require('express').Router();
const response = require('./../utils');
const helper = require('./../utils/helper');

const userController = require('./../controllers/users/auth');

router.post('/verifyEmail',(req,res)=>{
    userController.verifyEmail(req.body.email).then(user=>{
        response.sendDataSuccess(res,"",user)
    }).catch(err=>{
        response.sendDataError(res,err.message)
    })
})

router.post('/register',(req,res)=>{
    userController.registerUser(req.body).then(user=>{
        response.sendDataSuccess(res,"",user)
    }).catch(err=>{
        response.sendDataError(res,err)
    })
})

router.post('/resend',(req,res)=>{
    userController.resendToken(req.body.email).then(user=>{
        response.sendDataSuccess(res,"",user)
    }).catch(err=>{
        response.sendDataError(res,err)
    })
})

router.post('/login',(req,res)=>{
    userController.login(req.body.email,req.body.password).then(user=>{
        response.sendDataSuccess(res,"",user)
    }).catch(err=>{
        response.sendDataError(res,err);
    })
})

module.exports = router;
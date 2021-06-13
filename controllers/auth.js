const User= require("../models/user");
const { check, validationResult } = require('express-validator');

exports.signup = (req, res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error_msg : errors.array()[0].msg,
            error_param : errors.array()[0].param,
            error_location : errors.array()[0].location,
        })
    }


    const user = new User(req.body)
    user.save((err, user)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err : "Not able to save user in DB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
          });

    })
};


exports.signout = (req, res)=>{
    res.json({
        message : "User signout"
    })
};


import User from "../models/user_model.js";
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
export const decodeToken = async function(req, res){
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, ENV.JWT_SECRET, function(err, decoded_token){
            if(err){
                return res.staus(500).json({message:err})
            }else{
                console.log(decoded_token);
                req.user = decoded_token.email;
            }
        });
    }catch(err){
        return res.status(500).json({message:err});
    }
}

export const putDay = async function(req, res){
    try{
        const {image, person, day} = req.body;
        User.findOneAndUpdate({
            email: req.user
        },
        {$push: {days: {image: image, person: person, day: day}}},
        function(err, success){
            if(err){
                return res.status(500).json({message: "faild to put days"});
            }else{
                return res.status(201).json({message: "day pushed"});
            }
        });
    }catch(err){
        return res.status(500).json({message:err});
    }
}
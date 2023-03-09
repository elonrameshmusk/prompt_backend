import User from '../models/user_model.js';
import bcrypt from 'bcrypt';

export const register = async function(req, res){
    try{
        const {email, password} = req.body;
        //THE FOLLOWING CODE CHECKS FOR UNIQUENESS OF PROVIDED EMAIL ID, WHICH MAY NOT BE NECESSARY
        //SINCE THE CHECK IS ALREADY DONE WHILE DEFINING SCHEMA. EXPERIMENT WITH IT
        const existingEmail = await User.findOne({email: email});
        if(existingEmail){
            return res.status(409).json({message: "email already exists"});
        }
        bcrypt.hash(password, 10).then((hashed_password)=>{
            User.create({
                email: email,
                password: hashed_password
            }).then((user)=>{
                return res.status(201).send(user);
            }).catch((err)=>{
                return res.status(500).send(err);
            });
        }).catch((err)=>{
            return res.status(500).send(err);
        });    
    }catch(err){
        return res.status(500).send(err);
    }
}
export const registerMail = async function(req, res){
    res.json('/registerMail POST');
}
export const authenticate = async function(req, res){
    res.json('/authenticate POST');
}
export const login = async function(req, res){
    res.json('/login POST');
}

export const getUsername = async function(req, res){
    res.json(`/user/${req.params.username} GET`);
}
export const generateOTP = async function(req, res){
    res.json('/generateOTP GET');
}
export const verifyOTP = async function(req, res){
    res.json('/verifyOTP GET');
}
export const createResetSession = async function(req, res){
    res.json('/createResetSession GET');
}

export const updateUser = async function(req,res){
    res.json('/updateUser PUT');
}
export const resetPassword = async function(req, res){
    res.json('/resetPassword PUT');
}
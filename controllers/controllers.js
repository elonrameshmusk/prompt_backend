import User from '../models/user_model.js';
import bcrypt, { hash } from 'bcrypt';
import ENV from '../config.js';

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
                return res.status(201).json({message: "user created", user: user});
            }).catch((err)=>{
                return res.status(500).json({message: err});
            });
        }).catch((err)=>{
            return res.status(500).json({message:err});
        });    
    }catch(err){
        return res.status(500).json({message:err});
    }
}
export const registerMail = async function(req, res){
    res.json('/registerMail POST');
}
export const authenticate = async function(req, res){
    res.json('/authenticate POST');
}
export const login = async function(req, res){
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(500).json({message:"fields can't be empty"});
        }
        User.findOne({email: email}).then((user)=>{
            bcrypt.hash(password, 10).then((hashed_password)=>{
                console.log("hashed_password:"+hashed_password);
                console.log("user password:"+user.password);
            })
            bcrypt.compare(password, user.password).then((password_check)=>{
                const token = jwt.sign({
                    userId: user._id,
                    email: user.email,
                }, ENV.JWT_SECRET, {expiresIn: "10m"});
                return res.status(200).json({message: token});
            }).catch((err)=>{
                return res.status(400).json({message: "password does not match"})
            });
        }).catch((err)=>{
            return res.status(404).json({message:"user with the email id does not exist"})
        });
    }catch(err){
        return res.status(500).json({message:err});
    }
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
import User from '../models/user_model.js';
import bcrypt, { hash } from 'bcrypt';
import ENV from '../config.js';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';

export const verifyUser = async function (req, res, next){
    try {
        const email = req.method == "GET" ? req.query.email : req.body.email;
        let exist = await User.findOne({ email: email });
        if(!exist) return res.status(404).send("A user with the email id does not exist");
        req.user = exist;
        next();
    } catch (err) {
        return res.status(404).send("There was an error. Please try again later");
    }
}

export const register = async function(req, res){
    try{
        const { email, password } = req.body;

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
        return res.status(409).json({ message: "Email already exists" });
        }

        const hashed_password = await bcrypt.hash(password, 10);
        const user = await User.create({ email: email, password: hashed_password });

        return res.status(201).json({ message: "User created", user: user });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    } 
}
export const authorize = async function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).send("You are not authorized to access this page");
    }    
}
export const login = async function(req, res){
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(500).send("Please fill out the email and password fields");
        }
        const user = req.user;
        bcrypt.compare(password, user.password, function(err, password_check){
            if(err){
                return res.status(500).send("Can't log in right now. Please try again later");
            }
            if(password_check){
                const token = jwt.sign({
                    userId: user._id,
                    email: user.email,
                }, ENV.JWT_SECRET, {expiresIn: "1h"});
                return res.status(200).send(token);
            }
            else{
                return res.status(400).send("password does not match")
            }
        });
    }catch(err){
        return res.status(500).send("Can't log in. Please check your internet connection once or try again later");
    }
}

export const test = async function(req, res){
    res.status(200).json({message:"superpowers granted"});
}
export const getUsername = async function(req, res){
    
}
export const generateOTP = async function(req, res){
    req.app.locals.OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).json({ message: req.app.locals.OTP })
}
export const verifyOTP = async function(req, res){
    const { otp } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(otp)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(200).json({ message: 'otp verified'})
    }
    return res.status(400).json({ message: "invalid otp"});
}
export const createResetSession = async function(req, res){
    if(req.app.locals.resetSession){
        return res.status(201).json({ message : req.app.locals.resetSession})
   }
   return res.status(440).json({message : "session expired"});
}

export const updateUser = async function(req,res){
    res.json('/updateUser PUT');
}
export const resetPassword = async function(req, res){
    try{
        if(!req.app.locals.resetSession) return res.status(440).json({message: "session expired"});
        const email = req.user.email;
        const password = req.body.password;
        bcrypt.hash(password, 10).then((hashed_password)=>{
            User.updateOne({email: email}, {password: hashed_password}).then((data)=>{
                req.app.locals.resetSession = false;
                return res.status(201).json({message: "password updated"});
            }).catch((err)=>{
                return res.status(500).json({message: "cannot update user password"});
            });
        }).catch((err)=>{
            return res.status(500).json({message: "unable to hash the password"})
        })
    }catch(err){
        return res.status(500).json({message:err}) 
    }
}
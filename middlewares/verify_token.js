import jwt from 'jsonwebtoken';
import ENV from '../config.js';
export default async function Auth(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded_token = await jwt.verify(token, ENV.JWT_SECRET);
        req.user = decoded_token;
        next();
    }catch(err){
        return res.status(401).json({message:"authentication failed"})
    }
}
export function localVariables(req, res, next){
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}
import User from "../models/user_model.js";
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
export const decodeToken = async function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, ENV.JWT_SECRET, function(err, decoded_token){
            if(err){
                return res.staus(500).send(err)
            }else{
                req.user = decoded_token.email;
                next();
            }
        });
    }catch(err){
        return res.status(500).send(err);
    }
}

export const getAllDays = async function(req, res) {
    try {
        const userEmail = req.user;

        const user = await User.find(
            { email: userEmail },
        );

        if (!user) {
            return res.status(404).send("user not found" );
        }
        console.log(typeof(user[0].days))
        console.log(user[0].days);
        return res.status(200).send(user[0].days);
    } catch(err) {
        return res.status(500).send("89");
    }
}

export const putDay = async function(req, res) {
    try {
        const { image, person, day } = req.body;
        const userEmail = req.user;

        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            { $push: { days: { image: image, person: person, day: day } } }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "user not found" });
        }

        return res.status(201).json({ message: "day pushed" });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

export const deleteDay = async function(req, res) {
    try {
        const { image, person, day } = req.body;
        const userEmail = req.user;

        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            { $pull: { days: { image: image, person: person, day: day } } },
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "user not found" });
        }

        return res.status(200).json({ message: "day deleted" });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}




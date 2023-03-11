import nodemailer from 'nodemailer';
// import Mailgen from 'mailgen';

import ENV from '../config.js';

export default function registerMail(req, res){
    const user_email = req.body.user_email;
    let config = {
        service: 'gmail',
        auth: {
            user: ENV.EMAIL,
            pass: ENV.PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config);
    let message = {
        from: ENV.EMAIL,
        to: user_email,
        subject: "Signup Success!",
        text: "Your signup for Promt app is successful!"
    }
    transporter.sendMail(message).then(()=>{
        return res.status(201).json({message: "mail sent"});
    }).catch((err)=>{
        return res.status(500).json({message: err});
    })
}
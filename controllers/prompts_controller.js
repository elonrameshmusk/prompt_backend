import Prompt from "../models/prompt_model.js";
import User from "../models/user_model.js";
export const createPrompt = (req, res) => {
    const prompt = req.body.prompt;
    const time = req.body.time;
    const promptObject = new Prompt({
        prompt: prompt,
        time: time
    });
    promptObject.save().then(async (savedPrompt)=>{
        const month = req.body.month;
        const day = req.body.day;
        const userEmail = req.user.email;
        await User.findOne({email: userEmail}).then(async foundUser=>{
            // console.log(foundUser.year);
            await foundUser.months[0].days[0].promptIds.push(savedPrompt._id);
            return res.status(201).json({message: "new prompt pushed"});
        }).catch(err=>{
            return res.status(500).json({error: "cant push new prompt"})
        })
    }).catch((err)=>{
        console.log(err);
        return res.status(500).json({message: "error"});
    })
    
    
}

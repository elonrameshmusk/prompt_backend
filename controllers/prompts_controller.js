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
            await foundUser.year.jan.d1.day.push(savedPrompt._id);
            await foundUser.save();
            return res.status(201).json({message: "new prompt pushed"});
        }).catch(err=>{
            console.log(err);
            return res.status(500).json({error: "cant push new prompt"})
        })
    }).catch((err)=>{
        console.log(err);
        return res.status(500).json({message: "error"});
    })
}

export const getPrompt = (req, res) => {
    const promptId = req.body.promptId;
    Prompt.findOne({_id: promptId}).then((foundPrompt)=>{
        return res.status(200).json({prompt: foundPrompt});
    }).catch((err)=>{
        console.log(err);
        return res.status(500).json({message: "error"});
    })
}

export const putPrompt = (req, res) => {
    const promptId = req.body.promptId;
    const prompt = req.body.prompt;
    const time = req.body.time;
    Prompt.findOne({_id: promptId}).then((foundPrompt)=>{
        foundPrompt.prompt = prompt;
        foundPrompt.time = time;
        foundPrompt.save().then((savedPrompt)=>{
            return res.status(200).json({message: "prompt updated"});
        }).catch((err)=>{
            console.log(err);
            return res.status(500).json({message: "error"});
        })
    }).catch((err)=>{
        console.log(err);
        return res.status(500).json({message: "error"});
    });
}

export const deletePrompt = (req, res) => {
    const promptId = req.body.promptId;
    Prompt.findOneAndDelete({_id: promptId}).then((deletedPrompt)=>{
        return res.status(200).json({message: "promt deleted"});
    }).catch((err)=>{
        console.log(err);
        return res.status(500).json({message: "error"});
    });
}

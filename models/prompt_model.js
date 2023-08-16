import mongoose from 'mongoose';
const promptSchema = mongoose.Schema({
    prompt: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});
const Prompt = mongoose.model('Prompt', promptSchema);
export default Prompt;
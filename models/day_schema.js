import mongoose from 'mongoose';
const daySchema = mongoose.Schema({
    promptIds: {
        type: [mongoose.Schema.Types.ObjectId],
    }
});
export default daySchema;
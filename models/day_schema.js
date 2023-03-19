import mongoose from "mongoose";
const daySchema = mongoose.Schema({
    image:{
        type: 'String',
        required: true
    },
    person:{
        type: 'String',
        required: true
    },
    day: {
        type: 'String',
        required: true
    }
});
export default daySchema;

import mongoose from 'mongoose';
import daySchema from './day_schema.js';
const monthSchema = mongoose.Schema({
    days: {
        type: [daySchema],
        required: true
    }
});
export default monthSchema;
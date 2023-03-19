import mongoose from 'mongoose';
import daySchema from './day_schema.js';
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    days:[daySchema]
});
const User = mongoose.model('User', userSchema);
export default User;
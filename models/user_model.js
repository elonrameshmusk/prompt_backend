import mongoose from 'mongoose';
import monthSchema from './month_schema.js';
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
    months: {
        type: [monthSchema],
        required: true
    }
});
const User = mongoose.model('User', userSchema);
export default User;
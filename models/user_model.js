import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        // unique: [true, "A user with the email id already exists"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false
    }
});
const User = mongoose.model('User', userSchema);
export default User;
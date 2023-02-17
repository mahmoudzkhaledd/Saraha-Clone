const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required : true,
        unique: true,
    },
    password: {
        type:String,
        required: true
    },
    username: {
        type:String,
        required: true,
        default: '',
    },
    imageUrl: {
        type: String,
        default: ""
    },
    messages: {
        type: Array,
        default: [],
    },
})
const User = mongoose.model("User", userSchema);


module.exports = User;

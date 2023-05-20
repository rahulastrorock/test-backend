const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    aadhaar:{
        type: String,
        minLength: 12,
        maxLength: 12,
    },
    village:{
        type: String,
    },
    mobile:{
        type: String,
        minLength: 10,
        maxLength: 10,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
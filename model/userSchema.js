const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "Please mention First Name"]
    },
    lastName:{
        type: String,
        required: [true, "Please mention Last Name"]
    },

    email:{
        type: String,
        required: [true, "Please mention email"]
    },

    gender:{
        type: String,
        required: [true, "Please mention email"]
    },
    
},
{
    timestamps: true
})

module.exports = mongoose.model('Users',userSchema)
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    },
    porfilepic:{
        type: String,
        default: "",
        
    },
    dashboard:{
        type: String,
        unique: true,
    }
}, {
    timestamps: true,
})
module.exports = mongoose.model("User", UserSchema)
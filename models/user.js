const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String, 
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts:[{type: mongoose.Schema.Types.ObjectId,ref: "Thought"}],
    
    friends: [{type: mongoose.Schema.Types.ObjectId,ref: "User"}]
        
})

userSchema.virtual("friendCount").get(() => this.friends.length);

const User = mongoose.model("User", userSchema)

//this will export the user model
module.exports = User;
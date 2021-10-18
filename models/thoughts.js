const mongoose = require("mongoose");
const dayjs = require("dayjs");

const formatDate = (date) => {
    return dayjs(date).format("MM/DD/YYYY")
}

const reactionSchema = mongoose.Schema({
    reactionId : {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
        
    }
},
)


const thoughtSchema = mongoose.Schema({
    thoughtText: {
        type: String, 
        required: true,
        minLength: 1,
        maxLength: 280
        
    },
    username: {
        type: String, 
        required: true,
        
    },
    reactions: [reactionSchema],
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
        
    }
}
)

thoughtSchema.virtual("reactionCount").get(() => this.reactions.length);

const Thought = mongoose.model("Thought", thoughtSchema)

//this will export the user model
module.exports = Thought;
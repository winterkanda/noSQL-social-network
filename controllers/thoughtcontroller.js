const User = require("../models/user.js");
const Thought = require("../models/thoughts.js");

const getAllThoughts = async(req,res) => {
    try{
    const thoughts = await Thought.find({})
    
    res.status(200).json(thoughts)
   
    } catch(err) {
        throw new Error(err)
    }
}

const createThought = async(req,res) => {
    const {thoughtText, username, userId} = req.body

    try{
    
    const thought = await Thought.create({thoughtText, username})

    console.log("thought createdAt", thought.createdAt)

    const user = await User.findOneAndUpdate({_id:userId}, {$push: {thoughts: thought._id}})
    
    res.status(201).json(thought)

    } catch(err) {
        throw new Error(err)
    }
}

const getThoughtsById = async(req,res) => {
    try{
    const thoughts = await Thought.find({_id:req.params.id})
    
    res.status(200).json(thoughts)
   
    } catch(err) {
        throw new Error(err)
    }
}

const updateThoughts = async(req,res) => {
    const {username, thoughtText, userId} = req.body

    try{
    const thoughtExists = await Thought.findOne({_id:req.params.id})

    if (!thoughtExists){
        res.status(400)
        throw new Error("Sorry, this thought does not exist.")
    }
    
    //finds the one with the matching ID and then it updates the username & email according to the request body
    const thoughts = await Thought.findOneAndUpdate({_id:req.params.id}, {username:username,thoughtText, userId})
    
    res.status(201).json(thoughts)

    } catch(err) {
        throw new Error(err)
    }
}

const deleteThoughts = async(req,res) => {

    try{
    const thoughtExists = await Thought.findOne({_id:req.params.id})

    if (!thoughtExists){
        res.status(400)
        throw new Error("Sorry, this thought does not exist.")
    }
    
    //finds the one and delete
    const thought = await Thought.findOneAndDelete({_id:req.params.id})
    
    res.status(200).json(thought)

    } catch(err) {
        throw new Error(err)
    }
}

const addReaction = async(req,res) => {
    
    const {thoughtId} = req.params

    try{
    const thought = await Thought.findById(thoughtId)

    if (!thought) {
        res.status(400)
        throw new Error("Sorry, this thought doesn't exist.")
    }

    const updatedThought = await Thought.updateOne({_id:thoughtId}, {$push:{reactions:req.body}})

    res.status(201).json(updatedThought)
    } catch(err) {
        throw new Error(err)
    }
}

const deleteReaction = async(req,res) => {
    
    const {thoughtId, reactionId} = req.params

    try{
    const thought = await Thought.findById(thoughtId)

    if (!thought) {
        res.status(400)
        throw new Error("Sorry, this thought doesn't exist.")
    }

    const updatedThought = await Thought.updateOne({_id:thoughtId}, {$pull:{reactions:{reactionId:reactionId}}})

    res.status(201).json(updatedThought)
    } catch(err) {
        throw new Error(err)
    }
}

module.exports = {getAllThoughts, createThought, getThoughtsById, updateThoughts, deleteThoughts, addReaction, deleteReaction};
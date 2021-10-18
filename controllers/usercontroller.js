const Thought = require("../models/thoughts.js");
const User = require("../models/user.js");

const getAllUsers = async(req,res) => {
    try{
    const users = await User.find({})
    res.status(200).json(users)
    } catch(err) {
        throw new Error(err)
    }
}

const createUser = async(req,res) => {
    const {username, email} = req.body

    try{
    const userExists = await User.findOne({username})

    if (userExists){
        res.status(400)
        throw new Error("Sorry, this user already exists.")
    }
    
    const user = await User.create({username, email})
    
    res.status(201).json(user)

    } catch(err) {
        throw new Error(err)
    }
}

const getSingleUser = async(req,res) => {
    try{
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error("Sorry, this user doesn't exist.")
    }

    res.status(200).json(user)
    } catch(err) {
        throw new Error(err)
    }
}

const updateUser = async(req,res) => {
    const {username, email} = req.body

    try{
    const userExists = await User.findOne({_id:req.params.id})

    if (!userExists){
        res.status(400)
        throw new Error("Sorry, this user does not exist.")
    }
    
    //finds the one with the matching ID and then it updates the username & email according to the request body
    const user = await User.findOneAndUpdate({_id:req.params.id}, {username:username,email:email})
    
    res.status(201).json(user)

    } catch(err) {
        throw new Error(err)
    }
}

const deleteUser = async(req,res) => {

    try{
    const userExists = await User.findOne({_id:req.params.id})

    if (!userExists){
        res.status(400)
        throw new Error("Sorry, this user does not exist.")
    }
    
    //this will delete the associated thoughts from the user that is being deleted
    const thought = await Thought.deleteMany({username: userExists.username})

    //finds the one and delete
    const user = await User.findOneAndDelete({_id:req.params.id})
    
    res.status(200).json(user)

    } catch(err) {
        throw new Error(err)
    }
}

const addFriend = async(req,res) => {
    
    const {userId, friendId} = req.params

    try{
    const user = await User.findById(userId)

    if (!user) {
        res.status(400)
        throw new Error("Sorry, this user doesn't exist.")
    }

    const updatedUser = await User.updateOne({_id:userId}, {$push:{friends:friendId}})

    res.status(201).json(updatedUser)
    } catch(err) {
        throw new Error(err)
    }
}

const deleteFriend = async(req,res) => {
    
    const {userId, friendId} = req.params

    try{
    const user = await User.findById(userId)

    if (!user) {
        res.status(400)
        throw new Error("Sorry, this user doesn't exist.")
    }

    const updatedUser = await User.updateOne({_id:userId}, {$pull:{friends:friendId}})

    res.status(201).json(updatedUser)
    } catch(err) {
        throw new Error(err)
    }
}


module.exports = {getAllUsers, createUser, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend};

const express = require("express");
const { getAllUsers, createUser, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend } = require("../controllers/usercontroller");
const router = express.Router();

router.route("/")
    .get(getAllUsers)
    .post(createUser);
router.route("/:id")
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports=router;
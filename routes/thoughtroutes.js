const express = require("express");
const { createThought, getAllThoughts, getThoughtsById, updateThoughts, deleteThoughts, addReaction, deleteReaction } = require("../controllers/thoughtcontroller");

const router = express.Router();

router.route ("/")
    .post(createThought)
    .get(getAllThoughts);
router.route("/:id")
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);
router.route("/:thoughtId/reactions/:reactionId")
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;
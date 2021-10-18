const userRoutes = require("./userroutes");
const thoughtRoutes = require("./thoughtroutes");
const express = require("express");

const router = express.Router();

router.use("/users",userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports=router;

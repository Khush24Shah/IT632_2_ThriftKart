const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authVerify");

const {updateProfile,getAllProfile,getSingleProfile,deleteProfile} = require("../controllers/profile");
router.route("/all").get(verifyToken,getAllProfile);
router.route("/").get(verifyToken, getSingleProfile).patch(verifyToken, updateProfile).delete(verifyToken, deleteProfile);

module.exports=router; 
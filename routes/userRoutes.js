const express = require("express");
const {
  registerUser,
  allUsers,
  getSingleUser,
  loginUser,
  logOutUser,
} = require("../controllers/userControllers");
const { authorizeRole } = require("../middleware/auth");

const router = express.Router();

//admin
router.route("/admin/users").get(authorizeRole, allUsers);

//user
router.route("/register").post(registerUser);
router.route("/user").get(getSingleUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);

module.exports = router;

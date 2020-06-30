const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

// Any user should access this routes so there is no need to protect them
// We remove the whole body of the routing methods and put it in the controllers

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

module.exports = router;

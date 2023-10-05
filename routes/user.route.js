const express = require("express");
const router= express.Router();
const userController = require("../controller/user.controller")
const auth = require("../middlewere/auth")
router.route("/signUp").post(userController.signUp);
router.route("/emailVerify").post(userController.emailVerify);
router.route("/login").post(userController.login);
router.route("/update").put(auth, userController.update);
router.route("/getList").get(auth, userController.getUsers);
router.route("/:id").get(auth, userController.getById);
router.route("/delete/:id").delete(auth, userController.deleteUser);

module.exports = router
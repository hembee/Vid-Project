const { Router } = require("express");
const usersControllers = require("../controllers/users.controller");

const router = Router();

router.post("/create", usersControllers.createUserController);
router.get("/search", usersControllers.findUserController);
router.get("/login", usersControllers.loginUSer);

module.exports = { userRouter: router };

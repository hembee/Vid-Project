const { Router } = require("express");
const usersControllers = require("../controllers/users.controller");
const tryCatchHandler = require("../utils/tryCatch.handler");

const router = Router();

router.post("/create", tryCatchHandler(usersControllers.createUserController));
router.get("/search", tryCatchHandler(usersControllers.findUserController));
router.get("/login", tryCatchHandler(usersControllers.loginUSer));

module.exports = { userRouter: router };

const User = require("../models/users.model");
const createUserValidator = require("../validators/users.validator");

const usersControllers = {
  createUserController: (req, res) => {
    const { error } = createUserValidator.validate(req.body);
    if (error) throw error;
    const newUser = User.create(req.body);
    res.status(201).json({
      status: "Success",
      message: "user created succesfully",
      data: newUser,
    });
  },
  findUserController: (req, res) => {
    const { id } = req.params.id;
    const user = User.findById(id);
    if (!user) throw new NotFoundError("User not found");

    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        user,
      },
    });
  },
};

module.exports = usersControllers;

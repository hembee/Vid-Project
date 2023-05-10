const { NotFoundError, BadUserRequestError } = require("../error/error");
const User = require("../models/users.model");
const createUserValidator = require("../validators/users.validator");
require("dotenv").config();

const usersControllers = {
  createUserController: (req, res) => {
    const { error } = createUserValidator.validate(req.body);
    if (error) throw error;
    const emailExists = User.find({ email: req.body.email });
    if (emailExists.length > 0)
      throw new BadUserRequestError(
        "An account with this email already exists."
      );
    const usernameExists = User.find({ username: req.body.username });
    if (usernameExists.length > 0)
      throw new BadUserRequestError("Username exists.");
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUND);
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    const newUser = User.create(user);
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
  loginUSer: (req, res) => {
    const { error } = loginUserValidator.validate(req.body);
    if (error) throw error;
    if (!req.body?.username && !req.body?.email)
      throw new BadUserRequestError(
        "Please provide a username and email before you can login."
      );
    const user = User.findOne({
      $or: [
        {
          email: req.body?.email,
        },
        {
          username: req.body?.username,
        },
      ],
    });
    const hash = bcrypt.compareSync(req.body.password, user.password);
    if (!hash)
      throw new BadUserRequestError("username, email or password is wrong!");
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

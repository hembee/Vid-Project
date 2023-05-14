const { NotFoundError, BadUserRequestError } = require("../error/error");
const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/jwt.utils");
const {
  createUserValidator,
  loginUserValidator,
} = require("../validators/users.validator");
require("dotenv").config();

const usersControllers = {
  createUserController: async (req, res) => {
    const { error } = createUserValidator.validate(req.body);
    if (error) throw error;
    const emailExists = await User.find({ email: req.body.email });
    if (emailExists.length > 0)
      throw new BadUserRequestError(
        "An account with this email already exists."
      );
    const usernameExists = await User.find({ username: req.body.username });
    if (usernameExists.length > 0)
      throw new BadUserRequestError("Username exists.");
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUND);
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    const newUser = await User.create(user);
    res.status(201).json({
      status: "Success",
      message: "user created succesfully",
      data: newUser,
      access_token: generateToken(newUser),
    });
  },
  findUserController: async (req, res) => {
    const { id } = req.params.id;
    const user = await User.findById(id);
    if (!user) throw new NotFoundError("User not found");

    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        user,
      },
    });
  },
  loginUSer: async (req, res) => {
    const { error } = loginUserValidator.validate(req.body);
    if (error) throw error;
    if (!req.body?.username && !req.body?.email)
      throw new BadUserRequestError(
        "Please provide a username and email before you can login."
      );
    const user = await User.findOne({
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
        access_token: generateToken(user),
      },
    });
  },
};

module.exports = usersControllers;

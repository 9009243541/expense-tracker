require("./route.user");
const userService = require("./service.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {};
require("dotenv").config();
userController.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const data = await userService.getUserByEmail(email);
    if (data.length) {
      return res.send({
        status: "error",
        msg: "email already exist",
        data: null,
      });
    }
    const hash = bcrypt.hashSync(password, 10);
    //register
    let newUser = await userService.register({ name, email, password: hash });
    // Generate JWT token
    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    return res.send({
      status: "OK",
      msg: " User registered successfully",
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      msg: "something went wrong",
      data: null,
    });
  }
};

userController.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch the user by email
    let user = await userService.getUserByEmail(email);

    if (user.length && user[0].email === email) {
      // Extract hashed password from the user object

      //   user.password = null;
      let { password: hash } = user[0];

      // Compare provided password with the hashed password
      let isMatch = bcrypt.compareSync(password, hash);

      if (isMatch) {
        let token = jwt.sign({ _id: user[0]?._id }, process.env.TOKEN_SECRET);

        return res.send({
          status: "OK",
          msg: "User Login Successfully",
          data: {
            token: token,
            userId: user[0]._id,
            name: user[0].name,
            email: user[0].email,
          },
        });
      } else {
        return res.send({
          msg: "Invalid password",
        });
      }
    } else {
      return res.send({
        msg: "User not found or email mismatch",
      });
    }
  } catch (error) {
    return res.send({
      status: "error",
      msg: "something went wrong",
      data: null,
    });
  }
};
userController.getUser = async (req, res) => {
  try {
    // const { id } = req.params;
    let getUser = await userService.getUser();

    if (!getUser.length) {
      return res.send({
        status: "OK",
        msg: "user not found",
        data: null,
      });
    }
    return res.send({
      status: "OK",
      msg: "User Get successfully",
      data: getUser,
    });
  } catch (error) {
    res.send({
      status: "Error",
      msg: "something went wrong",
      data: null,
    });
  }
};

module.exports = userController;

const User = require("./model.user");

const userService = {};

userService.register = async ({ name, email, password }) => {
  return User.create({
    name,
    email,
    password,
  });
};

userService.getUserByEmail = async (email) => {
  //   let findUser = await User.find({ email });

  //   return { data: findUser };
  return User.find({ email });
};
userService.getUser = async () => {
  //   let findUser = await User.find({ email });

  //   return { data: findUser };
  return User.find();
};

module.exports = userService;

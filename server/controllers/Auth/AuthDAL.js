let db = require("../../config/db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports.welcome = () => {
  return "Hey, You reached the Auth Server.";
};

module.exports.register = async ({
  name,
  email,
  password,
  cnfPassword,
  mobile,
}) => {
  let dbo = await db;
  let Users = dbo.collection("user");

  let res = await Users.findOne({ email });
  if (res) throwError("User Already Exists");
  if (cnfPassword !== password) throwError("Passwords do not match");

  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  let userToInsert = {
    name,
    email,
    password: hash,
    roles: ["customer"],
  };
  console.log(mobile);
  if (mobile) userToInsert.mobile = mobile;

  res = await Users.insertOne(userToInsert);
  return { success: true, id: res.insertedId };
};

module.exports.login = async ({ email, password }) => {
  let dbo = await db;
  let Users = dbo.collection("user");

  let user = await Users.findOne({ email });
  if (!user) throwError("User Does Not Exist");

  if (!bcrypt.compareSync(password, user.password))
    throwError("Invalid Password", 401);

  var token = jwt.sign(
    { roles: user.roles, email },
    "MyVeryPersonalSecretKeyAndThisIsNotPersonalReallyItsNotButKeepItSecure",
    { expiresIn: "1h" }
  );

  return { success: true, token: token, user: userRet(user) };
};

module.exports.get = async (email) => {
  let dbo = await db;
  let Users = dbo.collection("user");

  let user = await Users.findOne({ email });
  if (!user) throwError("User Does Not Exist", 401);

  return { success: true, user: userRet(user) };
};

const userRet = (user) => {
  if (user.password) delete user.password;
  user.id = user._id;
  if (user._id) delete user._id;
  return user;
};
const throwError = (message, status = 400) => {
  let err = new Error(message);
  err.status = status;
  err.data = { success: false };
  throw err;
};

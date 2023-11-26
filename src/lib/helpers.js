const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const matchPassword = async (password, savedPassword) =>
  await bcrypt.compare(password, savedPassword);

module.exports = {
  encryptPassword,
  matchPassword
}
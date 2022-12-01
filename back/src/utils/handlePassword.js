const bcrypt = require("bcrypt")

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

const comparePasswords = (password, hash) => bcrypt.compare(password, hash)

module.exports = {
  hashPassword,
  comparePasswords
}
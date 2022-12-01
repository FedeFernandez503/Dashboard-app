const usersCollection = require("../models/user")
const { hashPassword, comparePasswords } = require("../utils/handlePassword")


const signup = async (req, res) => {
  try {
    const { password, username } = req.body
    let user = await usersCollection.findOne({ username })
    if (user) {
      res.status(409).json({ message: "Username alredy in use." })
      return
    }
    const hashedPassword = await hashPassword(password)
    user = await usersCollection.create({ username, password: hashedPassword })
    res.status(201).json({ uid: user._id, tasks: user.tasks })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal server error." })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await usersCollection.findOne({ username })
    if (user) {
      const match = await comparePasswords(password, user.password)
      if (match) {
        res.status(200).json({ uid: user._id, tasks: user.tasks, username: user.username })
        return
      }
    }
    res.status(401).json({ message: "Incorrect username or password." })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal server error." })
  }
}

module.exports = {
  signup,
  login
}
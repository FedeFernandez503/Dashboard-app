const router = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcrypt")



router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("User wrong")
        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(400).json("Wrong Credentials")
        const {password, ...other} = user._doc
        
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router
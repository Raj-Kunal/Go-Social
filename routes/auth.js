const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

//Register
router.post('/register', async (req, res) => {


    try {
        // generate new hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // crate new user
        // const {username, email, password, profilePicture, coverPicture, fo} = req.body
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        // return response
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
        // console.log(err)
    }

})


// Login

router.post("/login", async (req, res) => {
   try{
    const {email, password} = req.body
    const user = await User.findOne({email})
    !user && res.status(404).json("user not found")

    const validPassword = await bcrypt.compare(password, user.password)
    !validPassword && res.status(400).json("wrong password")


    res.status(200).json(user)
   } catch (err){
    res.status(500).json(err)
    // console.log(err)
   }
})



module.exports = router 
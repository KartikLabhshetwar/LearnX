const express = require("express")
const router = express.Router()
const z = require('zod');
const {users} = require('../db');
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")
const authMiddleware = require("../middleware")

const userSchema = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

router.post("/signup", async (req, res) => {
    const parseSchema = userSchema.safeParse(req.body);

    if(!parseSchema.success){
        return res.status(411).json({
            message: "Incorrect inputs."
        })
    }

    const existingUser = await users.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
          message: "Email already taken",
        });
    }

    const user = await users.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userId = user._id;

    const token = jwt.sign({userId}, JWT_SECRET)

    res.json({
        message: "User created Successfully",
        token: token
    })

})

const userSign = z.object({
    username: z.string().email(),
    password: z.string()
})

router.post("/signin", async (req, res)=>{
    const validateUser = userSign.safeParse(req.body)
    if (validateUser.success != true) {
    return res.status(411).json({
        message: "Incorrect inputs.",
    });
    }

    const existingUser =  await users.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(existingUser){
        const token = jwt.sign({userId: existingUser._id}, JWT_SECRET);
        res.json({
            token: token
        })

        return;
    }

     res.status(411).json({
       message: "Error while logging in",
     });

})

router.get("/me", authMiddleware, async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, JWT_SECRET);
  const userId = decodedToken.userId;
  const user = await users.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ user });
});




module.exports = router;
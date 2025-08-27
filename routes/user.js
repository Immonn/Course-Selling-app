const jwt = require("jsonwebtoken")
const { z } = require("zod")
const { Router } = require("express")
const userRouter = Router()
const { UserModel, CoursesModel} = require("../db")
const { JWT_USER_PASSWORD } = require("../config")
const bcrypt=require("bcrypt")
const {userAuth}=require("../middlewares/user")


userRouter.post("/up", async (req, res) => {
    const required = z.object({
        name: z.string(),
        username: z.string().min(5),
        password: z.string().min(5)
    })
    const parseData = required.safeParse(req.body)
    if (!parseData.success) {
        res.json({
            msg: "Invalid Credentials"
        })
    }
    const { name, username, password } = req.body
    try {
        const user = await UserModel.findOne({
            username: username
        })
        if(user){
            res.send("Username is already registered")
        }
        const hashpassword=await bcrypt.hash(password,5)
        await UserModel.create({
            name,
            username,
            password:hashpassword
        })
        res.json({
            msg:"Congrats You are Registered"
        })
    } catch (error) {
        res.status(403).json({
            msg:error.message 
        })
    }
})

userRouter.post("/in", async (req, res) => {
    const required = z.object({
        username: z.string().min(5),
        password: z.string().min(5)
    })
    const parseData = required.safeParse(req.body)
    if (!parseData.success) {
        res.json({
            msg: "Invalid Credentials"
        })
    }
    const { username, password } = req.body
    try {
        const user = await UserModel.findOne({
            username: username
        })
        const passwordMatch=await bcrypt.compare(password,user.password)
        if(passwordMatch){
            const token=jwt.sign({
                id:user._id
            },JWT_USER_PASSWORD )
            res.json({
                token
            })
        }else{
            res.send("Incorrect Password or Username")
        }
    } catch (error) {
        res.status(403).json({
            msg:error.message 
        })
    }
})

userRouter.get("/purchases",userAuth,async(req,res)=>{
    const userId=req.userId

    const user=await UserModel.findById(userId).populate("purchasedCourses")
    res.json({
        purchasedCourses:user.purchasedCourses
    })
})

module.exports={
    userRouter
}
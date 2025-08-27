require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require("mongoose")


const {userRouter}=require('./routes/user')
const {adminRouter}=require('./routes/admin')
const {coursesRouter}=require('./routes/courses')

app.use(express.json())

app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/courses",coursesRouter)

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
    console.log("App is running at 3000")
}

main()
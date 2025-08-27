const { Router } = require("express");
const { userAuth } = require("../middlewares/user");
const { PurchasesModel, CoursesModel} = require("../db")
const coursesRouter = Router();

coursesRouter.post("/purchase",userAuth,async (req,res)=>{
    const userId=req.userId
    const courseId=req.body.courseId
    await PurchasesModel.create({
        userId,
        courseId
    })
    res.json({
        msg:"You are successfully Registered"
    })
})

coursesRouter.get("/preview", async function(req, res) {
    
    const courses = await CoursesModel.find({});

    res.json({
        courses
    })
})

module.exports = {
    coursesRouter: coursesRouter
}
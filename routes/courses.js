const { Router } = require("express");
const { userAuth } = require("../middlewares/user");
const { UserModel, CoursesModel} = require("../db")
const coursesRouter = Router();




coursesRouter.post("/purchase", userAuth, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    if (!courseId) {
        return res.status(400).json({ msg: "CourseId is required" });
    }

    await UserModel.updateOne(
        { _id: userId },
        { $addToSet: { purchasedCourses: courseId } }
    );

    res.json({
        msg: "Course purchased successfully"
    });
});




coursesRouter.get("/preview", async function(req, res) {
    
    const courses = await CoursesModel.find({});

    res.json({
        courses
    })
})

module.exports = {
    coursesRouter: coursesRouter
}
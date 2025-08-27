const jwt = require("jsonwebtoken")
const { z } = require("zod")
const { Router } = require("express")
const adminRouter = Router()
const { AdminModel, CoursesModel } = require("../db")
const { JWT_ADMIN_PASSWORD } = require("../config")
const bcrypt = require("bcrypt")
const { adminAuth } = require("../middlewares/admin")


adminRouter.post("/up", async (req, res) => {
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
        const user = await AdminModel.findOne({
            username: username
        })
        if (user) {
            res.send("Username is already registered")
        }
        const hashpassword = await bcrypt.hash(password, 5)
        await AdminModel.create({
            name,
            username,
            password: hashpassword
        })
        res.json({
            msg: "Congrats You are Registered"
        })
    } catch (error) {
        res.status(403).json({
            msg: error.message
        })
    }
})

adminRouter.post("/in", async (req, res) => {
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
        const user = await AdminModel.findOne({
            username: username
        })
        const passwordMatch = bcrypt.compare(password, user.password)
        if (passwordMatch) {
            const token = jwt.sign({
                id: user._id
            }, JWT_ADMIN_PASSWORD)
            res.json({
                token
            })
        } else {
            res.send("Incorrect Password or Username")
        }
    } catch (error) {
        res.status(403).json({
            msg: error.message
        })
    }
})

adminRouter.post("/course", adminAuth, async (req, res) => {
    const adminId = req.adminId
    const required = z.object({
        title: z.string().min(5),
        description: z.string().min(5),
        price: z.number(),
        image: z.string()
    })
    const parseData = required.safeParse(req.body)
    if (!parseData.success) {
        res.json({
            msg: "Invalid Credentials"
        })
    }
    const { title, description, price, image } = req.body

    try {
        const course = await CoursesModel.create({
            title,
            description,
            price,
            image,
            createrId: adminId
        })
        res.json({
            msg: "Course is created",
            courseId: course._id
        })
    } catch (error) {
        res.status(403).json({
            msg: error.message
        })
    }
})

adminRouter.put("/course", adminAuth, async function (req, res) {
    const adminId = req.userId;

    const { title, description, image , price, courseId } = req.body;

    const course = await CoursesModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        image: image,
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})



adminRouter.get("/courses", adminAuth, async (req, res) => {
    const adminId = req.adminId
    const courses = await CoursesModel.find({
        createrId: adminId
    })
    res.json({
        msg: "Updated Courses",
        courses
    })
})

module.exports = {
    adminRouter
}


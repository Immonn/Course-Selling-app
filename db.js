const mongoose=require("mongoose")
const Schema=mongoose.Schema
const ObjectId=Schema.ObjectId

const User=new Schema({
    name : String,
    username : {type:String,unique:true},
    password:String,
    purchasedCourses:[{
        type:ObjectId,
        ref:"courses" //Model name in compass
    }]
})

const Admin=new Schema({
    name:String,
    username : {type:String,unique:true},
    password:String
})

const Courses=new Schema({
    title:String,
    description:String,
    price:Number,
    image:String,
    createrId:ObjectId
})


const UserModel=mongoose.model("users",User)
const AdminModel=mongoose.model("admins",Admin)
const CoursesModel=mongoose.model("courses",Courses)

module.exports={
    UserModel,
    AdminModel,
    CoursesModel
}
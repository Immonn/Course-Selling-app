const mongoose=require("mongoose")
const Schema=mongoose.Schema
const ObjectId=Schema.ObjectId

const User=new Schema({
    name : String,
    username : {type:String,unique:true},
    password:String
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

const purchases=new Schema({
    userId:ObjectId,
    courseID:ObjectId
})

const UserModel=mongoose.model("users",User)
const AdminModel=mongoose.model("admins",Admin)
const CoursesModel=mongoose.model("courses",Courses)
const PurchasesModel=mongoose.model("purchases",purchases)

module.exports={
    UserModel,
    AdminModel,
    CoursesModel,
    PurchasesModel
}
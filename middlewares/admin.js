const jwt=require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD}=require("../config")

function adminAuth(req,res,next){
    const token=req.headers.token
    const decode=jwt.verify(token,JWT_ADMIN_PASSWORD)
    if(decode){
        req.adminId=decode.id
        next()
    }else{
        res.send("Invalid Token")
    }
}

module.exports={
    adminAuth
}
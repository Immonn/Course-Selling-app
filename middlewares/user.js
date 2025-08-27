const jwt=require("jsonwebtoken")
const {JWT_USER_PASSWORD}=require("../config")

function userAuth(req,res,next){
    const token=req.headers.token
    const decode=jwt.verify(token,JWT_USER_PASSWORD)
    if(decode){
        req.userId=decode.id
        next()
    }else{
        res.send("Invalid Token")
    }
}

module.exports={
    userAuth
}
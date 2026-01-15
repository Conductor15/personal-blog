const User = require("../models/user.model");
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports.requireAuth = async (req,res,next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        //verify
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log("Decoded: ", decoded)
            next();
        } catch (error) {
            return res.status(401).json({
                message: "Token bị hết hạn hoặc không hợp lệ"
            })
        }
    }else{
        res.json({
            code:400,
            message:"Token required"
        })
    }
}
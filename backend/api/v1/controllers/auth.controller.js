const md5 = require("md5");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken")
require("dotenv").config()


module.exports.login = async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({deleted:false, email:email});
        if(!user){
            return res.status(401).json({
                message: "Email không tồn tại"
            })
        }
        else{
            if (user.password !== md5(password)){
                return res.status(401).json({
                    message: "Mật khẩu không đúng"
                })
            }
            else{
                //create accesstoken
                const payload = {
                    userId: user._id,
                    userName: user.blogName
                }

                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )

                return res.status(200).json({
                    message: "Đăng nhập thành công",
                    access_token,
                    user: {
                        id: user._id,
                        fullName: user.fullName
                    }
                })
                
            }
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


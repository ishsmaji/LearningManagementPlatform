const User =require("../models/User");
const mailsender=require("../utils/mailSender");
const bcrypt=require("bcrypt");

//resetPasswordtoken

exports.resetPasswordToken = async(req ,res)=>{
    try {
        const email =req.body.email;
        const user=await User.findOne({email:email})
        if(!user)
        {
            return res.status(403).json({
                success:false,
                message:"User is not registered yet."
            })
        }
        const token=crypto.randomUUID();
        const updateDetails=await User.findByIdAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+5*60*1000,
            },
            {
                new:true,
            }
        )
        const url=`http://localhost:3000/update-password/${token}`;
        await mailsender(
            email,
            "Reset Your Password",
            `Password reset link:${url}`
        );
        return res.status(200).json({
            success:true,
            message:"Email sent successfully. Please open your email and change password"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Facing error while sending email"
        })
    }
}

//ResetPassword
exports.resetPassword= async(req ,res)=>{
    try {
        const {password,confirmPassword,token}=req.body;
        if(password != confirmPassword)
        {
            return res.status(401).json({
                success:false,
                message:"Password not matching",
            })
        }
        const userDetails=await User.findOne({toekn:token});
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            })
        }
        if(userDetails.resetPasswordExpires< Date.now())
        {
            return res.status(401).json({
                success:false,
                message:"Token is expired",
            })
        }
        const hahedPassword= await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(
            {token:token},
            {password:hahedPassword},
            {new:true},
        )

        return res.status(200).json({
            success:true,
            message:"Password reset succesfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reseting password"
        })
    }
}
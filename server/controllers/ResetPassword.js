const User =require("../models/User");
const mailsender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const { resetPasswordEmail } = require("../mail/templates/resetPasswordEmail");

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.status(403).json({
                success:false,
                message:"Email is required",
            });
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Your email is not registered with us",
            });
        }
        const token = crypto.randomUUID();
        const updateDetails = await User.findOneAndUpdate( {email:email }, 
                                                             { 
                                                                token: token,
                                                                resetPasswordExpires: Date.now() + 5*60*1000,
                                                             },
                                                             {new:true}
                                                            );

        const url = `https://studynotion-abhay.vercel.app/update-password/${token}`
        const firstName = user.firstName || "User"; // Fallback if firstName is not available
        await mailsender(
            email,
            "Password Reset Link",
            resetPasswordEmail(firstName, url)
        );
        return res.status(200).json({
            success:true,
            message:"Email sent Successfully , Check your email and change Password",
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong while reset the password and sending mail",
        });
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
        const userDetails=await User.findOne({token:token});
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

        await User.findOneAndUpdate(
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
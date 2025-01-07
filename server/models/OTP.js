const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const emailVerificationTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});


async function sendVerificationMail(email,otp){
    try {
        const emailBody = emailVerificationTemplate(otp);
   
        const mailResponse= await mailSender(email, "Verify Your Email with OTP", emailBody);;
    } catch (error) {
        console.log("Error while sending verification mail:",error)
        throw error;
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationMail(this.email ,this.otp);
    next();
})


module.exports=mongoose.model("OTP",otpSchema);

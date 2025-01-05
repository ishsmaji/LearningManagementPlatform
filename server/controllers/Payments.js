const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");

exports.capturePayment = async (req, res) => {
  const { course_id } = req.body;
  const userId = req.user.id;
  if (!course_id) {
    return res.json({ success: false, message: "Please Provide Course ID" });
  }

  let course;
  try {
    course = await Course.findById(course_id);

    // If the course is not found, return an error
    if (!course) {
      return res
        .status(200)
        .json({ success: false, message: "Could not find the Course" });
    }

    // Check if the user is already enrolled in the course
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res
        .status(200)
        .json({ success: false, message: "Student is already Enrolled" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
  const amount=course.price;
  const currency= "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes:{
        CourseId: course_id,
        userId,
    }
  };

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    res.json({
      success: true,
      courseName:course.courseName,
      courseDescription:course.courseDescription,
      thumbnail:course.thumbnail,
      orderId:paymentResponse.id,
      currency:paymentResponse.currency,
      amount:paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." });
  }
};



//VerifySignature


exports.verifySignature=async(req ,res)=>{
    const webhookSecret="123456789";
    const signature = req.headers["x-razorpay-signature"];
    const shasum= crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex");

    if(signature ===digest)
    {
        console.log("Payment is Authorized");
        const {courseId,userId}=req.body.payload.payment.entity.notes;
        try {
            const enrolledCourse=await Course.findOneAndUpdate(
                {_id:courseId},
                {
                    $push:
                    {
                       studentsEnrolled:userId 
                    }
                },
                {new:true},
            )

            if(!enrolledCourse)
            {
                return res.status(500).json({
                    success:false,
                    message:"Course not found",
                })
            }
            console.log(enrolledCourse);
            const enrolledStudents= await User.findOneAndUpdate(
                {_id:userId},
                {
                    $push:
                    {
                       course:courseId 
                    }
                },
                {new:true},
            )
            console.log(enrolledStudents);

            const emailResponse= await mailSender(
                enrolledStudents.email,
                "Congratulations from StudyNotion",
                "Congratulations! You are onboarded into new Course"
            )
            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course Added",
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid Request",
        })
    }
}

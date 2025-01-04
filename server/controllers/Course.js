const Tag=require("../models/Tag");
const Course=require("../models/Course");
const User=require("../models/User");
const {uploadImageToCoudinary}= require("../utils/ImageUploader");

exports.createCourse=async(req ,res)=>{
    try {
        const {courseName,courseDescription,whatYouWWillLearn,
            price,tag
        }=req.body;

        const thumbnail=req.flies.thumbnailImage;
        if(!courseName || !courseDescription || !whatYouWWillLearn
           || !price || !tag)
        {
            return res.status(400).json({
                success:false,
                message:"All fileds are required",
            })
        }
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);
        if(!instructorDetails)
         {
            return res.status(404).json({
                success:false,
                message:"Instructor details not found",
            })
         }
        const tagDetails=await Tag.findById(tag);
        if(!tagDetails)
            {
               return res.status(404).json({
                   success:false,
                   message:"Tag details not found",
               })
            }

            const thumbnailImage=await uploadImageToCoudinary(thumbnail,process.env.FOLDER_NAME);
            const newCourse=await Course.create({
                courseName,
                courseDescription,
                whatYouWWillLearn,
                price,
                instructor:instructorDetails._id,
                tag:tagDetails._id,
                thumbnail:thumbnailImage.secure_url,
            })
            await User.findByIdAndDelete(
                {_id:instructorDetails._id},
                {
                   $push:{
                    courses:newCourse._id
                   }
                },
                {new:true}
            )

            await Tag.findByIdAndDelete(
                {_id:tagDetails._id},
                {
                   $push:{
                    courses:newCourse._id
                   }
                },
                {new:true}
            )

            return res.staus(200).json({
                success:true,
                message:"Course addd successfully",
                newCourse,
            })
    } catch (error) {
        console.log(error)
        return res.staus(500).json({
            success:false,
            message:"Faing error while upload a new course",
            error:error.message
        })
    }
}


///getallcourse

exports.showAllCourses=async(req ,res)=>{
    try {
        const allCouse=await Course.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true,})
            .populate("Instructor")
            .exce();
        
            return res.staus(200).json({
                success:true,
                message:"Course fetching successfully",
                allCouse,
            })

    } catch (error) {
        console.log(error)
        return res.staus(500).json({
            success:false,
            message:"Faing error while fetching all course",
            error:error.message
        })
    }
}


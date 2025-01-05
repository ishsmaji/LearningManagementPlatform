const Profile=require("../models/Profile");
const User=require("../models/User");

exports.updateProfile=async(req ,res)=>{
    try {
        const{gender , contactNumber , dateOfBirth="" , about=""}=req.body;
        const id=req.user.id;
        if(!id || !contactNumber || !gender)
        {
            return res.status(400).json({
                success:false,
                message:"All files are required",
            })
        }
        const userDetails=await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId);
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber,
        profileDetails.gender=gender,
        await profileDetails.save();
        
        return res.status(200).json({
            success: true,
            message: "Profile updated Successfully",
            profileDetails,
          });

    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unabl to create Profile. Please try again.",
      error: error.messsage,
    });
    }
}


exports.deleteProfile=async(req ,res)=>{
    try {
        const id=req.user.id;
        const userDetails=await User.findById(id);
        if(!userDetails)
        {
            return res.status(400).json({
                success:true,
                message:"User notfound"
            })
        }
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        await User.findByIdAndDelete({_id:id});
        return res.status(200).json({
            success: true,
            message: "Profile Deleted Successfully",
          });
    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unabl to delete Profile. Please try again.",
      error: error.messsage,
    });
    }
}


const getUserDetails=async(req ,res)=>{
    try {
        const id=req.user.id;
        
        const userDetails=await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully.",
          });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Unabl to fetch Profile details. Please try again.",
          error: error.messsage,
        });
    }
}
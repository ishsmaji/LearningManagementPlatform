const Section = require("../models/Section");
const Subsection = require("../models/Subsections");
const {uploadImageToCoudinary} = require("../utils/ImageUploader");

exports.createSubsection = async (req, res) => {
  try {
    const {  sectionId ,title ,timeDuration ,description } = req.body;

    const video=req.files.videoFiles;

    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    //upload video to cloudinary
    const uploadVideo= await uploadImageToCoudinary(video, process.env.FOLDER_NAME);

    const subSectionDetails = await Subsection.create({ 
        title:title,
        timeDuration:timeDuration,
        description:description,
        videoUrl:uploadVideo.secure_url,
     });
    const updateSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Subsection Created Successfully",
      updateSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to create Subsection. Please try again.",
      error: error.messsage,
    });
  }
};


// exports.updateSection=async(req ,res)=>{
//     try {
//         const { sectionName, sectionId } = req.body;
//     if (!sectionName || !sectionId) {
//       return res.status(404).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }
//     const section =await Section.findByIdAndDelete(sectionId , {sectionName}, {new:true})
//     return res.status(200).json({
//         success: true,
//         message: "Section updated Successfully",
//       });
    
//     } catch (error) {
//         console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Unabl to update section. Please try again.",
//       error: error.messsage,
//     });
//     }
// }


exports.deleteSubsection=async(req ,res)=>{
    try {
        const {subSectionId}=req.params;
        await Subsection.findByIdAndDelete({subSectionId});
        return res.status(200).json({
            success: true,
            message: "Subsection delete Successfully",
          });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Unabl to Delete Subsection. Please try again.",
          error: error.messsage,
        });
    }
}
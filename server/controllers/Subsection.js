const Section = require("../models/Section");
const Subsection = require("../models/Subsection");
const { uploadImageToCloudinary } = require("../utils/ImageUploader");

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

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body
    const subSection = await Subsection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    console.log("updated section", updatedSection)

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}


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
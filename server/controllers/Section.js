const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newSection = await Section.create({ sectionName });
    const updateCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      updateCourseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unabl to create section. Please try again.",
      error: error.messsage,
    });
  }
};


exports.updateSection=async(req ,res)=>{
    try {
        const { sectionName, sectionId } = req.body;
    if (!sectionName || !sectionId) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const section =await Section.findByIdAndDelete(sectionId , {sectionName}, {new:true})
    return res.status(200).json({
        success: true,
        message: "Section updated Successfully",
      });
    
    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unabl to update section. Please try again.",
      error: error.messsage,
    });
    }
}


exports.deleteSection=async(req ,res)=>{
    try {
        const {sectionId}=req.params;
        await Section.findByIdAndDelete({sectionId});
        return res.status(200).json({
            success: true,
            message: "Section delete Successfully",
          });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Unabl to Delete section. Please try again.",
          error: error.messsage,
        });
    }
}
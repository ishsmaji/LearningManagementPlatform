const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User");
const { uploadImageToCoudinary } = require("../utils/ImageUploader");

exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, whatYouWWillLearn, price, category } =
      req.body;

    const thumbnail = req.flies.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWWillLearn ||
      !price ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
    }
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category details not found",
      });
    }

    const thumbnailImage = await uploadImageToCoudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatYouWWillLearn,
      price,
      instructor: instructorDetails._id,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return res.staus(200).json({
      success: true,
      message: "Course addd successfully",
      newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.staus(500).json({
      success: false,
      message: "Faing error while upload a new course",
      error: error.message,
    });
  }
};

///getallcourse

exports.showAllCourses = async (req, res) => {
  try {
    const allCouse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("Instructor")
      .exce();

    return res.staus(200).json({
      success: true,
      message: "Course fetching successfully",
      allCouse,
    });
  } catch (error) {
    console.log(error);
    return res.staus(500).json({
      success: false,
      message: "Faing error while fetching all course",
      error: error.message,
    });
  }
};

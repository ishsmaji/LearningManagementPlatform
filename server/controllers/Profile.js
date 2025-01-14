const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/ImageUploader");
const Course = require("../models/Course");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");

// update profile
exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth, about, contactNumber, gender, firstName, lastName } =
      req.body;
    const userId = req.user.id;
    if (
      !contactNumber ||
      !gender ||
      !userId ||
      !about ||
      !dateOfBirth ||
      !firstName ||
      !lastName
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    const userDetails = await User.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
      },
      { new: true }
    );

    const profileId = userDetails.additionalDetails;
    const updateProfile = await Profile.findByIdAndUpdate(
      { _id: profileId },
      {
        gender: gender,
        contactNumber: contactNumber,
        dateOfBirth: dateOfBirth,
        about: about,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updateProfile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Unable to Update Profile, Please try again",
    });
  }
};

// delete Profile
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById({ _id: userId });
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const profileId = userDetails.additionDetails;
    await Profile.findByIdAndDelete({ _id: profileId });
    for (courseId of userDetails?.courses) {
      const courseDetails = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $pull: {
            studentEnrolled: userId,
          },
        },
        { new: true }
      );
    }

    await User.findByIdAndDelete({ _id: userId });
    return res.status(200).json({
      success: true,
      message: "User Account Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Unable to Delete Profile, Please try again",
    });
  }
};

// All UserDetails
exports.getAllUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User Id not found",
      });
    }
    const userDetails = await User.findById({ _id: userId })
      .populate("additionalDetails")
      .exec();
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User Details not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Details Fetched Successfully",
      userDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Unable to Get User Details, Please try again",
    });
  }
};
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    if (!displayPicture || !userId) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        image: image.secure_url,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Display picture updated Successfully",
      updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in updating Profile picture",
      error: err.message,
    });
  }
};

// getEnrolledCourses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    let userDetails = await User.findById({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    userDetails = userDetails.toObject();
    var subSectionLength = 0;
    for (let i = 0; i < userDetails?.courses?.length; i++) {
      let totalDurationInSeconds = 0;
      subSectionLength = 0;
      for (let j = 0; j < userDetails?.courses[i]?.courseContent?.length; j++) {
        userDetails?.courses[i]?.courseContent[j]?.subSection.forEach(
          (subSection) => {
            totalDurationInSeconds =
              totalDurationInSeconds + parseInt(subSection?.timeDuration);
          }
        );

        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        subSectionLength =
          subSectionLength + userDetails?.courses[i]?.subSection?.length;
      }
      let courseProgressDetails = await CourseProgress.findOne({
        courseId: userDetails?.courses[i]?._id,
        userId: userId,
      });

      courseProgressCount = courseProgressDetails?.completedVideos?.length;

      if (subSectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / subSectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Could not found user Details",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: userDetails.courses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Something went wrong in GetEnrolled Courses",
    });
  }
};

// instructor Dashboard
exports.instructorDasboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseDetails = await Course.find({ instructor: userId });
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course?.studentEnrolled.length;
      const totalAmountGenerated = course?.price * totalStudentsEnrolled;
      const courseDataWithStats = {
        _id: course?._id,
        courseName: course?.courseName,
        courseDescription: course?.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    return res.status(200).json({
      success: true,
      message: "Instuctor dashboard details fetched successfully",
      courseData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in fetching instructor dashboard Data",
    });
  }
};

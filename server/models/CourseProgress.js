const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
  CourseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  completeVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subsection",
    },
  ],
});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);

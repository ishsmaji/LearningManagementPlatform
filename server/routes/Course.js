
const express = require("express")

const router = express.Router()
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails ,
  editCourse,
  getInstructorCourses,
  deleteCourse
} = require("../controllers/Course")

const {
  showAllCategories,
  createCategory,
  categoryPageDetails
} = require("../controllers/Category")

const {
  createSection,
  updateSection,
  deleteSection
} = require("../controllers/Section")

const {
  createSubsection,
  updateSubSection,
  deleteSubsection
} = require("../controllers/Subsection")

const {
  createRating,
  getAverageRating,
  getAllRating
} = require("../controllers/RatingAndReview")

const {
  updateCourseProgress
} = require("../controllers/courseProgress");

const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/createSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection", auth, isInstructor, deleteSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubsection", auth, isInstructor, deleteSubsection)
router.post("/createSubsection", auth, isInstructor, createSubsection)
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.post("/editCourse", auth, isInstructor, editCourse)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.delete("/deleteCourse", deleteCourse)
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);


router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router





// Route for creating a course
/**
 * @swagger
 * /api/courseDetails/createCourse:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *                 description: Name of the course
 *                 example: "React for Beginners"
 *               courseDescription:
 *                 type: string
 *                 description: Description of the course
 *                 example: "A comprehensive guide to React.js"
 *               whatYouWWillLearn:
 *                 type: string
 *                 description: Key takeaways from the course
 *                 example: "React fundamentals, hooks, and state management"
 *               price:
 *                 type: number
 *                 description: Price of the course
 *                 example: 49.99
 *               category:
 *                 type: string
 *                 description: ID of the course category
 *                 example: "64a1e3f2c1a4f4567890abcd"
 *               thumbnailImage:
 *                 type: string
 *                 format: binary
 *                 description: Thumbnail image of the course
 *     responses:
 *       200:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Course added successfully"
 *                 newCourse:
 *                   type: object
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error while creating a new course"
 */

// Route for fetching all courses
/**
 * @swagger
 * /api/courseDetails/getAllCourses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Courses fetched successfully"
 *                 allCourses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       courseName:
 *                         type: string
 *                       price:
 *                         type: number
 *                       thumbnail:
 *                         type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error while fetching courses"
 */

// Route for fetching course details
/**
 * @swagger
 * /api/courseDetails/getCourseDetails:
 *   post:
 *     summary: Get course details
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: ID of the course
 *                 example: "64a1e3f2c1a4f4567890abcd"
 *     responses:
 *       200:
 *         description: Course details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Course details fetched successfully"
 *                 courseDetails:
 *                   type: object
 *       400:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Could not find the course with the given ID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to fetch course details"
 */

// Route for editing a course
/**
 * @swagger
 * /api/courseDetails/editCourse:
 *   put:
 *     summary: Edit a course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: ID of the course to be updated
 *                 example: "64a1e3f2c1a4f4567890abcd"
 *               thumbnailImage:
 *                 type: string
 *                 format: binary
 *                 description: New thumbnail image for the course
 *               [otherFields]:
 *                 type: object
 *                 additionalProperties: true
 *                 description: Any other fields to update in the course
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Course updated successfully"
 *                 data:
 *                   type: object
 *                   description: Updated course details
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Course not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

// Route for fetching full course details
/**
 * @swagger
 * /api/courseDetails/getFullCourseDetails:
 *   post:
 *     summary: Get full course details
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: ID of the course
 *                 example: "64a1e3f2c1a4f4567890abcd"
 *     responses:
 *       200:
 *         description: Course details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     courseDetails:
 *                       type: object
 *                     totalDuration:
 *                       type: string
 *                       description: Total duration of the course
 *                       example: "5 hours 30 minutes"
 *                     completedVideos:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of completed video IDs
 *       400:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Could not find course with id: 64a1e3f2c1a4f4567890abcd"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

// Route for fetching instructor courses
/**
 * @swagger
 * /api/courseDetails/getInstructorCourses:
 *   get:
 *     summary: Get all courses by the instructor
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of instructor's courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve instructor courses"
 */

// Route for deleting a course
/**
 * @swagger
 * /api/courseDetails/deleteCourse:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: ID of the course to delete
 *                 example: "64a1e3f2c1a4f4567890abcd"
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Course deleted successfully"
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */


// Route for creating a category
/**
 * @swagger
 * /api/courseDetails/createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *                 example: "Programming"
 *               description:
 *                 type: string
 *                 description: Description of the category
 *                 example: "Courses related to programming and software development."
 *     responses:
 *       200:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category created successfully"
 *                 categoryDetails:
 *                   type: object
 *                   description: Details of the created category
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All Categorys are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route for showing all categories
/**
 * @swagger
 * /api/courseDetails/showAllCategories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "All Categorys are coming"
 *                 allCategory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Programming"
 *                       description:
 *                         type: string
 *                         example: "Courses related to programming and software development."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route for category page details
/**
 * @swagger
 * /api/courseDetails/getCategoryPageDetails:
 *   post:
 *     summary: Retrieve detailed information about a category and related courses
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: ID of the category to fetch details for
 *                 example: "64f2b7c88f1a2b001c3dfabc"
 *     responses:
 *       200:
 *         description: Successfully retrieved category details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     selectedCategory:
 *                       type: object
 *                       description: Details of the selected category
 *                     differentCategory:
 *                       type: object
 *                       description: Details of a different category
 *                     mostSellingCourses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Top 10 most sold courses across all categories
 *       404:
 *         description: Category or courses not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */


// Route for creating a section
/**
 * @swagger
 * /api/courseDetails/createSection:
 *   post:
 *     summary: Create a new section
 *     tags: [Section]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectionName:
 *                 type: string
 *                 description: Name of the section
 *                 example: "Introduction"
 *               courseId:
 *                 type: string
 *                 description: ID of the course to which the section belongs
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *     responses:
 *       200:
 *         description: Section created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Section Created Successfully"
 *                 updateCourseDetails:
 *                   type: object
 *       404:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to create section. Please try again."
 */

// Route for updating a section
/**
 * @swagger
 * /api/courseDetails/updateSection:
 *   put:
 *     summary: Update a section
 *     tags: [Section]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectionName:
 *                 type: string
 *                 description: New name for the section
 *                 example: "Updated Section Name"
 *               sectionId:
 *                 type: string
 *                 description: ID of the section to update
 *                 example: "64f2b7c88f1a2b001c3dfabc"
 *     responses:
 *       200:
 *         description: Section updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Section updated Successfully"
 *       404:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to update section. Please try again."
 */

// Route for deleting a section
/**
 * @swagger
 * /api/courseDetails/deleteSection:
 *   delete:
 *     summary: Delete a section
 *     tags: [Section]
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f2b7c88f1a2b001c3dfabc"
 *         description: ID of the section to delete
 *     responses:
 *       200:
 *         description: Section deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Section delete Successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to delete section. Please try again."
 */



// Route for creating a subsection
/**
 * @swagger
 * /api/courseDetails/createSubsection:
 *   post:
 *     summary: Create a new subsection
 *     tags: [Subsection]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               sectionId:
 *                 type: string
 *                 description: The ID of the section
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *               title:
 *                 type: string
 *                 description: Title of the subsection
 *                 example: "Introduction to JavaScript"
 *               timeDuration:
 *                 type: string
 *                 description: Duration of the video
 *                 example: "10:30"
 *               description:
 *                 type: string
 *                 description: Description of the subsection
 *                 example: "This subsection covers the basics of JavaScript."
 *               videoFiles:
 *                 type: string
 *                 format: binary
 *                 description: Video file to be uploaded
 *     responses:
 *       200:
 *         description: Subsection created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Subsection Created Successfully"
 *                 updateSection:
 *                   type: object
 *       404:
 *         description: Required fields are missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to create Subsection. Please try again."
 */

// Route for updating a subsection
/**
 * @swagger
 * /api/courseDetails/updateSubSection:
 *   put:
 *     summary: Update a subsection
 *     tags: [Subsection]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               sectionId:
 *                 type: string
 *                 description: The ID of the section
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *               subSectionId:
 *                 type: string
 *                 description: The ID of the subsection to update
 *                 example: "64f2b7c88f1a2b001c3dfabc"
 *               title:
 *                 type: string
 *                 description: New title for the subsection
 *                 example: "Updated Title"
 *               description:
 *                 type: string
 *                 description: New description for the subsection
 *                 example: "Updated description."
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: New video file to update
 *     responses:
 *       200:
 *         description: Subsection updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Section updated successfully"
 *                 data:
 *                   type: object
 *       404:
 *         description: Subsection not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "SubSection not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred while updating the section"
 */

// Route for deleting a subsection
/**
 * @swagger
 * /api/courseDetails/deleteSubsection:
 *   delete:
 *     summary: Delete a subsection
 *     tags: [Subsection]
 *     parameters:
 *       - in: path
 *         name: subSectionId
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f2b7c88f1a2b001c3dfabc"
 *         description: The ID of the subsection to delete
 *     responses:
 *       200:
 *         description: Subsection deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Subsection delete Successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to Delete Subsection. Please try again."
 */


// Route for creating a rating and review
/**
 * @swagger
 * /api/courseDetails/createRating:
 *   post:
 *     summary: Create a Rating and Review
 *     tags: [RatingAndReview]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: The rating given by the user
 *                 example: 4.5
 *               review:
 *                 type: string
 *                 description: The review text provided by the user
 *                 example: "Great course with detailed explanations."
 *               courseId:
 *                 type: string
 *                 description: The ID of the course being reviewed
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *     responses:
 *       200:
 *         description: Rating and Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Rating and Review created Successfully"
 *                 ratingReview:
 *                   type: object
 *                   properties:
 *                     rating:
 *                       type: number
 *                     review:
 *                       type: string
 *                     course:
 *                       type: string
 *                     user:
 *                       type: string
 *       403:
 *         description: User has already reviewed the course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Course is already reviewed by the user"
 *       404:
 *         description: User is not enrolled in the course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Student is not enrolled in the course"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route for getting the average rating of a course
/**
 * @swagger
 * /api/courseDetails/getAverageRating:
 *   post:
 *     summary: Get Average Rating for a Course
 *     tags: [RatingAndReview]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *     responses:
 *       200:
 *         description: Average rating fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 averageRating:
 *                   type: number
 *                   example: 4.2
 *                 message:
 *                   type: string
 *                   example: "Average Rating is 0, no ratings given till now"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route for getting all ratings and reviews
/**
 * @swagger
 * /api/courseDetails/getReviews:
 *   get:
 *     summary: Get All Ratings and Reviews
 *     tags: [RatingAndReview]
 *     responses:
 *       200:
 *         description: All ratings and reviews fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "All reviews fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rating:
 *                         type: number
 *                       review:
 *                         type: string
 *                       course:
 *                         type: string
 *                         description: Name of the course
 *                       user:
 *                         type: object
 *                         properties:
 *                           firstName:
 *                             type: string
 *                           lastName:
 *                             type: string
 *                           email:
 *                             type: string
 *                           image:
 *                             type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route for updating course progress
/**
 * @swagger
 * /api/courseDetails/updateCourseProgress:
 *   post:
 *     summary: Update Course Progress
 *     tags: [CourseProgress]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course
 *                 example: 64f2b7c88f1a2b001c3dfe45
 *               subsectionId:
 *                 type: string
 *                 description: The ID of the subsection to mark as completed
 *                 example: 64f2b7e08f1a2b001c3dfe46
 *     responses:
 *       200:
 *         description: Course progress updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Course progress updated
 *       400:
 *         description: Subsection already completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Subsection already completed
 *       404:
 *         description: Course progress or subsection not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid subsection
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */





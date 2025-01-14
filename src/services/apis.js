
const BASE_URL =process.env.REACT_APP_API_URL

console.log("This is env",process.env.REACT_APP_API_URL)

// User route endpoints
export const user = {
    LOGIN_API : BASE_URL + "/auth/login",
    SENDOTP_API : BASE_URL + "/auth/sendOTP",
    SIGNUP_API : BASE_URL + "/auth/signUp",
    RESETPASSWORDTOKEN_API : BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API : BASE_URL + "/auth/resetPassword",
}

// categories route endpoints 
export const categories = {
    CATEGORIES_API : BASE_URL + "/courseDetails/showAllCategories",
    GETCATALOGPAGEDETAILPAGE_API : BASE_URL + "/courseDetails/getCategoryPageDetails"
}

// setting route endpoints
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + "/profiledetails/updateDisplayPicture",
    UPDATE_PROFILE_API : BASE_URL + "/profiledetails/updateProfile",
    CHANGE_PASSWORD_API : BASE_URL + "/auth/changePassword",
    DELETE_PROFILE_API : BASE_URL + "/profiledetails/deleteProfile"
}

// profile route endpoints
export const profileEndpoints = {
    GET_USER_DETAILS_API : BASE_URL + "/profiledetails/getAllUserDetails",
    GET_USER_ENROLLED_COURSES_API : BASE_URL + "/profiledetails/getEnrolledCourses", 
    GET_INSTRUCTOR_DATA_API : BASE_URL + "/profiledetails/instructorDashboard",
}


// STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API : BASE_URL + "/paymentDetails/capturePayment",
    COURSE_VERIFY_API : BASE_URL + "/paymentDetails/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + "/paymentDetails/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/courseDetails/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/courseDetails/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/courseDetails/editCourse",
    CREATE_COURSE_API: BASE_URL + "/courseDetails/createCourse",
    CREATE_SECTION_API: BASE_URL + "/courseDetails/createSection",
    CREATE_SUBSECTION_API: BASE_URL + "/courseDetails/createSubsection",
    UPDATE_SECTION_API: BASE_URL + "/courseDetails/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/courseDetails/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/courseDetails/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/courseDetails/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/courseDetails/deleteSubsection",
    DELETE_COURSE_API: BASE_URL + "/courseDetails/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/courseDetails/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/courseDetails/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/courseDetails/createRating",
  }

//   rating and review Endpoints
export const ratingsEndPoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/courseDetails/getReviews",
}



// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contactus/contact",
}


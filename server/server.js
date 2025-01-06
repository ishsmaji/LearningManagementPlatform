const express = require("express");
const app = express();


const userRoutes = require("./routes/User");
const contactUsRoute = require("./routes/Contact");




// const profileRoutes = require("./routes/Profile");
// const courseRoutes = require("./routes/Course");


const cookieParser = require("cookie-parser");

const cors = require("cors");
const dbConnect = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;


// Database connection

dbConnect();
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

// Cloudinary connection
cloudinaryConnect();

// Routes
app.use("/api/auth", userRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/course", courseRoutes);
app.use("/api/reach", contactUsRoute);




// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running....",
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});

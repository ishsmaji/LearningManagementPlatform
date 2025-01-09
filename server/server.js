const express = require("express");
const basicAuth=require("basic-auth");
const app = express();
const { specs, swaggerUi } = require('./config/swagger');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnect = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const courseRoute =require("./routes/Course");
const userRoutes = require("./routes/User");
const contactRoutes = require("./routes/Contact");
const profileRoute=require("./routes/Profile");
const paymentRoute=require("./routes/Payments");


dotenv.config();
const PORT = process.env.PORT || 4000;
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
cloudinaryConnect();

const authMiddleware = (req, res, next) => {
    const user = basicAuth(req);
  
    const username = process.env.USER_NAME; 
    const password = process.env.USER_PASS; 
    if (user && user.name === username && user.pass === password) {
      return next();
    }
    res.set('WWW-Authenticate', 'Basic realm="Swagger API Docs"');
    res.status(401).send('Authentication required.');
  };

app.use('/api-docs',authMiddleware, swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/auth", userRoutes);
app.use("/api/contactus", contactRoutes);
app.use("/api/profiledetails", profileRoute);
app.use("/api/courseDetails", courseRoute);
app.use("/api/paymentDetails", paymentRoute);



app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running....",
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});

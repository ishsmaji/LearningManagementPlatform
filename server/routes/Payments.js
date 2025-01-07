const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifySignature,
  sendPaymentSuccessEmail
} = require("../controllers/Payments");
const {
  auth,
  isStudent
} = require("../middlewares/auth");
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", auth, isStudent, verifySignature);
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);

module.exports = router;



/**
 * @swagger
 * /api/paymentDetails/capturePayment:
 *   post:
 *     summary: 
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: string
 *                 description: The ID of the course to enroll in.
 *                 example: 64d6f03b9f4e1c23b476b8f1
 *     responses:
 *       200:
 *         description: Payment initiated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 courseName:
 *                   type: string
 *                   example: Full Stack Development
 *                 courseDescription:
 *                   type: string
 *                   example: Learn full stack development with hands-on projects.
 *                 thumbnail:
 *                   type: string
 *                   example: https://example.com/thumbnail.jpg
 *                 orderId:
 *                   type: string
 *                   example: order_9A33XWu170gUtm
 *                 currency:
 *                   type: string
 *                   example: INR
 *                 amount:
 *                   type: number
 *                   example: 50000
 *       500:
 *         description: Error during payment initiation.
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
 *                   example: Could not initiate order.
 */

/**
 * @swagger
 * /api/paymentDetails/verifySignature:
 *   post:
 *     summary: 
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payload:
 *                 type: object
 *                 description: The payload from Razorpay webhook.
 *                 example:
 *                   payment:
 *                     entity:
 *                       notes:
 *                         courseId: 64d6f03b9f4e1c23b476b8f1
 *                         userId: 64d6f03b9f4e1c23b476b8f2
 *     responses:
 *       200:
 *         description: Signature verified and course added successfully.
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
 *                   example: Signature Verified and Course Added
 *       400:
 *         description: Invalid request or signature mismatch.
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
 *                   example: Invalid Request
 *       500:
 *         description: Error during signature verification.
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
 *                   example: Internal server error.
 */

/**
 * @swagger
 * /api/paymentDetails/sendPaymentSuccessEmail:
 *   post:
 *     summary:
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: The Razorpay order ID.
 *                 example: order_9A33XWu170gUtm
 *               paymentId:
 *                 type: string
 *                 description: The Razorpay payment ID.
 *                 example: pay_29QQoUBi66xm2f
 *               amount:
 *                 type: number
 *                 description: The payment amount in paise.
 *                 example: 50000
 *     responses:
 *       200:
 *         description: Payment success email sent successfully.
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
 *                   example: Email sent successfully
 *       400:
 *         description: Missing or invalid details.
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
 *                   example: Please provide all the details
 *       500:
 *         description: Error during email sending.
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
 *                   example: Could not send email
 */


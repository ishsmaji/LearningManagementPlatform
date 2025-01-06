const express = require("express")
const router = express.Router()
const {contactUsController}  = require("../controllers/ContactUs")

router.post("/contact", contactUsController)

module.exports = router

/**
 * @swagger
 * /api/contactus/contact:
 *   post:
 *     summary: Send contact form details to the server
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: user@gmail.com
 *               firstname:
 *                 type: string
 *                 description: The first name of the user
 *                 example: John
 *               lastname:
 *                 type: string
 *                 description: The last name of the user
 *                 example: Doe
 *               message:
 *                 type: string
 *                 description: The message from the user
 *                 example: I would like to know more about your services.
 *               phoneNo:
 *                 type: string
 *                 description: The phone number of the user
 *                 example: 1234567890
 *               countrycode:
 *                 type: string
 *                 description: The country code for the phone number
 *                 example: +1
 *     responses:
 *       200:
 *         description: Email sent successfully
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
 *       500:
 *         description: Error while sending email
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
 *                   example: Something went wrong...
 */

exports.resetPasswordEmail = (firstName, url) => {
    return `<!DOCTYPE html>
      <html>

      <head>
          <meta charset="UTF-8">
          <title>Reset Password</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }

              img{
                  height: 80px;
                  width: 80px;
              }

              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }

              .logo {
                  max-width: 200px;
                  margin-bottom: 20px;
              }

              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }

              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }

              .cta {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #FFD60A;
                  color: #000000;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }

              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }

              .highlight {
                  font-weight: bold;
              }
          </style>

      </head>

      <body>
          <div class="container">
              <img src="https://res.cloudinary.com/decy8488i/image/upload/v1736176399/test/wsicp0gmaauflyh8f9pl.png" 
                   alt="StudyNotion Logo"/>
              <div class="message">Reset Your Password</div>
              <div class="body">
                  <p>Dear ${firstName},</p>
                  <p>We received a request to reset your password. You can reset it by clicking the button below:</p>
                  <a href="${url}" class="cta">Reset Password</a>
                  <p>If you didn’t request a password reset, please ignore this email or contact support if you have questions.</p>
              </div>
              <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                      href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
          </div>
      </body>

      </html>`
}

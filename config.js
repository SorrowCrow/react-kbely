const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    mongoUri: process.env.MONGO_URI,
    PORT: process.env.PORT || 3001,
    sendgrid: process.env.SENDGRID_API_KEY,
    captcha: process.env.CAPTCHA_SECRET,
};

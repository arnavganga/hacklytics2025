require("dotenv").config();

// console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("DB_PORT:", process.env.DB_PORT);

module.exports = {
  // Gemini API Configuration
  GEMINI_API_KEY: process.env.GEMINI_API_KEY, // Sensitive information should come from .env
  GEMINI_API_URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

  // Database Configuration
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_NAME: process.env.DB_NAME || "healthcareDB",
  DB_PORT: process.env.DB_PORT || 3306,
};

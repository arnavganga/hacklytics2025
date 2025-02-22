require("dotenv").config();

module.exports = {
  // Gemini API Configuration
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_API_URL:
    "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",

  // Database Configuration
  DB_HOST: process.env.DB_HOST || "localhost", // Default value can be set
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "password", // Sensitive information should come from .env
  DB_NAME: process.env.DB_NAME || "healthcareDB",
  DB_PORT: process.env.DB_PORT || 3306, // Default MySQL port, adjust if using other DB
};

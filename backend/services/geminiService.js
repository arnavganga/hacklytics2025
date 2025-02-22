const axios = require("axios");
const { GEMINI_API_KEY, GEMINI_API_URL } = require("../config/config");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getAIResponse(patientMessage, chatHistory) {
  console.log(GEMINI_API_URL)
  console.log(GEMINI_API_KEY)
  const prompt = `
  You are an AI nurse conducting patient intake.
  Your goal is to collect structured medical information before the doctor consultation.
  Engage in a conversation, asking relevant follow-up questions dynamically.

  Patient: ${patientMessage}

  Based on this, respond in structured JSON format:
  {
      "followUpQuestion": "Next question to ask the patient",
      "symptoms": ["List of symptoms identified"],
      "severityLevel": "Mild/Moderate/Severe",
      "medicalHistoryConsiderations": ["Relevant conditions based on patient response"]
  }

  Keep your responses friendly and professional.
  Chat history: ${JSON.stringify(chatHistory)}
  `;

  try {
    console.log("Calling Gemini API...");
    console.log(GEMINI_API_URL)
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    console.log("Gemini API Response:", response.data);

    let aiResponse = response.data.candidates[0]?.content?.parts[0]?.text || "";
    // console.log("AI Response:", aiResponse);

    aiResponse = aiResponse.replace(/```json|```/g, "").trim();
    // console.log("AI Response:", aiResponse);

    return JSON.parse(aiResponse);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { error: "Failed to process request" };
  }
}

module.exports = { getAIResponse };

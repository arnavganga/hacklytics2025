const axios = require("axios");
const { GEMINI_API_KEY, GEMINI_API_URL } = require("../config/config");

async function getAIResponse(patientMessage, chatHistory) {
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
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text;
    return JSON.parse(aiResponse);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { error: "Failed to process request" };
  }
}

module.exports = { getAIResponse };

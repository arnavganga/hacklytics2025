const axios = require("axios");
const { GEMINI_API_KEY, GEMINI_API_URL } = require("../config/config");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getAIResponse(patientMessage, chatHistory) {
  const prompt = `
  You are an AI nurse conducting patient intake.
  Your goal is to collect structured medical information before the online, virtual doctor consultation.
  Engage in a conversation, asking relevant follow-up questions dynamically.
  
  Patient: ${patientMessage}
  
  Once you have gathered enough information, return the following JSON format:
  {
      "followUpQuestion": null,
      "summaryForDoctor": "Final summary of the patient's condition for the doctor.",
      "symptoms": ["List of symptoms identified"],
      "severityLevel": "Mild/Moderate/Severe",
      "medicalHistoryConsiderations": ["Relevant conditions based on patient response"],
      "completed": true/false
  }
  DO NOT assume anything. Only use the information provided by the patient.
  DO NOT return free-text summaries. Always return a valid JSON response.
  If all fields do not have a valid/fully complete response, provide a follow-up question.
  If the patient reports severe pain (or if the [severityLevel] is Severe), in the followUpQuestion, advise them to seek immediate medical attention.
  Once all fields (followUpQuestions, summaryForDoctor, symptoms, severityLevel, medicalHistoryConsiderations) have been fully filled out and not left blank or null, ENSURE to ask the user one last time for any more information. Then set "followUpQuestion": null and set "completed" to true.
  Chat history: ${JSON.stringify(chatHistory)}
  `;
  

  try {
    console.log("Sending request to Gemini API...");

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Gemini API Raw Response:", JSON.stringify(response.data, null, 2));

    const candidates = response.data?.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates found in Gemini response");
    }

    let aiResponse = candidates[0]?.content?.parts?.[0]?.text || "{}";
    aiResponse = aiResponse.replace(/```json|```/g, "").trim();

    console.log("Cleaned AI Response:", aiResponse);

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (jsonError) {
      console.error("🔥 JSON Parse Error:", jsonError);
      return { error: "Failed to parse AI response" };
    }

    console.log("Parsed AI Response:", parsedResponse);
    console.log("Parsed Follow-Up Question:", parsedResponse.followUpQuestion);
    return parsedResponse || "No follow-up question provided.";
  } catch (error) {
    console.error("🔥 ERROR calling Gemini API:");
    if (error.response) {
      console.error("Status Code:", error.response.status);
      console.error("Response Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Error Message:", error.message);
    }
    return { error: "Failed to process request" };
  }
}

module.exports = { getAIResponse };
const geminiService = require("../services/geminiService");

exports.getAIResponse = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { patientMessage, chatHistory } = req.body;
    const aiResponse = await geminiService.getAIResponse(
      patientMessage,
      chatHistory
    );
    res.json(aiResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to process request" });
  }
};

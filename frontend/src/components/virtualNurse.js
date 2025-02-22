"use client";
import { useState } from "react";
import axios from "axios";

export default function VirtualNurse() {
  const [patientMessage, setPatientMessage] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!patientMessage) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/virtualNurse/",
        { patientMessage, chatHistory: [] }
      );
      setAIResponse(response.data.followUpQuestion);
      console.log("Response:", response.data);
    } catch (error) {
      setAIResponse("Error: Unable to process request.", error);
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto bg-white">
      <h2 className="text-lg font-bold">Virtual Nurse Assistant</h2>
      <textarea
        className="w-full border p-2 my-2"
        rows="3"
        placeholder="Describe your symptoms..."
        value={patientMessage}
        onChange={(e) => setPatientMessage(e.target.value)}
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Processing..." : "Ask Nurse"}
      </button>

      <div className="mt-4 p-2 border bg-gray-100">{aiResponse}</div>
    </div>
  );
}

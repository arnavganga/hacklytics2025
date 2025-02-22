"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";

export default function VirtualNurseChat() {
  const [patientMessage, setPatientMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "nurse", text: "Hello! I'm your AI Nurse. How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [intakeComplete, setIntakeComplete] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!patientMessage.trim() || intakeComplete) return;

    const userMessage = { sender: "user", text: patientMessage };
    setMessages((prev) => [...prev, userMessage]);
    setPatientMessage("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/api/virtualNurse", {
        patientMessage: patientMessage,
        chatHistory: messages.map(({ sender, text }) => ({
          role: sender === "user" ? "user" : "nurse",
          text,
        })),
      });

      console.log("Response:", response.data);
      const aiResponseText = response.data.followUpQuestion || "I'm sorry, I didn't understand that.";

      const aiResponse = { sender: "nurse", text: aiResponseText };

      if (response.data.completed) {
        setIntakeComplete(true);
        aiResponse.text = "Thank you! Your intake is complete. A doctor will review your responses.";
      }

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "nurse", text: "Error: Unable to process request." }]);
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header with Back Button */}
      <div className="flex items-center bg-blue-600 text-white p-4 text-lg font-bold">
        <Link href="./dashboard/patient"> {/* ✅ Link to dashboard */}
            <button className="mr-4 bg-white text-blue-600 px-3 py-1 rounded-md shadow-md hover:bg-gray-200 transition">
            ← Back
            </button>
        </Link>
        
        AI Virtual Nurse
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs p-3 rounded-lg shadow-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box (Disabled when intake is complete) */}
      <div className="bg-white p-4 flex items-center border-t">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder={intakeComplete ? "Intake complete. Please wait for the doctor." : "Type your message..."}
          value={patientMessage}
          onChange={(e) => setPatientMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={intakeComplete}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading || intakeComplete}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
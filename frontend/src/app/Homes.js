import React from "react";
import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-700 to-blue-500 text-white text-center">
      <div className="flex justify-between items-center fixed top-0 w-full h-20 p-4 bg-black backdrop-blur-md shadow-md z-50">
        <div className="text-xl font-bold">Project Name</div>
        <div className="flex gap-4">
          <button className="bg-black text-white h-full py-2 px-4 rounded font-bold hover:bg-gray-800">Log In</button>
          <button className="bg-black text-white h-full py-2 px-4 rounded font-bold hover:bg-gray-800">Sign Up</button>
        </div>
      </div>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mt-5 w-full p-5">Empowering Health, Anytime, Anywhere</h1>
        <p className="text-lg text-gray-300 mt-2 mb-5 pb-5">
          Welcome to our telemedicine platform! Connect with doctors, manage your health, and save time with virtual consultations. It&apos;s healthcare at your fingertips.
        </p>
        <div className="flex justify-center items-center">
          <button className="w-48 h-12 bg-black text-white py-2 px-12 rounded-lg font-bold hover:bg-gray-800 mx-4">Log In</button>
          <button className="w-48 h-12 bg-black text-white py-2 px-12 rounded-lg font-bold hover:bg-gray-800 mx-4">Sign Up</button>
        </div>
        <p className="mt-5 text-sm">Join the <span className="font-bold">future</span> of healthcare!</p>
      </div>
    </div>
  );
}
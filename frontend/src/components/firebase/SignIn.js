"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "./config";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      // console.log({ res });

      if (res && res.user) {
        const response = await fetch(
          `http://localhost:5001/patients/getUser/${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to add patient");
        }
        // console.log(data);

        // Save email and user-type into local storage
        localStorage.setItem("email", email);
        localStorage.setItem("user-type", data[0].user_type);

        console.log(data[0].user_type);

        if (data[0].user_type == "patient") {
          router.push("/dashboard/patient");
        } else if (data[0].user_type == "doctor") {
          router.push("/dashboard/doctor");
        } else {
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full my-10">
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
          Sign In
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-lg font-medium text-gray-700"
              htmlFor="firstName"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              className="block mt-10 text-lg font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 mt-2 mb-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

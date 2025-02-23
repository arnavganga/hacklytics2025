// "use client";

// import React from "react";
// import { useStytch, useStytchSession, useStytchUser } from "@stytch/nextjs";

// /**
//  * The Profile component is shown to a user that is logged in.
//  * 
//  * This component renders the full User and Session object for education. 
//  * 
//  * This component also includes a log out button which is accomplished by making a method call to revoking the existing session.
// */
// const Profile = () => {
//   const stytch = useStytch();
//   // Get the Stytch User object if available
//   const { user } = useStytchUser();
//   // Get the Stytch Session object if available
//   const { session } = useStytchSession();

//   return (
//     <div className="card">
//       <h1>Profile</h1>
//       <h2>User object</h2>
//       <pre className="code-block">
//         <code>{JSON.stringify(user, null, 2)}</code>
//       </pre>

//       <h2>Session object</h2>
//       <pre className="code-block">
//         <code>{JSON.stringify(session, null, 2)}</code>
//       </pre>
//       <p>
//         You are logged in, and a Session has been created. The SDK stores the
//         Session as a token and a JWT in the browser cookies as{" "}
//         <span className="code">stytch_session</span> and{" "}
//         <span className="code">stytch_session_jwt</span> respectively.
//       </p>
//       {/* Revoking the session results in the session being revoked and cleared from browser storage. The user will return to Login.js. */}
//       <button className="primary" onClick={() => stytch.session.revoke()}>
//         Log out
//       </button>
//     </div>
//   );
// };

// export default Profile;
"use client";

import React from "react";
import { useRouter } from "next/navigation"; // For navigation

const Profile = () => {
  const router = useRouter();

  // Handle role selection and navigate accordingly
  const handleRoleSelection = (selectedRole) => {
      if (selectedRole === "doctor") {
        localStorage.setItem('user_type', selectedRole)
      router.push("/doctorQuestions"); // Route to doctorQuestions page
    } else if (selectedRole === "patient") {
      router.push("/signup/patient"); // Route to patient signup page
    } else {
      console.error("Invalid role selected"); // Safety check
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
          Welcome, new user!
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Please select your role to get started.
        </p>
        <div className="flex justify-center space-x-6">
          <button
            className="bg-purple-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
            onClick={() => handleRoleSelection("patient")}
          >
            Patient
          </button>
          <button
            className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
            onClick={() => handleRoleSelection("doctor")}
          >
            Doctor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

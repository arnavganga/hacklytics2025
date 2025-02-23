"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DoctorQuestions from "../../components/doctorQuestions";

export default function ProfilePage() {
  const router = useRouter();
  
  // We don't need to check for the user or redirect since this is the first-time role selection page
  useEffect(() => {
    // This will ensure the profile page only shows for new users
    // You may want to add additional logic to handle cases where users have already selected their role
  }, []);

  return <DoctorQuestions/>;
}
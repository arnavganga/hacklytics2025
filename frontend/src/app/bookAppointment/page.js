"use client";
import React, { useState } from "react";
import FindDoctor from "@/components/findDoctor/DoctorSearch";
import Sidebar from "@/components/Sidebar";

export default function DoctorSettingsPage() {
  return (
    <div className="flex">
      {/* Main content area */}
      <div className={`flex-1 p-10 transition-all duration-300 justify-center`}>

      <FindDoctor />
      </div>

      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

    </div>
  );
}

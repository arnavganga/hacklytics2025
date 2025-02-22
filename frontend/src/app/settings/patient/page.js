import PatientSettings from "../../../components/settings/PatientSettings";
import React from "react";
import Sidebar from "@/components/Sidebar";

export default function PatientSettingsPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className={`flex-1 p-10 transition-all duration-300 justify-center`}>
        <PatientSettings />
      </div>
    </div>
  );
}

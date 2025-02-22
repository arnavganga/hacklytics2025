import React from "react";
import Sidebar from "@/components/Sidebar";
import CalendarComponent from "@/components/Calendar";
import VirtualNurse from "@/components/virtualNurse";

export default function PatientDashboardPage() {
    return (
      <div className="min-h-full bg-gradient-to-r from-purple-700 to-blue-500">
        <div className="p-5">
          <h1 className="font-sans flex justify-center p-5 text-4xl">
            Welcome patient_name!
          </h1>
        </div>
        <div className="flex flex-row justify-between">
          <div className="pl-5 max-w-2xl h-[80vh] min-h-[600px] overflow-auto z-0">
            <CalendarComponent />
          </div>
          <div className="w-1/5 min-w-[200px] right-0">
            <Sidebar />
          </div>
        </div>
      </div>
    );
}

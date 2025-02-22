import React from "react";
import Sidebar from "@/components/Sidebar";

export default function DoctorDashboardPage() {
    return (
        <div className="flex">
            <div className="flex-1 p-6">
            </div>
            <div className="w-1/5 min-w-[200px] right-0">
                <Sidebar />
            </div>
        </div>
    );
}

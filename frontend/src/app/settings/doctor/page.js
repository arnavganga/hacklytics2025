import SettingsLayout from "../../../components/settings/SettingsLayout";
import DoctorSettings from "../../../components/settings/DoctorSettings";
import React from "react";
import Sidebar from "@/components/Sidebar";

export default function DoctorSettingsPage() {
    return (
        <div className="flex">
            <div className="flex-1 p-6">
                <DoctorSettings />
            </div>
            <div className="w-1/5 min-w-[200px] right-0">
                <Sidebar />
            </div>
        </div>
    );
}

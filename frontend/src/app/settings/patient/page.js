import SettingsLayout from "../../../components/settings/SettingsLayout";
import PatientSettings from "../../../components/settings/PatientSettings";
import React from "react";
import Sidebar from "@/components/Sidebar";

export default function PatientSettingsPage() {
    return (
        <div className="flex">
            <div className="flex-1 p-6">
                <PatientSettings />
            </div>
            <div className="w-1/5 min-w-[200px] right-0">
                <Sidebar />
            </div>
        </div>
    );
}

"use client";
import React, { useState } from "react";
import TransactionHistory from "@/components/transactions/transactions";
import Sidebar from "@/components/Sidebar";

export default function DoctorSettingsPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className={`flex-1 p-10 transition-all duration-300 justify-center`}>
        <TransactionHistory />
      </div>
    </div>
  );
}

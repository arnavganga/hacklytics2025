'use client';
import React from "react";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AppointmentCard from "@/components/card-components/doctorAppointmentCard";

export default function PatientDashboardPage() {
  const router = useRouter();
  
  const appointments = {
    upcoming: [
      {
        doctorName: "Dr. Sarah Johnson",
        specialty: "General Physician",
        date: "Feb 24, 2025",
        time: "10:00 AM",
        isVirtual: true,
        stat: "Upcoming",
      },
      {
        doctorName: "Dr. Michael Chen",
        specialty: "Cardiologist",
        date: "Feb 28, 2025",
        time: "2:30 PM",
        isVirtual: false,
        stat: "Scheduled",
      },
      {
        doctorName: "Dr. Lisa Brown",
        specialty: "Neurologist",
        date: "Mar 3, 2025",
        time: "1:15 PM",
        isVirtual: true,
        stat: "Scheduled",
      },
    ],
    past: [
      {
        doctorName: "Dr. Emily Wilson",
        specialty: "Dermatologist",
        date: "Feb 15, 2025",
        time: "3:00 PM",
        isVirtual: true,
        stat: "Completed",
      },
      {
        doctorName: "Dr. James Martinez",
        specialty: "Orthopedist",
        date: "Feb 10, 2025",
        time: "11:30 AM",
        isVirtual: false,
        stat: "Completed",
      },
    ],
  };

  const handleChatClick = () => {
    router.push('/nurse-ai');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="pl-5 pt-5 flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Upcoming Appointments
            </h2>
            <div className="flex space-x-4 overflow auto pb-4">
              {appointments.upcoming.map((appointment, index) => (
                <AppointmentCard key={index} {...appointment} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Past Appointments
            </h2>
            <div className="flex space-x-4 overflow auto pb-4">
              {appointments.past.map((appointment, index) => (
                <AppointmentCard key={index} {...appointment} />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <button
          onClick={handleChatClick}
          className="fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Chat with AI Nurse"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
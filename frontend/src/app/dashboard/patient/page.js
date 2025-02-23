import React from "react";
import Sidebar from "@/components/Sidebar";
import CalendarComponent from "@/components/Calendar";
import VirtualNurse from "@/components/virtualNurse";
import AppointmentCard from "@/components/card-components/doctorAppointmentCard";

export default function PatientDashboardPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Upcoming Appointments
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {appointments.upcoming.map((appointment, index) => (
              <AppointmentCard key={index} {...appointment} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Past Appointments
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {appointments.past.map((appointment, index) => (
              <AppointmentCard key={index} {...appointment} />
            ))}
          </div>

          <div className="w-1/5 min-w-[200px] right-0">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

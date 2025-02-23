import React from "react";
import Sidebar from "@/components/Sidebar";
import PatientAppointmentCard from "@/components/card-components/patientAppointmentsCard";

export default function DoctorDashboardPage() {
  const appointments = {
    upcoming: [
      {
        patient: {
          name: "Sarah Williams",
          age: 34,
          gender: "Female",
          phone: "+1 (555) 123-4567",
        },
        date: "Feb 24, 2025",
        time: "10:00 AM",
        status: "Upcoming",
        notes: "Follow-up on prescription medication",
      },
      {
        patient: {
          name: "Michael Brown",
          age: 45,
          gender: "Male",
          phone: "+1 (555) 234-5678",
        },
        date: "Feb 24, 2025",
        time: "11:30 AM",
        status: "Upcoming",
        notes: "Annual check-up",
      },
      {
        patient: {
          name: "Emma Davis",
          age: 28,
          gender: "Female",
          phone: "+1 (555) 345-6789",
        },
        date: "Feb 24, 2025",
        time: "2:00 PM",
        status: "Upcoming",
        notes: "Discussing test results",
      },
    ],
    past: [
      {
        patient: {
          name: "James Wilson",
          age: 52,
          gender: "Male",
          phone: "+1 (555) 456-7890",
        },
        date: "Feb 20, 2025",
        time: "3:00 PM",
        status: "Completed",
        notes: "Patient reported improvement in symptoms",
      },
      {
        patient: {
          name: "Linda Martinez",
          age: 41,
          gender: "Female",
          phone: "+1 (555) 567-8901",
        },
        date: "Feb 19, 2025",
        time: "9:30 AM",
        status: "Completed",
        notes: "Prescribed new medication",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Today's stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">
              Today's Consultations
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">8</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">
              Total Scheduled
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">15</p>
          </div>
        </div>

        {/* Upcoming appointments */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Upcoming Consultations
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {appointments.upcoming.map((appointment, index) => (
              <PatientAppointmentCard key={index} {...appointment} />
            ))}
          </div>
        </div>

        {/* Past appointments */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Past Consultations
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {appointments.past.map((appointment, index) => (
              <PatientAppointmentCard key={index} {...appointment} />
            ))}
          </div>
        </div>

        <div className="w-1/5 min-w-[200px] right-0">
          <Sidebar />
        </div>
      </div>
    </div>

    // <div className="flex">
    //     <div className="flex-1 p-6">
    //     </div>
    //     <div className="w-1/5 min-w-[200px] right-0">
    //         <Sidebar />
    //     </div>
    // </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import PatientAppointmentCard from "@/components/card-components/patientAppointmentsCard";

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState({ upcoming: [], past: [] });
  const doctorEmail = localStorage.getItem("email") || "none";

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch(
          `/api/doctors/getAppointmentsForDoctor/${doctorEmail}`
        );
        const data = await response.json();

        const today = new Date();

        const categorizedAppointments = data.reduce(
          (acc, appointment) => {
            const appointmentDate = new Date(appointment.DateBooked);
            const status = appointmentDate >= today ? "Upcoming" : "Completed";

            const formattedAppointment = {
              patient: { name: appointment.PatientEmail }, // Adjust to fetch actual patient data
              date: appointmentDate.toLocaleDateString(),
              time: appointmentDate.toLocaleTimeString(),
              status,
              notes: "General Consultation", // Placeholder, replace with actual notes
            };

            if (status === "Upcoming") {
              acc.upcoming.push(formattedAppointment);
            } else {
              acc.past.push(formattedAppointment);
            }

            return acc;
          },
          { upcoming: [], past: [] }
        );

        setAppointments(categorizedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }

    fetchAppointments();
  }, [doctorEmail]);

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
  );
}

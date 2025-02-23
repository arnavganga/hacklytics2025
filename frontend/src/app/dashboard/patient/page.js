"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import AppointmentCard from "@/components/card-components/doctorAppointmentCard";

export default function PatientDashboardPage() {
  const [appointments, setAppointments] = useState({ upcoming: [], past: [] });
  const patientEmail = localStorage.getItem("email") || "none";

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch(
          `/api/patients/getAppointmentsForPatient/${patientEmail}`
        );

        console.log("API Response Status:", response.status);
        console.log(
          "API Response Headers:",
          response.headers.get("content-type")
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
  }, [patientEmail]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-500 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Upcoming Appointments
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {appointments.upcoming.map((appointment, index) => (
              <AppointmentCard key={index} {...appointment} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
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

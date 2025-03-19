"use client";
import React from "react";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AppointmentCard from "@/components/card-components/doctorAppointmentCard";

export default function PatientDashboardPage() {
  const [appointments, setAppointments] = useState({ upcoming: [], past: [] });
  const patientEmail = localStorage.getItem("email") || "";

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch(
          `http://localhost:5001/patients/getAppointmentsForPatient/jane.smith@example.com`
        );

        console.log("API Response Status:", response.status);
        console.log(
          "API Response Headers:",
          response.headers.get("content-type")
        );
        const data = await response.json();
        console.log(data);

        const results = data[0];

        const today = new Date();

        const categorizedAppointments = results.reduce(
          (acc, appointment) => {
            const appointmentDate = new Date(appointment.DateBooked);
            const status = appointmentDate >= today ? "Upcoming" : "Completed";

            const formattedAppointment = {
              name:
                appointment.DoctorFirstName + " " + appointment.DoctorLastName, // Adjust to fetch actual patient data
              date: appointmentDate.toLocaleDateString(),
              time: appointmentDate.toLocaleTimeString(),
              status,
              specialty: appointment.Specialization,
              link: appointment.link,
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

  const handleChatClick = () => {
    router.push("/nurse-ai");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="pl-5 pt-5 flex-1">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
            <div className="flex space-x-4 overflow auto pb-4">
              {appointments.upcoming.map((appointment, index) => (
                <AppointmentCard key={index} {...appointment} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Past Appointments</h2>
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

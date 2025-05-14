"use client";
import React from "react";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AppointmentCard from "@/components/card-components/doctorAppointmentCard";
import withAuth from "@/components/firebase/authenticate";

function PatientDashboardPage() {
  const [appointments, setAppointments] = useState({ upcoming: [], past: [] });
  const patientEmail = localStorage.getItem("email") || "";

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const email = localStorage.getItem("email");
        const response = await fetch(
          `http://localhost:5001/patients/getAppointmentsForPatient/${email}`
        );

        // console.log("API Response Status:", response.status);
        // console.log(
        //   "API Response Headers:",
        //   response.headers.get("content-type")
        // );
        const data = await response.json();
        // console.log(data);

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Today's stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">
              Upcoming Consultations
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {appointments.upcoming.length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">
              Total Completed Consultations
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {appointments.past.length + appointments.upcoming.length}
            </p>
          </div>
        </div>

        {/* Upcoming appointments */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Upcoming Consultations
          </h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {appointments.upcoming.map((appointment, index) => (
              <AppointmentCard key={index} {...appointment} />
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
              <AppointmentCard key={index} {...appointment} />
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

export default withAuth(PatientDashboardPage, "patient");

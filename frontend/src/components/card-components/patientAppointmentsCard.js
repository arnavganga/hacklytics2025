import React from "react";
import { Calendar, Clock, User, Video, FileText, Phone } from "lucide-react";

export default function PatientAppointmentsCard(props) {
  const statusClasses = {
    Upcoming: "bg-green-100 text-green-600",
    Completed: "bg-gray-100 text-gray-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-80 p-6 border border-gray-200">
      <div className="flex flex-col space-y-4">
        {/* Top row with patient avatar and status */}
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-6 w-6 text-blue-500" />
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              statusClasses[props.status]
            }`}
          >
            {props.status}
          </span>
        </div>

        {/* Patient info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {props.patient.name}
          </h3>
          <p className="text-sm text-gray-500">
            Age: {props.patient.age} • {props.patient.gender}
          </p>
        </div>

        {/* Appointment details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="mr-2 h-5 w-5" />
            {props.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="mr-2 h-5 w-5" />
            {props.time}
          </div>
          <div className="flex items-center text-sm text-green-600 font-medium">
            <Video className="mr-2 h-5 w-5" />
            Virtual Consultation
          </div>
        </div>

        {/* Additional patient details */}
        <div className="pt-3 border-t border-gray-100 space-y-2">
          {props.notes && (
            <div className="flex items-start text-sm text-gray-600">
              <FileText className="mr-2 h-5 w-5 mt-0.5" />
              <span>{props.notes}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-blue-600">
            <Phone className="mr-2 h-5 w-5" />
            {props.patient.phone}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Calendar, Clock, User, Video, MapPin } from "lucide-react";

export default function AppointmentCard(props) {
  const statusClasses = {
    Completed: "bg-gray-100 text-gray-600",
    Upcoming: "bg-green-100 text-green-600",
    Scheduled: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-80 p-6 flex flex-col space-y-4 border border-gray-200">
      <div className="flex iterms-center justify-between">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="h-6 w-6 rounded-full bg-blue-500" />
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusClasses[props.stat]
          }`}
        >
          {props.stat}
        </span>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {props.doctorName}
          </h3>
          <p className="text-sm text-gray-500">{props.specialty}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="mr-2 h-5 w-5" />
            {props.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="mr-2 h-5 w-5" />
            {props.time}
          </div>
          {props.isVirtual ? (
            <div className="flex items-center text-sm text-green-600 font-medium">
              <Video className="mr-2 h-5 w-5" />
              Virtual Consultation
            </div>
          ) : (
            <div className="flex items-center text-sm text-blue-600 font-medium">
              <MapPin className="mr-2 h-5 w-5" />
              In-person Visit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

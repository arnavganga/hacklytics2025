import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star, Phone, Mail, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const DoctorProfileCard = (props) => {
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [open, setOpen] = useState(false);

  const [reviews, setReviews] = useState([]);

  const doctor = props.doctor;

  // Get reviews for a selected doctor
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/patients/getDoctorReviews/${doctor.email}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        setReviews(data[0]);
      } catch (error) {
        console.log("Error fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [doctor.email]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      slots.push({
        time: `${hour}:00`,
        available: Math.random() > 0.3,
      });
    }
    return slots;
  };
  const timeSlots = generateTimeSlots();

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ));
  };

  const handleBookingClick = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-4 shadow-lg rounded-lg">
      <CardHeader className="flex gap-4">
        <Avatar className="w-24 h-24">
          <img
            src={doctor.image}
            alt={doctor.first_name + " " + doctor.last_name}
            className="rounded-full"
          />
        </Avatar>
        <div>
          <CardTitle className="text-2xl mb-2">
            {doctor.first_name + " " + doctor.last_name}
          </CardTitle>
          <p className="text-gray-600">{doctor.specalization}</p>
          <div className="flex items-center gap-2 mt-2">
            {renderStars(doctor.rating)}
            <span className="ml-2 text-sm text-gray-600">
              ({doctor.counter} reviews)
            </span>
          </div>
          <div className="text-gray-600 mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <Phone size={16} /> {doctor.phone}
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} /> {doctor.email}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-600">{doctor.bio}</p>
        </div>

        <Button
          className="w-full mb-6"
          onClick={handleBookingClick}
          type="button"
        >
          Book Appointment
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-2xl p-4 max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-lg">
                Schedule Appointment
              </DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="w-full rounded-md bg-white shadow-sm scale-90 origin-top"
                />
              </div>
              <div>
                <h4 className="font-medium mb-2">Available Time Slots</h4>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={slot.available ? "outline" : "ghost"}
                      disabled={!slot.available}
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`h-8 text-sm ${
                        selectedTimeSlot === slot.time ? "border-primary" : ""
                      } ${slot.available ? "" : "opacity-50"}`}
                      type="button"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button
                disabled={!selectedTimeSlot}
                onClick={() => {
                  console.log(
                    `Booking appointment for ${date.toDateString()} at ${selectedTimeSlot}`
                  );
                  setOpen(false);
                }}
                type="button"
                className="w-full sm:w-auto"
              >
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div>
          <h3 className="text-lg font-semibold mb-4">Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.ReviewID} className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{renderStars(review.Rating)}</div>
                  <span className="font-medium">
                    {review.PatientFirstName + " " + review.PatientLastName}
                  </span>
                </div>
                <p className="text-gray-600 text-xs">
                  {new Date(review.CreatedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p className="text-gray-700">{review.Feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorProfileCard;

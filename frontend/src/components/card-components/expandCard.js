import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star, MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const DoctorProfileCard = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [open, setOpen] = useState(false);

  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "/api/placeholder/150/150",
    rating: 4.8,
    reviewCount: 124,
    location: "123 Medical Center Dr, Boston MA",
    phone: "(555) 123-4567",
    email: "dr.johnson@medical.com",
    about:
      "Specialized in cardiovascular health with 15+ years of experience. Board certified with expertise in preventive cardiology and heart disease management.",
    reviews: [
      { id: 1, author: "John D.", rating: 5, text: "Excellent doctor, very thorough and caring." },
      { id: 2, author: "Mary S.", rating: 4, text: "Professional and knowledgeable. Highly recommend." },
    ],
  };

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
        <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
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
          <img src={doctor.image} alt={doctor.name} className="rounded-full" />
        </Avatar>
        <div>
          <CardTitle className="text-2xl mb-2">{doctor.name}</CardTitle>
          <p className="text-gray-600">{doctor.specialty}</p>
          <div className="flex items-center gap-2 mt-2">
            {renderStars(doctor.rating)}
            <span className="ml-2 text-sm text-gray-600">({doctor.reviewCount} reviews)</span>
          </div>
          <div className="text-gray-600 mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <MapPin size={16} /> {doctor.location}
            </div>
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
          <p className="text-gray-600">{doctor.about}</p>
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
              <DialogTitle className="text-lg">Schedule Appointment</DialogTitle>
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
                  console.log(`Booking appointment for ${date.toDateString()} at ${selectedTimeSlot}`);
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
            {doctor.reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="font-medium">{review.author}</span>
                </div>
                <p className="text-gray-600">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorProfileCard;
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Star, MapPin, Phone, Mail, AccessTime } from "@mui/icons-material";
import { Calendar } from "@mui/lab";

const ExpandCard = ({ props }) => {
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Sample doctor data
  const doctor = {
    id: 1,
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
      {
        id: 1,
        author: "John D.",
        rating: 5,
        text: "Excellent doctor, very thorough and caring.",
      },
      {
        id: 2,
        author: "Mary S.",
        rating: 4,
        text: "Professional and knowledgeable. Highly recommend.",
      },
    ],
  };

  // Generate time slots for the selected date
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        slots.push({
          time: `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`,
          available: Math.random() > 0.3, // Randomly set availability
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Helper function to render stars
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          style={{
            width: "20px",
            height: "20px",
            color: i < Math.floor(rating) ? "gold" : "gray",
          }}
        />
      ));
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 800, margin: "auto" }}>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <Avatar sx={{ width: 96, height: 96 }}>
            <img
              src={doctor.image}
              alt={doctor.name}
              style={{ borderRadius: "50%" }}
            />
          </Avatar>
          <div style={{ flex: 1 }}>
            <CardTitle variant="h5">{doctor.name}</CardTitle>
            <p style={{ color: "#666", marginBottom: "8px" }}>
              {doctor.specialty}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              {renderStars(doctor.rating)}
              <span style={{ fontSize: "0.875rem", color: "#666" }}>
                ({doctor.reviewCount} reviews)
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "0.875rem",
                color: "#666",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <MapPin style={{ fontSize: "16px" }} />
                {doctor.location}
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Phone style={{ fontSize: "16px" }} />
                {doctor.phone}
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Mail style={{ fontSize: "16px" }} />
                {doctor.email}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            About
          </h3>
          <p style={{ color: "#666" }}>{doctor.about}</p>
        </div>

        <Dialog open={false} onClose={() => {}}>
          <DialogContent>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <h4 style={{ fontWeight: "500" }}>Available Time Slots</h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "16px",
                  }}
                >
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={slot.available ? "outlined" : "text"}
                      disabled={!slot.available}
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      sx={{
                        border:
                          selectedTimeSlot === slot.time
                            ? "2px solid #1976d2"
                            : "",
                        opacity: slot.available ? 1 : 0.5,
                      }}
                    >
                      <AccessTime style={{ marginRight: "8px" }} />
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <DialogActions>
              <Button
                onClick={() => {
                  console.log(
                    `Booking appointment for ${date.toDateString()} at ${selectedTimeSlot}`
                  );
                }}
                disabled={!selectedTimeSlot}
              >
                Confirm Booking
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>

        <div>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Reviews
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {doctor.reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    {renderStars(review.rating)}
                  </div>
                  <span style={{ fontWeight: "500" }}>{review.author}</span>
                </div>
                <p style={{ color: "#666" }}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpandCard;

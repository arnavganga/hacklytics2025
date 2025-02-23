"use client";
import React, { useState } from "react";
import { Search, Star } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Button,
  TextField,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// Import the ExpandCard component
import ExpandCard from "@/components/card-components/expandCard";

const DoctorSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Track the selected doctor
  const [open, setOpen] = useState(false); // Control the dialog's visibility

  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      image: "/api/placeholder/150/150",
      rating: 4.8,
      reviewCount: 124,
      availability: "Next available: Today",
      location: "Boston, MA",
      experience: "15+ years",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Pediatrician",
      image: "/api/placeholder/150/150",
      rating: 4.9,
      reviewCount: 89,
      availability: "Next available: Tomorrow",
      location: "Boston, MA",
      experience: "12 years",
    },
    {
      id: 3,
      name: "Dr. Emily Martinez",
      specialty: "Dermatologist",
      image: "/api/placeholder/150/150",
      rating: 4.7,
      reviewCount: 156,
      availability: "Next available: Today",
      location: "Cambridge, MA",
      experience: "8 years",
    },
  ];

  // Get unique specialties for filter
  const specialties = [
    "all",
    ...new Set(doctors.map((doctor) => doctor.specialty)),
  ];

  // Filter doctors based on search query and specialty
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

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

  // Handle opening the dialog
  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor); // Set the selected doctor
    setOpen(true); // Open the dialog
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpen(false); // Close the dialog
    setSelectedDoctor(null); // Clear selected doctor
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-6">Find a Doctor</h1>
        <div className="flex gap-4 mb-6">
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search by name, specialty, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search style={{ color: "#ccc" }} />,
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <Button
              key={specialty}
              variant={
                selectedSpecialty === specialty ? "contained" : "outlined"
              }
              onClick={() => setSelectedSpecialty(specialty)}
              className="capitalize"
            >
              {specialty}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick(doctor)} // Open dialog on click
          >
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="rounded-full"
                  />
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 my-2">
                    {renderStars(doctor.rating)}
                    <span className="text-sm text-gray-600 ml-2">
                      ({doctor.reviewCount})
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{doctor.location}</p>
                    <p>{doctor.experience}</p>
                    <p className="text-green-600">{doctor.availability}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">
            No doctors found matching your search criteria.
          </p>
        </div>
      )}

      {/* Dialog for ExpandCard */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Doctor Details</span>
            <IconButton onClick={handleCloseDialog} edge="end">
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          {selectedDoctor && <ExpandCard doctor={selectedDoctor} />}{" "}
          {/* Display the selected doctor's details */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorSearch;

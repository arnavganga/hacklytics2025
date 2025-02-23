import React, { useState } from "react";
import { Search, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ExpandCard from "@/components/card-components/expandCard";

const DoctorSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [open, setOpen] = useState(false);

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

  const specialties = ["all", ...new Set(doctors.map((doctor) => doctor.specialty))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) 
              ? "text-yellow-400 fill-yellow-400" 
              : "text-gray-200 fill-gray-200"
          }`}
        />
      ));
  };

  const handleCardClick = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-6">Find a Doctor</h1>
        <div className="relative w-full mb-6">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, specialty, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <Button
              key={specialty}
              variant={selectedSpecialty === specialty ? "default" : "outline"}
              onClick={() => setSelectedSpecialty(specialty)}
              className="capitalize"
            >
              {specialty}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card 
            key={doctor.id} 
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => handleCardClick(doctor)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-20 h-20 flex-shrink-0">
                  <img src={doctor.image} alt={doctor.name} className="rounded-full" />
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                    <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(doctor.rating)}
                    <span className="text-sm text-gray-600 ml-2">({doctor.reviewCount})</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{doctor.location}</p>
                    <p className="text-sm text-gray-600">{doctor.experience}</p>
                    <p className="text-sm text-green-600 font-medium">{doctor.availability}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">No doctors found matching your search criteria.</p>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {selectedDoctor ? `${selectedDoctor.name}'s Profile` : 'Doctor Profile'}
            </DialogTitle>
          </DialogHeader>
          {selectedDoctor && <ExpandCard doctor={selectedDoctor} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorSearch;
import React, { use, useEffect, useState } from "react";
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
import withAuth from "../firebase/authenticate";

function DoctorSearch() {
  // Use state to store the variables and change them when needed
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const [doctors, setDoctors] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch doctors from the database through api
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/patients/getAllDoctors"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        setDoctors(data[0]);
      } catch (error) {
        console.log("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // To filter data by specialization
  const specialty = new Set(doctors.map((doctor) => doctor.specialization));
  const specialties = ["all", ...specialty];

  // Filters the data based on the change in input from the search query
  useEffect(() => {
    const results = doctors.filter((doctor) => {
      const matchSearch =
        doctor.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedSpecialty === "all") {
        return matchSearch;
      } else {
        return matchSearch && doctor.specialization === selectedSpecialty;
      }
    });

    setFilteredDoctors(results);
  }, [searchQuery, doctors, selectedSpecialty]);

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
          {specialties.map((specialty, idx) => (
            <Button
              key={idx}
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
        {filteredDoctors.map((doctor, idx) => (
          <Card
            key={idx}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => handleCardClick(doctor)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-20 h-20 flex-shrink-0">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="rounded-full"
                  />
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {doctor.first_name + " " + doctor.last_name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {doctor.specialization}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(doctor.rating)}
                    <span className="text-gray-600 text-sm ml-2">
                      ({doctor.counter} reviews)
                    </span>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {selectedDoctor
                ? `${
                    selectedDoctor.first_name + " " + selectedDoctor.last_name
                  }'s Profile`
                : "Doctor Profile"}
            </DialogTitle>
          </DialogHeader>
          {selectedDoctor && <ExpandCard doctor={selectedDoctor} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withAuth(DoctorSearch, "patient");

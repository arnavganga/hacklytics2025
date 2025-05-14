"use client";

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

export default function DoctorCalendar() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
  };
  const timeSlots = generateTimeSlots();

  const handleSlotToggle = (time) => {
    const dateStr = selectedDate?.toISOString().split("T")[0];
    const slotKey = `${dateStr}-${time}`;

    setAvailableSlots((prev) =>
      prev.includes(slotKey)
        ? prev.filter((s) => s !== slotKey)
        : [...prev, slotKey]
    );
  };

  const handleSubmit = async () => {
    console.log("Selected Date:", selectedDate);
    const slots = availableSlots.map((entry) => {
      const [date, time] = entry.split("-");
      return { date, time };
    });

    // Fix URL link
    const response = await fetch(
      "http://localhost:5001/patients/bookAppointment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slots }),
      }
    );
    if (response.ok) {
      console.log("Availability has been updated successfully");
    } else {
      console.error("Error updating availability");
    }
  };

  return (
    <>
      <div>
        <Button
          className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
          onClick={() => setOpen(true)}
        >
          Schedule Your Availability
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Select Date and Time Slots</DialogTitle>
          </DialogHeader>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border shadow"
          />

          {selectedDate && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">
                Select 30-minute slots for {selectedDate.toDateString()}
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {generateTimeSlots().map((time) => {
                  const slotKey = `${
                    selectedDate.toISOString().split("T")[0]
                  }-${time}`;
                  const selected = availableSlots.includes(slotKey);
                  return (
                    <Button
                      key={slotKey}
                      variant={selected ? "default" : "outline"}
                      onClick={() => handleSlotToggle(time)}
                    >
                      {time}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button onClick={handleSubmit}>Save Availability</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

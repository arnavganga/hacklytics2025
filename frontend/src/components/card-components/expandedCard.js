'use client';
import Doctor_Card from "@/components/Doctor_Card"
import ReviewsCard from '@/components/ReviewsCard';
import { X } from "lucide-react";


export default function Home() {
  return (
    <> 
    <button
        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
        onClick={() => console.log("Exit clicked")}
      >
        <X className="w-5 h-5" />
      </button>
    <div className="max-w-2xl mx-auto relative">
      <Doctor_Card/>
      <ReviewsCard/>
      </div>
      
    </>
  );
}
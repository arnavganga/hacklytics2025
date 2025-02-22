import React from "react"; 
import { FaUserMd, FaLock, FaClock } from "react-icons/fa";

export default function LandingPage() {

    const Button = ({ children, className }) => {
        return (
          <button className={`${className} py-2 px-6 rounded-lg text-white text-lg font-semibold`}>
            {children}
          </button>
        );
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6a11cb] to-[#2575fc] text-white">
      <main className="container mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl font-bold text-white mb-6 mt-12">Get Treatment Without Leaving Home</h1>
        <p className="text-lg text-gray-300 mb-6">
          Talk to AI, schedule virtual doctor meetings, and store medical data securely with blockchain.
        </p>
        {/* <div className="flex justify-center gap-6 mb-12"> 
          <Button className="bg-[#2575fc] hover:bg-[#0056b3]">Schedule an Appointment</Button>
          <Button className="bg-[#6a11cb] hover:bg-[#4b0d9f]">Talk to AI</Button>
        </div> */}

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard icon={<FaUserMd />} title="Virtual Consultations with Doctors" description="Schedule appointments online, no need to visit the hospital" />
          <FeatureCard icon={<FaClock />} title="Faster & Affordable" description="Save time and money by reducing travel costs." />
          <FeatureCard icon={<FaLock />} title="Secure Blockchain Storage" description="Protect your medical records with top-tier security." />
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-[#4c2b99] rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:bg-[#5a38ad] duration-300">
      <div className="text-[#2575fc] text-3xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
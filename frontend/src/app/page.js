import Image from "next/image";
import LandingPage from "../components/LandingPage.js"
import Navbar from "../components/Navbar.js"
import About from "../components/About.js"
import Homes from "./Homes.js"

export default function Home() {
  return (
    <> 
      <Homes/>
      <LandingPage/>
      <footer className="p-4 bg-black text-center text-gray-400">&copy; 2025 VirtualCare. All rights reserved.</footer>
    </>
  );
}


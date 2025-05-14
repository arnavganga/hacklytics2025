import Image from "next/image";
import LandingPage from "../components/splash-page/LandingPage.js";
import Navbar from "../components/navbar/Navbar.js";
import About from "../components/splash-page/About.js";
import Homes from "../components/splash-page/Homes.js";

export default function Home() {
  return (
    <>
      <Homes />
      <LandingPage />
      <footer className="p-4 bg-black text-center text-gray-400">
        &copy; 2025 SimplyCare. All rights reserved.
      </footer>
    </>
  );
}

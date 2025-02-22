import Link from "next/link";
import Homes from "./Homes";
import LandingPage from "../components/LandingPage";

export default function Home() {
  return (
    <> 
      <Homes/>
      <LandingPage/>
      <footer className="p-4 bg-black text-center text-gray-400">&copy; 2025 VirtualCare. All rights reserved.</footer>
    </>
  );
}

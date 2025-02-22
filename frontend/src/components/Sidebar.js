"use client"; // Ensure this is a client component

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Get current path

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); // Get current route

    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/appointments", label: "Book Appointments" },
        { href: "/transactions", label: "Recent Transactions" },
        { href: "/records", label: "Your Records" },
        { href: "/settings", label: "Settings" },
    ];

    return (
        <div>
            {/* Toggle Button */}
            <button
                className="p-2 text-white bg-blue-900 fixed top-4 right-4 z-50 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "✖" : "☰"}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-screen bg-blue-900 text-white w-64 transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <nav className="p-6">
                    <h2 className="text-lg font-bold mb-4">Your Portal</h2>
                    <ul>
                        {links.map((link) => (
                            <li key={link.href} className="py-2">
                                <Link
                                    href={link.href}
                                    className={`block p-2 rounded ${
                                        pathname === link.href
                                            ? "bg-blue-700"
                                            : "hover:bg-blue-800"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button className="absolute bottom-4 left-6">Logout</button>
                </nav>
            </div>
        </div>
    );
}

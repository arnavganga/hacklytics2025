"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: "/dashboard/patient", label: "Dashboard" },
        { href: "/appointments", label: "Book Appointments" },
        { href: "/transactions", label: "Recent Transactions" },
        { href: "/records", label: "Your Records" },
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
                className={`fixed top-0 right-0 h-screen bg-black bg-opacity-75 text-white w-64 transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <nav className="p-6 flex flex-col justify-between h-full">
                    <div>
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
                    </div>
                    <div className="flex flex-col py-2">
                        <Link
                            href="/settings/patient"
                                className={`block p-2 rounded ${
                                    pathname === "/settings/patient"
                                        ? "bg-blue-700"
                                        : "hover:bg-blue-800"
                                }`}>
                            Settings
                        </Link>
                        <Link
                            href="/settings/patient"
                                className={`block p-2 rounded ${
                                    pathname === "/settings/patient"
                                        ? "bg-blue-700"
                                        : "hover:bg-blue-800"
                                }`}>
                            Logout
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}

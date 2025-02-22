import { NextResponse } from "next/server";

export async function GET() {
    // Sample data (replace with DB fetch logic)
    const events = [
        { id: 1, title: "Doctor Appointment", date: "2025-02-25" },
        { id: 2, title: "Check-up", date: "2025-03-02" }
    ];

    return NextResponse.json(events);
}

import Appointment from "@/lib/models/Appointment";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    await connectToDB();

    const { name, email, appointmentDate, service, status, notes, userId } = await req.json();

    try {
        const createAppointment = new Appointment({
            name,
            email,
            appointmentDate,
            service,
            status,
            notes,
            userId
        });

        const newAppointment = await createAppointment.save();

        return NextResponse.json({ message: "Appointment created successfully", appointment: newAppointment }, { status: 200 });
    } catch (error) {
        console.error("Error creating appointment:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
};

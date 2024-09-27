import Appointment from "@/lib/models/Appointment";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: { appointmentId: string } }) => {
    await connectToDB();
    const { name, email, appointmentDate, service, status, notes, userId } = await req.json();

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            params.appointmentId,
            {
                name,
                email,
                appointmentDate,
                service,
                status,
                notes,
                userId
            },
            { new: true }
        );

        if (!updatedAppointment) {
            return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
        }
        return NextResponse.json(updatedAppointment, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

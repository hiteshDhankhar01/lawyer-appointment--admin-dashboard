import AppointmentForm from "@/components/appointment/AppointmentForm";
import { getAppointmentDetails } from "@/lib/action";

const AppointmentDetails = async ({ params }: { params: { appointmentId: string } }) => {
    const appointmentId = params.appointmentId;
    const appointmentDetails = await getAppointmentDetails(appointmentId);

    const plainObject = {
        _id: appointmentDetails._id.toString(),
        name: appointmentDetails.name,
        email: appointmentDetails.email,
        appointmentDate: appointmentDetails.appointmentDate.toISOString(),
        service: appointmentDetails.service,
        status: appointmentDetails.status,
        notes: appointmentDetails.notes,
        userId: appointmentDetails.userId.toString(),
        phoneNo: appointmentDetails.phoneNo || "", 
        message: appointmentDetails.message || "", 
    };
    

    return (
        <div className="px-10 py-5">
            <p className="text-3xl text-white w-full font-bold border-b-[2px] border-gray-700 mb-8 pb-2">Update Appointment</p>
            <AppointmentForm initialData={plainObject} />
        </div>
    );
};

export default AppointmentDetails;

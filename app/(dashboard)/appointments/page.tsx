import AppointmentTable from '@/components/appointment/AppointmentTable';
import { Button } from '@/components/ui/button';
import { getAllAppointments } from '@/lib/action';
import { Separator } from '@radix-ui/react-separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const appointmnetPage: React.FC = async () => {
    const allCustomers = await getAllAppointments();

    const plainAppointments = allCustomers.map(appointment => ({
        ...appointment.toObject(),
        _id: appointment._id.toString(),
        userId: appointment.userId.toString(),
        appointmentDate: appointment.appointmentDate.toString(),
    }));

    const sortedAppointments = plainAppointments.sort((a, b) => {
        return new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime();
    });

    return (
        <div className='px-10 py-5 flex flex-col'>
            <div className="flex  border-b-[2px] border-gray-700 mb-8 pb-2">
                <p className="text-3xl text-white w-full font-bold ">Appointments</p>
                <Button variant={'secondary'}>
                    <Link href="appointments/new" className='flex gap-1'>
                        <Plus strokeWidth={1.5} />
                        Create Appointment
                    </Link>
                </Button>
            </div>
            <Separator className="bg-gray-800" />
            <AppointmentTable appointmentData={sortedAppointments} />
        </div>
    )
}

export default appointmnetPage;
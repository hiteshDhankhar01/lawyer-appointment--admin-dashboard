"use client"

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
}
    from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';;
import { useRouter } from 'next/navigation';

interface AppointmentTableProps {
    appointmentData: AppointmentType[];
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointmentData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const router = useRouter();

    const filteredData = appointmentData.filter((appointment) =>
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="overflow-x-auto m-4 bg-gray-900 text-white rounded-lg p-6 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-80">
            <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-6 p-3 border rounded-lg w-full bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />
            <Table className="min-w-full text-white rounded-lg shadow-lg">
                <TableHeader className="bg-gray-800 text-gray-300">
                    <TableRow className="hover:bg-gray-850">
                        <TableHead className="px-4 py-3">Name & Email</TableHead>
                        <TableHead className="px-4 py-3">Date</TableHead>
                        <TableHead className="px-4 py-3">Status</TableHead>
                        <TableHead className="px-4 py-3">Service</TableHead>
                        <TableHead className="px-4 py-3">Messsage</TableHead>
                        <TableHead className="px-4 py-3">Notes</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentRows.length > 0 ? (
                        currentRows.map((appointment) => (
                            <TableRow key={appointment._id} onClick={() => router.push(`/appointments/${appointment._id}`)} className="bg-gray-850 hover:bg-gray-800 transition-all duration-300 ease-in-out cursor-pointer">
                                 <TableCell className="px-4 py-2 border-b border-gray-700">
                            <div className="flex flex-col space-y-1">
                                <span>{appointment.name}</span>
                                <span className="text-gray-400">{appointment.email}</span>
                            </div>
                        </TableCell>
                        <TableCell className="px-4 py-2 border-b border-gray-700">
  {new Date(appointment.appointmentDate).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })}
</TableCell>

                                <TableCell className={`px-4 py-2 border-b border-gray-700 ${appointment.status === 'Schedule'
                                    ? 'text-green-400'
                                    : appointment.status === 'Complete'
                                        ? 'text-blue-400'
                                        : appointment.status === 'Pending'
                                            ? 'text-yellow-400'
                                            : 'text-red-400'
                                    }`}
                                >
                                    {appointment.status}
                                </TableCell>
                                <TableCell className="px-4 py-2 border-b border-gray-700">{appointment.service}</TableCell>
                                <TableCell className="px-4 py-2 border-b border-gray-700">{appointment.message}</TableCell>
                                <TableCell className="px-4 py-2 border-b border-gray-700">{appointment.notes}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                className="px-4 py-3 text-center border-b border-gray-700 bg-gray-850"
                                colSpan={6}
                            >
                                No results found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-between mt-6">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg hover:bg-gray-700 hover:border-blue-500 disabled:opacity-50"
                >
                    Previous
                </Button>
                <span className="px-4 py-2 text-gray-400">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-lg bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg hover:bg-gray-700 hover:border-blue-500 disabled:opacity-50"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default AppointmentTable;

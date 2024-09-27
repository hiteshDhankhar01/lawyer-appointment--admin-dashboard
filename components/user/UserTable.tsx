"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface BlogTableProps {
    usersData: UserType[];
}

const UserTable: React.FC<BlogTableProps> = ({ usersData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const filteredData = usersData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
    // shadow-gray-500/50


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
                        <TableHead className="px-4 py-3">Name</TableHead>
                        <TableHead className="px-4 py-3">Email</TableHead>
                        <TableHead className="px-4 py-3">Gender</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentRows.length > 0 ? (
                        currentRows.map((user) => (
                            <TableRow key={user._id} className="bg-gray-850 hover:bg-gray-800 transition-all duration-300 ease-in-out">
                                <TableCell className="px-4 py-3 border-b border-gray-700">{user.name}</TableCell>
                                <TableCell className="px-4 py-3 border-b border-gray-700">{user.email}</TableCell>
                                <TableCell className="px-4 py-3 border-b border-gray-700">{user.gender}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                className="px-4 py-3 text-center border-b border-gray-700 bg-gray-850"
                                colSpan={3}
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

export default UserTable;
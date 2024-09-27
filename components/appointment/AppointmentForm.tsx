"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Loader from '../custom ui/Loader';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const services = [
    "Family Law", "Corporate Law", "Criminal Law", "Personal Injury Law",
    "Employment Law", "Real Estate Law", "Immigration Law", "Intellectual Property Law",
    "Tax Law", "Bankruptcy Law", "Environmental Law", "Wills and Estates", "Commercial Law",
    "Civil Litigation", "Construction Law", "Healthcare Law", "Consumer Protection Law",
    "Human Rights Law", "Education Law", "Entertainment Law", "Sports Law",
    "Insurance Law", "Military Law", "Social Security Law", "Other Law"
];

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    appointmentDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
    service: z.string().min(1, { message: "Service is required" }),
    status: z.string().min(1, { message: "Status is required" }),
    notes: z.string().optional(),
    userId: z.string().min(1, { message: "User ID is required" }),
});

interface AppointmentFormProps {
    initialData?: AppointmentType | null;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [user, setUser] = useState<UserType | null>(null);
    const [results, setResults] = useState<UserType[]>([]);

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            appointmentDate: formatDate(initialData.appointmentDate),
        } : {
            name: "",
            email: "",
            appointmentDate: "",
            service: "",
            status: "",
            notes: "",
            userId: ""
        }
    });


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        console.log("hi")
        try {
            setLoading(true);
            const url = initialData ? `/api/appointment/${initialData._id}` : '/api/appointment';
            const res = await fetch(url, {
                method: initialData ? "PUT" : "POST",
                body: JSON.stringify(value),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (res.ok) {
                console.log(`Appointment ${initialData ? "updated" : "created"} successfully`);
                router.push("/appointments");
            } else {
                console.error("Failed to save the appointment. Please try again.");
            }
        } catch (error) {
            console.error("Error saving appointment:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch search results on input change
    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setQuery(query);

        if (query) {
            try {
                const res = await fetch(`/api/users/?query=${encodeURIComponent(query)}`);
                if (res.ok) {
                    const data = await res.json();
                    setResults(data.users);
                } else {
                    console.error('Failed to fetch search results');
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setResults([]);
        }
    };

    const handleUser = (selectedUser: UserType) => {
        setUser(selectedUser);
        form.setValue('name', selectedUser.name);
        form.setValue('email', selectedUser.email);
        form.setValue('userId', selectedUser._id);
        setQuery('');
        setResults([]);
    };

    return loading ? (
        <Loader />
    ) : (
        <>
            {!initialData && (
                <div className="px-6 pt-2 bg-gray-900 rounded-md relative">
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={query}
                        onChange={handleSearchChange}
                        className="bg-gray-800 text-white w-1/2 rounded-md p-2"
                    />
                    <div className="mt-4 absolute w-full bg-gray-900 shadow-lg rounded-md z-10 ">
                        {results.length > 0 ? (
                            <ul className="space-y-2">
                                {results.map((user) => (
                                    <li
                                        key={user._id}
                                        className="w-fit bg-gray-800 text-white p-4 rounded-md cursor-pointer hover:bg-gray-700 transition-all"
                                        onClick={() => handleUser(user)}
                                    >
                                        <p className="font-medium">
                                            <strong className="mr-2">Name:</strong> {user.name}
                                        </p>
                                        <p className="font-medium">
                                            <strong className="mr-2">Email:</strong> {user.email}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            query.length > 0 && (
                                <p className="text-white text-center py-4">No results found</p>
                            )
                        )}
                    </div>
                </div>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-900 p-6 rounded-md grid grid-cols-1 md:grid-cols-2 gap-4" onKeyPress={handleKeyPress}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl className="bg-gray-800">
                                    <Input type="text" {...field} disabled />
                                </FormControl>
                                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl className="bg-gray-800">
                                    <Input type="email" {...field} disabled />
                                </FormControl>
                                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="appointmentDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Appointment Date and Time</FormLabel>
                                <FormControl className="bg-gray-800">
                                    <Input type="datetime-local" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.appointmentDate?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Service</FormLabel>
                                <Select onValueChange={(value) => form.setValue('service', value)} defaultValue={field.value}>
                                    <FormControl className="bg-gray-800 text-gray-500">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-gray-800 text-gray-500">
                                        {services.map((service, index) => (
                                            <SelectItem key={service} value={service}>
                                                {service}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={(value) => form.setValue('status', value)} defaultValue={field.value}>
                                    <FormControl className="bg-gray-800">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-gray-800 text-gray-500">
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="Schedule">Schedule</SelectItem>
                                        <SelectItem value="Complete">Complete</SelectItem>
                                        <SelectItem value="Cancel">Cancel</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl className="bg-gray-800">
                                    <textarea {...field} className="bg-gray-800 text-white w-full p-2 rounded-md" rows={4} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.notes?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <div className="col-span-2 flex justify-end mt-4">
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">{initialData ? "Update" : "Save"} Appointment</Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default AppointmentForm;
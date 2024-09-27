import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { getAllUsers } from "@/lib/action";
import UserTable from "@/components/user/UserTable";

const User: React.FC = async () => {
    const allCustomers = await getAllUsers();

    const plainCustomers = allCustomers.map(customer => ({
        ...customer.toObject(),
        _id: customer._id.toString(),
    }));

    return (
        <div className="px-10 py-5">
            <p className="text-4xl text-white w-full font-extrabold border-b-[2px] border-gray-700 mb-8">Users</p>
            <Separator className="bg-gray-800" />
            <UserTable usersData={plainCustomers} />
        </div>
    )
}

export default User;
import { connectToDB } from "@/lib/mongoDB";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    await connectToDB()
    const searchTerm = req.nextUrl.searchParams.get('query') || '';
    try {
        const users = await User.find({
            name: { $regex: searchTerm, $options: 'i' },
            eamil: { $regex: searchTerm, $options: 'i' }
        }).limit(10)
        return NextResponse.json({ users: users })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'An error occurred while searching for users' }, { status: 500 });
    }
}
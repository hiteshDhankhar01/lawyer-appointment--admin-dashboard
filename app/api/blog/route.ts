import Blog from "@/lib/models/Blog";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {

    try {
        await connectToDB()
        const { title, excerpt, image, paragraph } = await req.json()

        if (!title || !excerpt || !image || !paragraph) {
            return NextResponse.json("Not enough data to create a blog", { status: 400 })
        }

        const newBlog = await Blog.create({
            title, excerpt, image, paragraph
        })

        await newBlog.save()
        return NextResponse.json({ success: true, data: newBlog }, { status: 200 })
    } catch (error) {
        return  NextResponse.json("Internal Error", { status: 500 })
    }
}
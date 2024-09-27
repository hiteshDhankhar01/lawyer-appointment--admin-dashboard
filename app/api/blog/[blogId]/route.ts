import Blog from "@/lib/models/Blog";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: { blogId: string } }) => {
    await connectToDB();
    const { title, excerpt, image, paragraph } = await req.json();

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            params.blogId,
            {
                title, excerpt, image, paragraph
            },
            { new: true }
        );

        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

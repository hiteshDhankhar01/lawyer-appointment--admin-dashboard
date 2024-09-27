import BlogTable from '@/components/blog/BlogTable';
import { Button } from '@/components/ui/button';
import { getAllBlogs } from '@/lib/action';
import { Separator } from '@radix-ui/react-separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const blogPage: React.FC = async () => {
    const allBlogs = await getAllBlogs();

    const plainBlogs = allBlogs.map(blog => ({
        ...blog.toObject(),
        _id: blog._id.toString(),
        updateAt: blog.updateAt.toString(),
    }));

    const sortedBlogs = plainBlogs.sort((a, b) => {
        return new Date(b.updateAt).getTime() - new Date(a.updateAt).getTime();
    });

    return (
        <div className='px-10 py-5 flex flex-col'>
            <div className="flex  border-b-[2px] border-gray-700 mb-8 pb-2">
                <p className="text-3xl text-white w-full font-bold ">Blogs</p>
                <Button variant={'secondary'}>
                    <Link href="blogs/new" className='flex gap-1'>
                        <Plus strokeWidth={1.5} /> Create Blog
                    </Link>
                </Button>
            </div>
            <Separator className="bg-gray-800" />
            <BlogTable blogsData={sortedBlogs} />
        </div>
    )
}

export default blogPage;


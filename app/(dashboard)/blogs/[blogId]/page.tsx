import BlogForm from "@/components/blog/BlogForm";
import { getBlogDetails } from "@/lib/action";

const BlogDetails = async ({ params }: { params: { blogId: string } }) => {
    const blogId = params.blogId;
    const blogDetails = await getBlogDetails(blogId);

    const plainObject = {
        _id: blogDetails._id.toString(),
        title: blogDetails.title,
        excerpt: blogDetails.excerpt,
        image: blogDetails.image,
        paragraph: blogDetails.paragraph,
    };

    return (
        <div className="px-10 py-5">
            <p className="text-3xl text-white w-full font-bold border-b-[2px] border-gray-700 mb-8 pb-2">Update Blog</p>
            <BlogForm initialData={plainObject} />
        </div>
    );
};

export default BlogDetails;

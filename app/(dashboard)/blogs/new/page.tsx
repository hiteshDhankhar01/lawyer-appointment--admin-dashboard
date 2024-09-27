import BlogForm from "@/components/blog/BlogForm"

const CreateBlog = () => {
    return (
        <div className="px-10 py-5">
            <p className="text-3xl text-white w-full font-bold border-b-[2px] border-gray-700 mb-8 pb-2">Create Blog</p>
            <BlogForm />
        </div>
    )
}

export default CreateBlog;
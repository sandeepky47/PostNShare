import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = ({operation} : {operation : "bulk" | "author"}) => {
    const { loading, blogs } = useBlogs(operation);

    if (loading) {
        return <div>
            { operation == "bulk" && <Appbar /> }
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        { operation == "bulk" && <Appbar /> }
        <div  className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishDateTime={blog.publishDateTime}
                />)}
            </div>
        </div>
    </div>
}
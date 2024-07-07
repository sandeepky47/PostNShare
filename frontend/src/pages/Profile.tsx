import { useLocation } from "react-router-dom";
import { Appbar } from "../components/Appbar"
import { Avatar } from "../components/BlogCard"
import { Blogs } from "./Blogs";

export const Profile = () => {

    const location = useLocation();
    const { name } = location.state || {};

    return <div>
        <Appbar />
        <div className="flex justify-center h-screen">
            <div className="grid grid-cols-12 px-20 w-screen max-w-screen-xl">
                <div className="col-span-9 pt-16">
                    <div className="text-3xl font-bold pb-14 pl-10">
                        {name}
                    </div>
                    {/* {userBlogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishDateTime={blog.publishDateTime}
                />)} */}
                    <Blogs operation="author" />
                </div>
                <div className="col-span-3 border-l border-slate-200 pt-20">
                    <div className="pl-14">
                        <div className="pl-8 flex flex-col justify-center">
                            <Avatar size="big" name={name || "Anonymous"} />
                            {/* blog.author.name */}
                        </div>
                        <div>
                            <div className="text-xl font-md">
                                {name || "Anonymous"}
                                {/* blog.author.name || */}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Java Developer
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
}
import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="px-80 w-full max-w-screen-xl pt-12 bg-lime-200">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on {formatDate(blog.publishDateTime)}
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
               
                {/* <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    </div>
}

export const formatDate = (dateString: string) => {
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    return formattedDate;
};
import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    "content": string;
    "title": string;
    "id": number;
    "publishDateTime": string;
    "author": {
        "name": string
    }
}

export interface User {
    "id": number;
    "name": string;
    "username": string;
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.post);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }

}
export const useBlogs = (operation : string) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${operation}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(operation== "bulk" ? response.data.posts : response.data.userPosts);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}

export const useVerify = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get(`${BACKEND_URL}/api/v1/user/verify`, {
                headers: {
                    Authorization: token
                }
            })
                .then(response => {
                    setIsAuthenticated(response.data.verified);
                })
        }
    }, []);

    return {
        isAuthenticated
    }

}

export const useUserInfo = () => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get(`${BACKEND_URL}/api/v1/user/userinfo`, {
                headers: {
                    Authorization: token
                }
            })
                .then(response => {
                    setUser(response.data.user);
                    setLoading(false);
                })
        }
    }, []);

    return {
        user,
        loading
    }

}

// export const useFetchUserPosts = () => {
//     const [loading, setLoading] = useState(true);
//     const [userBlogs, setUserBlogs] = useState<Blog[]>([]);

//     useEffect(() => {
//         axios.get(`${BACKEND_URL}/api/v1/blog/author`, {
//             headers: {
//                 Authorization: localStorage.getItem("token")
//             }
//         })
//             .then(response => {
//                 setUserBlogs(response.data.userPosts);
//                 setLoading(false);
//             })
//     }, [])

//     return {
//         loading,
//         userBlogs
//     }

// }
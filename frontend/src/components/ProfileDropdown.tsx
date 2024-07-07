import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { UserIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useUserInfo } from "../hooks";

export function ProfileDropdown({username}: {username : string}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const { user, loading} = useUserInfo();

    return <div className=" ml-3 inline-flex items-center justify-center">
        <div>
            <button type="button" onClick={toggleDropdown} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                {/* <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                <Avatar name={username || "Anonymous"} size="big"></Avatar>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 mr-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" >
                    {<Link to={'/profile'} state={{
                        name: user?.name
                    }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" id="user-menu-item-0"> <span className="inline-flex items-center justify-center"><UserIcon className="w-7 h-7 pr-2" />Profile </span></Link>}
                    <Link to={`/`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" id="user-menu-item-1"><span className="inline-flex items-center justify-center"><Cog6ToothIcon className="w-7 h-7 pr-2" />Setting</span></Link>
                    <Link to={`/`} onClick={handleSignout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" id="user-menu-item-2"> <span className="inline-flex items-center justify-center"><ArrowLeftStartOnRectangleIcon className="w-7 h-7 pr-2" />Sign out</span> </Link>
                </div>
            )}
        </div>
    </div>
}


const handleSignout = () => {
    localStorage.removeItem('token');
};
import { Link } from "react-router-dom"

export const AppbarInitial = () => {

    return <div className="border-b flex justify-between px-20 py-4">
        <div className="flex flex-col justify-center cursor-pointer text-2xl font-semibold font-serif">Medium</div>

        <div className="flex justify-between">
            <>
                <Link to={`/signin`}>
                    <a className="flex font-medium text-sm text-center pt-4 pr-4">Sign in</a>
                </Link>
                <Link to={`/signup`}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Get Started</button>
                </Link>
            </>

        </div>
    </div>
}
import { Link } from "react-router-dom";

const ErrorPage = () => {

    return (
        <section className="flex items-center justify-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
            <div className="flex flex-col items-center ">
                <div className="flex flex-col gap-6 max-w-md text-center">
                    <h2 className="font-extrabold text-6xl lg:text-7xl xl:text-9xl text-red-500">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl md:text-3xl dark:text-gray-300">Sorry, we could not find this page.</p>
                    <Link to="/" className="px-8 py-4 text-xl font-semibold rounded bg-[#DC5F00] text-gray-50 hover:text-gray-200">Back to home</Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;
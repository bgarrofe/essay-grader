import React from "react";

export default function Hero() {
    return (
        <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Score your essays</span>{" "}
                <span className="block text-indigo-600 xl:inline">
                    online, fast
                </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                The automated essay grader is an online grading system that
                identifies features related to writing proficiency in essays so
                they can be used for scoring and feedback.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                    <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                        Get started
                    </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                        Learn more
                    </a>
                </div>
            </div>
        </div>
    );
}

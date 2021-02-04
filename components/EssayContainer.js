import React, { useState } from "react";
import PromptContainer from "./PromptContainer";

export default function EssayContainer() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="w-1/3 mt-20 mb-48 px-16 ">
                <div className="text-gray-300 uppercase font-semibold text-sm">
                    NATURAL LANGUAGE PROCESSING
                </div>
                <h2 className="text-white text-5xl font-bold">
                    Data to enrich your{" "}
                    <span className="text-indigo-600">online business</span>
                </h2>
                <h2 className="mt-12 mb-4 text-2xl lg:text-3xl font-bold font-heading text-white">
                    Choose your prompt
                </h2>
                <p className="mb-6  text-gray-300">
                    Choose one of these two prompt and start writing your essay.
                    You can submit your essay as many times as you want.
                </p>
                <ul className="space-y-2">
                    <li
                        className={`py-4 hover:bg-gray-200 hover:text-gray-800 rounded-lg cursor-pointer  ${
                            count == 1 && "bg-gray-100"
                        } `}
                        onClick={() => setCount(1)}
                    >
                        <span className="ml-2 inline-block py-2 px-3 mr-4 text-xs font-semibold bg-blue-600 text-white rounded">
                            1
                        </span>
                        <span
                            className={`${
                                count == 1 ? "text-gray-900" : "text-gray-300"
                            }`}
                        >
                            Effects Computers Have on People
                        </span>
                    </li>
                    <li
                        className={`py-4 hover:bg-gray-200 rounded-lg cursor-pointer ${
                            count == 2 && "bg-gray-100"
                        }`}
                        onClick={() => setCount(2)}
                    >
                        <span className="ml-2 inline-block py-2 px-3 mr-4 text-xs font-semibold bg-blue-600 text-white rounded">
                            2
                        </span>
                        <span
                            className={`${
                                count == 2 ? "text-gray-900" : "text-gray-300"
                            }`}
                        >
                            Censorship in the Libraries
                        </span>
                    </li>
                </ul>
            </div>
            <div className="w-2/3">
                {count !== 0 && (
                    <div className="m-4 bg-white rounded-lg px-8 py-4">
                        <PromptContainer count={count} />
                    </div>
                )}

                {/* {count !== 0 && <PromptContainer count={count} />} */}
            </div>
        </>
    );
}

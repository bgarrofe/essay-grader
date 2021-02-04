import React, { useState } from "react";
import Prompt from "./Prompt";
import Modal from "./Modal";

const PromptContainer = ({ count }) => {
    const [chars, setWords] = useState(0);
    const [text, setText] = useState("");
    const [modal, setModal] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [score, setScore] = useState(0);

    const textAreaInput = React.createRef();

    const handleChange = (e) => {
        setText(e.target.value);
        setWords(e.target.value.split(" ").length - 1);
    };

    const closeModal = () => {
        setLoading(true);
        setModal(false);
    };

    const handleSubmit = () => {
        setModal(true);
        const encodedString = btoa(text);
        fetch(`/api/score`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ text: encodedString }),
        })
            .then((res) => res.json())
            .then((data) => {
                setScore(data.score);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const handleClear = () => {
        textAreaInput.current.value = "";
        setText("");
        setWords(0);
    };

    return (
        <>
            <h2 className="mt-2 mb-4 text-md font-bold font-heading text-blue-600 uppercase">
                {count == 1 && "Effects Computers Have on People"}
                {count == 2 && "Censorship in the Libraries"}
            </h2>
            <p className="mb-8 text-blueGray-400">
                <Prompt number={count} />
            </p>
            <h2 className="mb-2 text-lg lg:text-sm font-semibold font-heading uppercase">
                Write your essay here
            </h2>
            <label className="block">
                <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="essay"
                    rows="5"
                    ref={textAreaInput}
                    onChange={handleChange}
                ></textarea>
            </label>
            <br />
            <div className="flex flex-auto justify-between">
                <p className="text-sm">Words: {chars}</p>
                <div className="space-x-2">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none"
                        onClick={handleClear}
                    >
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                        Clear
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSubmit}
                    >
                        <svg
                            className="-ml-1 mr-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Submit
                    </button>
                </div>
            </div>

            {modal && (
                <Modal
                    score={score}
                    isLoading={isLoading}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default PromptContainer;

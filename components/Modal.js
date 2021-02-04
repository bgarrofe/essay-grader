import React from "react";

export default function Modal({ score, isLoading, closeModal }) {
    let result = "";

    if (score < 2) {
        result = "There's still room for improvement. Keep leaning.";
    } else if (score < 3) {
        result = "You are getting better at this! Keep up the good work!";
    } else if (score < 4) {
        result = "You are almost there! You need minor improvements.";
    } else if (score < 5) {
        result = "Congratulations! That's a nice score.";
    } else {
        result = "Perfect score! You should be a novel writer!";
    }

    return (
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    class="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            {isLoading && (
                                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg
                                        class="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                        ></path>
                                    </svg>
                                </div>
                            )}

                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                {isLoading && (
                                    <>
                                        <h3
                                            class="text-lg leading-6 font-medium text-gray-900"
                                            id="modal-headline"
                                        >
                                            Calculating your score
                                        </h3>
                                        <div class="mt-2">
                                            <p class="text-sm text-gray-500">
                                                Please wait while our servers
                                                are calculating your score.
                                            </p>
                                        </div>
                                    </>
                                )}

                                {!isLoading && (
                                    <>
                                        <div className="flex mx-auto mt-10 ring-4 ring-offset-2 ring-blue-600 items-center justify-center text-white text-5xl rounded-full w-24 h-24 bg-blue-600 shadow-lg text-center">
                                            {score}
                                        </div>
                                        <h2 className="text-center mt-6 font-semibold text-xl">
                                            {result}
                                        </h2>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            onClick={closeModal}
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

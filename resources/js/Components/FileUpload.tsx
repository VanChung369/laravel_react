import { DocumentArrowUpIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { forwardRef, InputHTMLAttributes, useState } from "react";

export default forwardRef(function FileUpload(
    {
        id,
        name,
        className = "",
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & {
        isFocused?: boolean;
    },
    ref
) {
    const { dataimage, clickDelete } = props as any;

    const [showAction, setShowAction] = useState(false);

    const handleMouseEnter = () => setShowAction(true);
    const handleMouseLeave = () => setShowAction(false);
    return (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-50/95 px-6 py-10">
            <div className="text-center">
                {dataimage ? (
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="hover:opacity-85"
                    >
                        <img
                            className="w-32 h-32 object-cover object-center"
                            src={dataimage}
                            alt=""
                        />
                        {showAction && (
                            <div className="relative bottom-20 z-10 whitespace-nowrap w-full">
                                <XCircleIcon
                                    onClick={clickDelete}
                                    className="w-5 h-5 absolute left-10 mr-1 top-1 dark:hover:text-slate-100 cursor-pointer"
                                />

                                <label
                                    htmlFor={id}
                                    className="cursor-pointer rounded-md absolute ml-1 top-1 left-1/2 w-1/2"
                                >
                                    <DocumentArrowUpIcon className="w-5 h-5 dark:hover:text-slate-100" />
                                    <input
                                        {...props}
                                        id={id}
                                        name={name}
                                        type="file"
                                        className={
                                            "sr-only border-gray-300 dark:border-gray-700 dark:bg-gray-50 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
                                            className
                                        }
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <svg
                            className="mx-auto h-12 w-12 text-gray-300"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            />
                        </svg>
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor={id}
                                className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>

                                <input
                                    {...props}
                                    id={id}
                                    name={name}
                                    type="file"
                                    className={
                                        "sr-only border-gray-300 dark:border-gray-700 dark:bg-gray-50 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
                                        className
                                    }
                                />
                            </label>
                            <p className="pl-1 dark:text-gray-200">
                                or drag and drop
                            </p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600 dark:text-gray-200">
                            PNG, JPG, GIF up to 10MB
                        </p>
                    </>
                )}
            </div>
        </div>
    );
});

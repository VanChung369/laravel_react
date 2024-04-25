import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    XCircleIcon,
} from "@heroicons/react/20/solid";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

const toastPlacement: any = {
    topLeft: "top-5 left-5",
    topRight: "top-5 right-5",
    bottomRight: "right-5 bottom-5",
    bottomLeft: "bottom-5 left-5",
    center: "top-5 left-1/2",
};

const animationClasses: any = {
    success: "",
    error: "",
    info: "",
};

export default function ToastMessage({
    text,
    className = "",
    placement = "topRight",
    type = "success",
    show = false,
    time = 2500,
    ...props
}: HTMLAttributes<HTMLParagraphElement> & {
    text?: string;
    placement?: string;
    show?: boolean;
    time?: number;
    type?: string;
}) {
    const [showToast, setShowToast] = useState(show);

    useEffect(() => {
        if (showToast) {
            const timeoutId = setTimeout(() => setShowToast(false), time);
            return () => clearTimeout(timeoutId);
        }
    }, [showToast]);

    const getIcon = () => {
        switch (type) {
            case "success":
                return <CheckCircleIcon className="w-6 h-6 text-lime-500" />;
            case "error":
                return <XCircleIcon className="w-6 h-6 text-red-600" />;
            case "info":
                return (
                    <ExclamationCircleIcon className="w-6 h-6 text-cyan-500" />
                );
            default:
                return null;
        }
    };

    return (
        <>
            {showToast && (
                <div
                    {...props}
                    className={`fixed z-50 ease-in flex items-center w-80 p-3 space-x-2 text-gray-500 bg-gray-800 divide-x rtl:divide-x-reverse ${toastPlacement[placement]} rounded-lg shadow dark:text-gray-400 dark:divide-gray-200 divide-gray-700 space-x dark:bg-slate-100 ${className} ${animationClasses[type]}`}
                    role="alert"
                >
                    {getIcon()}
                    <div className="text-sm dark:text-gray-800 font-normal">
                        {text}
                    </div>
                </div>
            )}
        </>
    );
}

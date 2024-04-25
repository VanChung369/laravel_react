import React, { ReactNode, useState } from "react";

function ReadMore({
    children,
    content,
    className,
    textSlice = 350,
    ...props
}: {
    children?: any;
    content: string;
    className?: string;
    textSlice?: number;
}) {
    const [isExpanded, setIsExpanded] = useState(true);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className="relative scrollbar-thumb-slate-700 scrollbar-track-slate-500 ">
            <p
                className={
                    "text-justify overflow-auto scroll-smooth scrollbar-thin h-28 leading-5 " +
                    className
                }
            >
                {isExpanded && content?.slice(0, textSlice).length === textSlice
                    ? `${content?.slice(0, textSlice)}...`
                    : content}
            </p>
            {content?.slice(0, textSlice).length === textSlice && (
                <button
                    {...props}
                    type="button"
                    onClick={toggleExpand}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none mt-2"
                >
                    {isExpanded ? "Show Less" : "Read More"}
                    {children}
                </button>
            )}
        </div>
    );
}

export default ReadMore;

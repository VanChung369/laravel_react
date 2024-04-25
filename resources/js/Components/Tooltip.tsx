import { PlayIcon } from "@heroicons/react/16/solid";
import { HTMLAttributes, useState } from "react";

const tooltipPlacement: any = {
    top: "top-full mt-2 -translate-y-16",
    bottom: "bottom-full mt-2",
    left: "left-full ml-2",
    right: "right-full mr-2",
};

export default function TextTooltip({
    className = "",
    children,
    content,
    placement = "top",
    ...props
}: HTMLAttributes<any> & {
    content?: string;
    placement: string;
}) {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);

    return content ? (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
            className={"relative w-fit ms-1 " + className}
        >
            {children}
            {showTooltip && (
                <div className="absolute left-1/4">
                    <div
                        className={`tooltip ${tooltipPlacement[placement]} w-max relative`}
                    >
                        {content}
                        <PlayIcon className="h-3 w-4 text-gray-500 rotate-90 absolute left-1/4" />
                    </div>
                </div>
            )}
        </div>
    ) : null;
}

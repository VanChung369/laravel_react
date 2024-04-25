import { HTMLAttributes, useEffect, useRef, useState } from "react";
import TextTooltip from "./Tooltip";

export default function TextEllipsis({
    text,
    className = "",
    width = 36,
    ...props
}: HTMLAttributes<HTMLParagraphElement> & {
    text?: string;
    width?: number;
}) {
    const [isOverflow, setIsOverflow] = useState(false);
    const dataRef = useRef<any>();
    useEffect(() => {
        if (width) {
            setIsOverflow(
                dataRef?.current?.scrollWidth > dataRef?.current?.clientWidth ||
                    dataRef?.current?.scrollWidth > width * 4
            );
        } else {
            setIsOverflow(
                dataRef?.current?.scrollWidth > dataRef?.current?.clientWidth
            );
        }
    }, [text, width]);

    return text && isOverflow ? (
        <TextTooltip content={text} placement={"top"}>
            <div
                {...props}
                ref={dataRef}
                className={`truncate w-${width}` + " " + className}
            >
                {text}
            </div>
        </TextTooltip>
    ) : (
        <div
            {...props}
            ref={dataRef}
            className={`truncate w-${width}` + " " + className}
        >
            {text}
        </div>
    );
}

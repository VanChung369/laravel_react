import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { Link } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

export default function Pagination({
    meta,
    className = "",
    children,
    queryParams,
    ...props
}: PropsWithChildren<{
    meta: { links: Array<any>; from?: number; to?: number; total?: number };
    className?: String;
    queryParams?: any;
    children?: ReactNode;
}>) {
    const { page, ...newParams } = queryParams;

    return (
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between sm:mt-4">
            <div>
                <p className="text-sm text-white">
                    Showing <span className="font-medium">{meta.from}</span> to{" "}
                    <span className="font-medium">{meta.to}</span> of{" "}
                    <span className="font-medium">{meta.total}</span> results
                </p>
            </div>
            <div>
                <nav
                    className="isolate inline-flex -space-x-px rounded-xl shadow-sm"
                    aria-label="Pagination"
                >
                    {meta.links.map((link: any, i: number, row: any[]) => {
                        let stringLabel = "";
                        if (i === 0) {
                            stringLabel =
                                '<svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/> </svg>';
                        } else if (i + 1 === row.length) {
                            stringLabel =
                                '<svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/></svg>';
                        } else {
                            stringLabel = link.label;
                        }
                        return (
                            <Link
                                key={i}
                                {...props}
                                preserveScroll
                                href={
                                    link.url +
                                        "&" +
                                        new URLSearchParams(
                                            newParams
                                        ).toString() || ""
                                }
                                label={link.lable}
                                className={
                                    "flex items-center -space-x-px text-sm justify-center px-4 h-9 border border-slate-600 hover:bg-blue-100 hover:text-white dark:border-gray-700" +
                                    (link.active
                                        ? "z-10 text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white focus:outline-offset-0"
                                        : "leading-tight text-gray-500 dark:bg-gray-800 bg-white dark:hover:bg-gray-700 dark:hover:text-white") +
                                    (!link.url
                                        ? "!text-gray-500 cursor-not-allowed"
                                        : "hover:bg-gray-950") +
                                    className
                                }
                                dangerouslySetInnerHTML={{
                                    __html: stringLabel,
                                }}
                            >
                                {children}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}

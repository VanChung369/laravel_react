import {
    ChevronDownIcon,
    ChevronUpIcon,
    InboxArrowDownIcon,
} from "@heroicons/react/16/solid";
import { TableHTMLAttributes } from "react";
import Pagination from "./Pagination";
import { router } from "@inertiajs/react";

export default function TableSort({
    className = "",
    columns,
    dataSources,
    meta,
    children,
    queryParams,
    isPagination = false,
    path = "",
    ...props
}: TableHTMLAttributes<HTMLTableElement> & {
    columns: Array<{
        name: string;
        key?: string;
        isSort?: boolean;
        sort_field?: string;
        hide?: boolean;
        render?: (
            data: any,
            index?: any,
            currentPage?: any,
            perPage?: any
        ) => void;
    }>;
    dataSources: any;
    path: string;
    queryParams?: any;
    isPagination?: boolean;
    meta?: any;
}) {
    const sortChanged = (sort_field: string) => {
        if (sort_field == queryParams.sort_field) {
            if (queryParams.sort_direction == "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = sort_field;
            queryParams.sort_direction = "asc";
        }
        router.get(route(path), queryParams);
    };

    return (
        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
            <table
                {...props}
                className={
                    "w-full text-sm text-left rtl:text-right rounded-sm text-gray-50 dark:text-gray-700 " +
                    className
                }
            >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        {columns?.map((column: any, idx: number) =>
                            !column.hide ? (
                                <th
                                    className="px-3 py-5"
                                    onClick={
                                        column.isSort
                                            ? () =>
                                                  sortChanged(
                                                      column?.sort_field
                                                  )
                                            : undefined
                                    }
                                    key={idx}
                                >
                                    <div className="flex items-center gap-1">
                                        {column.name}
                                        {column.isSort ? (
                                            <div>
                                                <ChevronUpIcon
                                                    className={
                                                        "w-4 cursor-pointer " +
                                                        (queryParams.sort_field ==
                                                            column.sort_field &&
                                                        queryParams.sort_direction ==
                                                            "asc"
                                                            ? "text-white"
                                                            : "")
                                                    }
                                                />
                                                <ChevronDownIcon
                                                    className={
                                                        "w-4 -mt-2 cursor-pointer " +
                                                        (queryParams.sort_field ==
                                                            column.sort_field &&
                                                        queryParams.sort_direction ==
                                                            "desc"
                                                            ? "text-white"
                                                            : "")
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </th>
                            ) : (
                                ""
                            )
                        )}
                    </tr>
                </thead>
                <tbody className="text-gray-200">
                    {dataSources.length > 0 && dataSources ? (
                        dataSources.map((data: any, index: any) => (
                            <tr
                                key={data.id}
                                className="bg-white border-b border-slate-600 dark:bg-gray-800 dark:broder-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                {columns?.map((column: any, idx: number) =>
                                    !column.hide ? (
                                        <td className="px-3 py-3" key={idx}>
                                            {column.render(
                                                data,
                                                index,
                                                meta?.current_page,
                                                meta?.per_page
                                            )}
                                        </td>
                                    ) : (
                                        <></>
                                    )
                                )}
                            </tr>
                        ))
                    ) : (
                        <div className="h-96 relative">
                            <div className="absolute top-1/2 left-[550px]">
                                <InboxArrowDownIcon className="w-20" />
                                <div className="text-center mt-3 w-max">
                                    Emty Record
                                </div>
                            </div>
                        </div>
                    )}
                </tbody>
            </table>
            {isPagination ? (
                <Pagination queryParams={queryParams} meta={meta} />
            ) : (
                ""
            )}
        </div>
    );
}

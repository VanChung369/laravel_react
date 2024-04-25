import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SearchInput from "@/Components/SearchInput";
import SelectInput from "@/Components/SelectInput";
import TableSort from "@/Components/TableSort";
import TextEllipsis from "@/Components/TextEllipsis";
import {
    TASK_PRIORITY_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constants/Status";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

const OPTIONS = [
    { name: "Select status", value: "" },
    { name: "Pending", value: "pending" },
    { name: "In Progress", value: "in_progress" },
    { name: "Completed", value: "completed" },
];

const columns = [
    {
        name: "ID",
        isSort: false,
        sort_field: "id",
        render: (
            _row: any,
            index: number,
            currentPage: number,
            perPage: number
        ) => (currentPage - 1) * perPage + index + 1,
    },
    {
        name: "Image",
        isSort: false,
        sort_field: "image_path",
        render: (_row: any, index: number) => (
            <img
                src={_row.image_path}
                alt=""
                className="h-12 w-12 rounded-full text-gray-300"
            />
        ),
    },
    {
        name: "Name",
        isSort: true,
        sort_field: "name",
        render: (_row: any, index: number) => (
            <TextEllipsis text={_row.name} width={48} />
        ),
    },
    {
        name: "Status",
        isSort: true,
        sort_field: "status",
        render: (_row: any, index: number) => (
            <span
                className={
                    TASK_STATUS_MAP[_row.status] +
                    " px-1.5 w-20 justify-center py-1.5"
                }
            >
                {TASK_STATUS_TEXT_MAP[_row.status]}
            </span>
        ),
    },
    {
        name: "Create Date",
        isSort: true,
        sort_field: "created_at",
        render: (_row: any, index: number) => _row.created_at,
    },
    {
        name: "Due Date",
        isSort: true,
        sort_field: "due_date",
        render: (_row: any, index: number) => _row.due_date,
    },
    {
        name: "Priority",
        isSort: true,
        sort_field: "priority",
        render: (_row: any, index: number) => (
            <span
                className={
                    TASK_PRIORITY_MAP[_row.priority] +
                    " px-1.5 w-14 justify-center py-1.5"
                }
            >
                {TASK_PRIORITY_TEXT_MAP[_row.priority]}
            </span>
        ),
    },
    {
        name: "Assigned",
        isSort: true,
        sort_field: "assignedUser",
        render: (_row: any, index: number) => _row.assignedUser.name,
    },
    {
        name: "Actions",
        isSort: false,
        sort_field: "",
        render: (_row: any, index: number) => (
            <div className="hidden sm:block w-46">
                <Link
                    href={route("task.edit", _row.id)}
                    className="inline-flex items-center"
                >
                    <PrimaryButton className="sm:ml-3 dark:px-2 dark:py-2">
                        <PencilSquareIcon
                            className="sm:mr-1 h-4 w-4 text-slate-700"
                            aria-hidden="true"
                        />
                        Edit
                    </PrimaryButton>
                </Link>
                <Link
                    href={route("task.destroy", _row.id)}
                    className="inline-flex items-center"
                >
                    <DangerButton className="sm:ml-3 dark:px-2 dark:py-2">
                        <XCircleIcon
                            className="sm:mr-1 h-4 w-4 text-white"
                            aria-hidden="true"
                        />
                        Delete
                    </DangerButton>
                </Link>
            </div>
        ),
    },
];

export default function ProjectTasks({
    tasks,
    queryParams = null,
    projectId,
}: {
    tasks: {
        data: Array<object>;
        meta: { links: Array<any>; from?: number; to?: number; total?: number };
    };
    projectId: number;
    queryParams?: any;
}) {
    const [selected, setSelected] = useState(OPTIONS[0]);
    queryParams = queryParams || {};
    const searchFiledChanged = (name: string, value: any) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("project.show", projectId), queryParams);
    };

    const onKeyUp = (name: string, e: any) => {
        if (e.key !== "Enter") return;

        searchFiledChanged(name, e.target.value);
    };

    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex gap-2 justify-end pt-4 pr-6">
                <div>
                    <SelectInput
                        options={OPTIONS}
                        selected={
                            queryParams.status
                                ? OPTIONS.find(
                                      (option: any) =>
                                          option.value == queryParams.status
                                  )
                                : selected
                        }
                        onChange={(e: any) => {
                            setSelected(e);
                            searchFiledChanged("status", e.value);
                        }}
                    />
                </div>
                <div>
                    <SearchInput
                        placeholder="Search for items"
                        className="w-80"
                        defaultValue={queryParams.name}
                        onChange={(e) =>
                            searchFiledChanged("name", e.target.value)
                        }
                        onKeyUp={(e) => onKeyUp("name", e)}
                    />
                </div>
            </div>
            <TableSort
                columns={columns}
                dataSources={tasks.data}
                isPagination={true}
                queryParams={queryParams}
                meta={tasks.meta}
                path={"project.show"}
            />
        </div>
    );
}

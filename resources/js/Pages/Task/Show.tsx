import ReadMore from "@/Components/ReadMore";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    TASK_PRIORITY_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constants/Status";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

const columnsRenderer = [
    {
        name: "ID",
        key: "id",
        render: (value: any, index: number) => (
            <>
                <dt className="font-medium text-slate-200">ID</dt>
                <dd className="mt-2 text-sm text-slate-300">{value.id}</dd>
            </>
        ),
    },
    {
        name: "Status",
        key: "status",
        render: (value: any, index: number) => (
            <>
                <dt className="font-medium text-slate-200">Status</dt>
                <dd className="mt-2 text-sm text-slate-300">
                    <span
                        className={
                            TASK_STATUS_MAP[value.status] + " px-1.5 py-1.5"
                        }
                    >
                        {TASK_STATUS_TEXT_MAP[value.status]}
                    </span>
                </dd>
            </>
        ),
    },
    {
        name: "Priority",
        key: "priority",
        render: (value: any, index: number) => (
            <>
                <dt className="font-medium text-slate-200">Priority</dt>
                <dd className="mt-2 text-sm text-slate-300">
                    <span
                        className={
                            TASK_PRIORITY_MAP[value.priority] + " px-1.5 py-1.5"
                        }
                    >
                        {TASK_PRIORITY_TEXT_MAP[value.priority]}
                    </span>
                </dd>
            </>
        ),
    },
    {
        name: "Assigned User",
        key: "assignedUser",
        render: (value: any, index: number) => (
            <>
                <dt className="font-medium text-slate-200">Assigned User</dt>
                <dd className="mt-2 text-sm text-slate-300">
                    {value?.assignedUser?.name}
                </dd>
            </>
        ),
    },
    {
        name: "Due Date",
        key: "due_date",
        render: (value: any, index: number) => (
            <>
                <dt className="font-medium text-slate-200">Due Date</dt>
                <dd className="mt-2 text-sm text-slate-300">
                    {value?.due_date}
                </dd>
            </>
        ),
    },
    {
        name: "Created At",
        key: "created_at",
        render: (value: any, index: number) => (
            <>
                <dt className="font-medium text-slate-200">Created At</dt>
                <dd className="mt-2 text-sm text-slate-300">
                    {value?.created_at}
                </dd>
            </>
        ),
    },
    {
        name: "Project",
        key: "project",
        render: (value: any, index: number) => (
            <>
                <dt className="font-medium text-slate-200">Project</dt>
                <dd className="mt-2 text-sm text-slate-300">
                    {value?.project.name}
                </dd>
            </>
        ),
    },
];

export default function Show({
    auth,
    task,
}: PageProps<{
    task: any;
}>) {
    console.log(task);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Task Detail`}
                </h2>
            }
        >
            <Head title="Task" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                <div className="h-full overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5 ">
                                    <img
                                        src={task?.data.image_path}
                                        alt={task?.data.image_path}
                                        className="object-cover object-center h-full w-full hover:opacity-95"
                                    />
                                </div>
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-2xl font-bold text-slate-200 sm:pr-12">
                                        {task?.data.name}
                                    </h2>
                                    <h3 className="text-slate-200 mt-5 sm:pr-12">
                                        <ReadMore
                                            content={task?.data.description}
                                        />
                                    </h3>
                                    <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-y-10 lg:gap-x-8">
                                        {columnsRenderer.map(
                                            (value: any, idx: number) => {
                                                return (
                                                    <div
                                                        key={idx}
                                                        className=" border-gray-200 pt-4"
                                                    >
                                                        {value.render(
                                                            task?.data,
                                                            idx
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

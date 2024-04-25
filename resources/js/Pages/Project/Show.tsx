import ReadMore from "@/Components/ReadMore";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    PROJECT_STATUS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/constants/Status";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import ProjectTasks from "../Task/ProjectTasks";

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
                            PROJECT_STATUS_MAP[value.status] + " px-1.5 py-1.5"
                        }
                    >
                        {PROJECT_STATUS_TEXT_MAP[value.status]}
                    </span>
                </dd>
            </>
        ),
    },
    {
        name: "Created By",
        key: "createdBy.name",
        render: (value: any, index: number) => (
            <>
                <dt className="font-medium text-slate-200">Created By</dt>
                <dd className="mt-2 text-sm text-slate-300">
                    {value.createdBy.name}
                </dd>
            </>
        ),
    },
    {
        name: "Updated By",
        key: "updatedBy.name",
        render: (value: any, index: number) => (
            <>
                <dt className="font-medium text-slate-200">Updated By</dt>
                <dd className="mt-2 text-sm text-slate-300">
                    {value.updatedBy.name}
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
                    {value.due_date}
                </dd>
            </>
        ),
    },
    {
        name: "Create Date",
        key: "created_at",
        render: (value: any, index: number) => (
            <>
                <dt className="font-medium text-slate-200">Create Date</dt>
                <dd className="mt-2 text-sm text-slate-300">
                    {value.created_at}
                </dd>
            </>
        ),
    },
];

export default function Show({
    auth,
    project,
    tasks,
    queryParams,
}: PageProps<{
    project: any;
    tasks: any;
    queryParams?: any;
}>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Project Detail`}
                </h2>
            }
        >
            <Head title="Project" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                <div className="h-96 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5 ">
                                    <img
                                        src={project.image_path}
                                        alt={project.image_path}
                                        className="object-cover object-center h-full w-full hover:opacity-95"
                                    />
                                </div>
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-2xl font-bold text-slate-200 sm:pr-12">
                                        {project.name}
                                    </h2>
                                    <h3 className="text-slate-200 mt-5 sm:pr-12">
                                        <ReadMore
                                            content={project.description}
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
                                                            project,
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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="text-lg font-bold text-slate-200">
                                Project Tasks
                            </div>
                            <ProjectTasks
                                projectId={project.id}
                                tasks={tasks}
                                queryParams={queryParams}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

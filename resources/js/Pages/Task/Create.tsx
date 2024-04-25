import CreateButton from "@/Components/CreateButton";
import FormItem from "@/Components/FormItem";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

const OPTIONS_STATUS = [
    { name: "Select status", value: "" },
    { name: "Pending", value: "pending" },
    { name: "In Progress", value: "in_progress" },
    { name: "Completed", value: "completed" },
];

const OPTIONS_PRIORITY = [
    { name: "Select Priority", value: "" },
    { name: "High", value: "high" },
    { name: "Medium", value: "medium" },
    { name: "Low", value: "low" },
];

export default function Create({
    auth,
    projects,
    users,
}: PageProps<{
    projects?: any;
    users?: any;
}>) {
    const [file, setFile] = useState<any>();

    const OPTIONS_PROJECT: any = [{ name: "Select Project", value: "" }];
    const OPTIONS_USER: any = [{ name: "Select User", value: "" }];

    projects?.data?.map((project: any) => {
        OPTIONS_PROJECT.push({ name: project.name, value: project.id });
    });

    users?.data?.map((user: any) => {
        OPTIONS_USER.push({ name: user.name, value: user.id });
    });

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            image: "",
            name: "",
            status: "",
            description: "",
            due_date: "",
            priority: "",
            project_id: "",
            assigned_user_id: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("task.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create New Task
                </h2>
            }
        >
            <Head title="Create Task" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <FormItem
                                            id="name"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            typeInput={"text"}
                                            placeholder={"Enter Name..."}
                                            value={data.name}
                                            messageError={errors.name}
                                            label={"Name"}
                                            required={true}
                                            isFocused
                                        />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <FormItem
                                            id="due_date"
                                            onChange={(e) =>
                                                setData(
                                                    "due_date",
                                                    e.target.value
                                                )
                                            }
                                            typeInput={"date"}
                                            value={data.due_date}
                                            messageError={errors.due_date}
                                            label={"Due Date"}
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <FormItem
                                            id="project_id"
                                            onChange={(e: any) => {
                                                setData("project_id", e.value);
                                            }}
                                            options={OPTIONS_PROJECT}
                                            typeInput={"select"}
                                            value={data.project_id}
                                            messageError={errors.project_id}
                                            label={"Project"}
                                            required={true}
                                        />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <FormItem
                                            id="assigned_user_id"
                                            onChange={(e: any) => {
                                                setData(
                                                    "assigned_user_id",
                                                    e.value
                                                );
                                            }}
                                            options={OPTIONS_USER}
                                            typeInput={"select"}
                                            value={data.assigned_user_id}
                                            messageError={
                                                errors.assigned_user_id
                                            }
                                            label={"Assigned User"}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-span-full">
                                        <FormItem
                                            id="description"
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            typeInput={"textarea"}
                                            rows={3}
                                            placeholder={"Enter Description..."}
                                            value={data.description}
                                            messageError={errors.description}
                                            label={"Description"}
                                            required={true}
                                        />
                                        <p className="mt-3 text-sm leading-6 dark:text-gray-300">
                                            Write a few sentences about task.
                                        </p>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <FormItem
                                            id="priority"
                                            onChange={(e: any) => {
                                                setData("priority", e.value);
                                            }}
                                            options={OPTIONS_PRIORITY}
                                            typeInput={"select"}
                                            value={data.priority}
                                            messageError={errors.priority}
                                            label={"Priority"}
                                            required={true}
                                        />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <FormItem
                                            id="status"
                                            onChange={(e: any) => {
                                                setData("status", e.value);
                                            }}
                                            options={OPTIONS_STATUS}
                                            typeInput={"select"}
                                            value={data.status}
                                            messageError={errors.status}
                                            label={"Status"}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-span-full">
                                        <FormItem
                                            id="image"
                                            name="image"
                                            onChange={(e) => {
                                                setData(
                                                    "image",
                                                    e.target.files[0]
                                                );
                                                setFile(
                                                    URL.createObjectURL(
                                                        e.target.files[0]
                                                    )
                                                );
                                            }}
                                            clickDelete={() => {
                                                setData("image", "");
                                                setFile("");
                                            }}
                                            typeInput={"file"}
                                            dataimage={file}
                                            messageError={errors.image}
                                            label={"Upload Image"}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <CreateButton disabled={processing}>
                                        Create
                                    </CreateButton>
                                    <Link href={route("project.index")}>
                                        <PrimaryButton type="button">
                                            cancel
                                        </PrimaryButton>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

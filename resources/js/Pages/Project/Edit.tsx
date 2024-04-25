import CreateButton from "@/Components/CreateButton";
import FormItem from "@/Components/FormItem";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

const OPTIONS = [
    { name: "Select status", value: "" },
    { name: "Pending", value: "pending" },
    { name: "In Progress", value: "in_progress" },
    { name: "Completed", value: "completed" },
];

export default function Edit({
    auth,
    project,
}: PageProps<{
    project: any;
}>) {
    const [file, setFile] = useState<any>();

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            image: "",
            name: project.name || "",
            status: project.status || "",
            description: project.description || "",
            due_date: project.due_date_edit || "",
            _method: "PUT",
        });

    useEffect(() => {
        setFile(project.image_path);
    }, [project.image_path]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("project.update", project.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Project
                </h2>
            }
        >
            <Head title="Create Project" />
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
                                            Write a few sentences about project.
                                        </p>
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
                                            id="status"
                                            onChange={(e: any) => {
                                                setData("status", e.value);
                                            }}
                                            options={OPTIONS}
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
                                        save
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

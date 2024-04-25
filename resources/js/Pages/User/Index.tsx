import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import SearchInput from "@/Components/SearchInput";
import { useState } from "react";
import TableSort from "@/Components/TableSort";
import TextEllipsis from "@/Components/TextEllipsis";
import CreateButton from "@/Components/CreateButton";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import ToastMessage from "@/Components/ToastMessage";
import DeleteUserForm from "./Delete";
import Create from "./Create";
import Edit from "./Edit";

export default function Index({
    auth,
    users,
    queryParams,
    success,
}: PageProps<{
    users: {
        data: Array<object>;
        meta: { links: Array<any>; from?: number; to?: number; total?: number };
    };
}> & { queryParams?: any; success?: any }) {
    const [showModalDelete, setshowModalDelete] = useState(false);
    const [showModalCreate, setshowModalCreate] = useState(false);
    const [showModalUpdate, setshowModalUpdate] = useState(false);
    const [idUpdate, setIdUpdate] = useState<number | string>();
    const [idDelete, setIdDelete] = useState<number | string>();

    const confirmUserDeletion = (id: number | string) => {
        setshowModalDelete(true);
        setIdDelete(id);
    };

    const confirmUserUpdation = (id: number | string) => {
        setshowModalUpdate(true);
        setIdUpdate(id);
    };

    const confirmUserCreation = () => {
        setshowModalCreate(true);
    };

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
            name: "Name",
            isSort: true,
            sort_field: "name",
            render: (_row: any, index: number) => (
                <TextEllipsis text={_row.name} width={26} />
            ),
        },
        {
            name: "Email",
            isSort: true,
            sort_field: "email",
            render: (_row: any, index: number) => _row.email,
        },
        {
            name: "Create Date",
            isSort: true,
            sort_field: "created_at",
            render: (_row: any, index: number) => _row.created_at,
        },
        {
            name: "Actions",
            isSort: false,
            sort_field: "",
            render: (_row: any, index: number) => (
                <div className="hidden sm:block w-46">
                    <PrimaryButton
                        type="button"
                        onClick={(e) => confirmUserUpdation(_row.id)}
                        className="sm:ml-3 dark:px-2 dark:py-2"
                    >
                        <PencilSquareIcon
                            className="sm:mr-1 h-4 w-4 text-slate-700"
                            aria-hidden="true"
                        />
                        Edit
                    </PrimaryButton>

                    <div className="inline-flex items-center">
                        <DangerButton
                            type="button"
                            onClick={(e) => confirmUserDeletion(_row.id)}
                            className="sm:ml-3 dark:px-2 dark:py-2"
                        >
                            <XCircleIcon
                                className="sm:mr-1 h-4 w-4 text-white"
                                aria-hidden="true"
                            />
                            Delete
                        </DangerButton>
                    </div>
                </div>
            ),
        },
    ];

    queryParams = queryParams || {};
    const searchFiledChanged = (name: string, value: any) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("user.index"), queryParams);
    };

    const onKeyUp = (name: string, e: any) => {
        if (e.key !== "Enter") return;

        searchFiledChanged(name, e.target.value);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Users
                    </h2>
                    <CreateButton onClick={confirmUserCreation}>
                        Create User
                    </CreateButton>
                </div>
            }
        >
            {success && <ToastMessage show={true} text={success} />}
            <DeleteUserForm
                id={idDelete}
                confirmingUserDeletion={showModalDelete}
                setConfirmingUserDeletion={setshowModalDelete}
            />
            <Create
                confirmingUserCreation={showModalCreate}
                setConfirmingUserCreation={setshowModalCreate}
            />
            <Edit
                id={idUpdate}
                setId={setIdUpdate}
                confirmingUserUpdation={showModalUpdate}
                setConfirmingUserUpdation={setshowModalUpdate}
            />
            <Head title="Project" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex gap-2 justify-end pt-4 pr-6">
                            <div>
                                <SearchInput
                                    placeholder="Search for items"
                                    className="w-96"
                                    defaultValue={queryParams.name}
                                    onChange={(e) =>
                                        searchFiledChanged(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyUp={(e) => onKeyUp("name", e)}
                                />
                            </div>
                        </div>
                        <TableSort
                            columns={columns}
                            dataSources={users.data}
                            isPagination={true}
                            queryParams={queryParams}
                            meta={users.meta}
                            path={"user.index"}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

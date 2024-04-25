import { useState, FormEventHandler } from "react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";

export default function DeleteUserForm({
    className = "",
    id,
    confirmingUserDeletion = false,
    setConfirmingUserDeletion,
}: {
    className?: string;
    id?: number | string;
    confirmingUserDeletion?: boolean;
    setConfirmingUserDeletion?: any;
}) {
    const { delete: destroy, processing } = useForm({});

    const deleteProject: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("user.destroy", id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteProject} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your user?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your user is deleted, all of its resources and data
                        will be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete User
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

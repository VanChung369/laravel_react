import { useState, FormEventHandler } from "react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";

export default function DeleteTaskForm({
    className = "",
    id,
    confirmingTaskDeletion = false,
    setConfirmingTaskDeletion,
}: {
    className?: string;
    id?: number | string;
    confirmingTaskDeletion?: boolean;
    setConfirmingTaskDeletion?: any;
}) {
    const { delete: destroy, processing } = useForm({});

    const deleteProject: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("task.destroy", id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setConfirmingTaskDeletion(false);
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <Modal show={confirmingTaskDeletion} onClose={closeModal}>
                <form onSubmit={deleteProject} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your task?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your task is deleted, all of its resources and data
                        will be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete task
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

import CreateButton from "@/Components/CreateButton";
import FormItem from "@/Components/FormItem";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";

export default function Edit({
    className,
    id,
    setId,
    confirmingUserUpdation = false,
    setConfirmingUserUpdation,
}: {
    className?: string;
    confirmingUserUpdation?: boolean;
    setConfirmingUserUpdation?: any;
    id?: number | string;
    setId?: any;
}) {
    const { data, setData, put, clearErrors, reset, errors, processing } =
        useForm({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        });
    const [idUpdate, setIdUpdate] = useState<any>();

    useEffect(() => {
        id &&
            axios.get(route("user.edit", id)).then((response) => {
                setData({
                    name: response.data.user?.name || "",
                    email: response.data.user?.email || "",
                    password: "",
                    password_confirmation: "",
                });
            });

        return () => {
            setIdUpdate(id);
            setId("");
        };
    }, [id]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("user.update", idUpdate), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                closeModal();
            },
        });
    };

    const closeModal = () => {
        setConfirmingUserUpdation(false);
        reset();
        clearErrors();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <Modal show={confirmingUserUpdation} onClose={closeModal}>
                <form onSubmit={submit} className="p-6">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Create New User
                        </h2>
                    </header>
                    <div className="mt-6">
                        <FormItem
                            id="name"
                            onChange={(e) => setData("name", e.target.value)}
                            typeInput={"text"}
                            placeholder={"Enter Name..."}
                            value={data.name}
                            messageError={errors.name}
                            label={"Name"}
                            required={true}
                            isFocused
                        />
                    </div>
                    <div className="mt-6">
                        <FormItem
                            id="email"
                            onChange={(e) => setData("email", e.target.value)}
                            typeInput={"text"}
                            placeholder={"Enter Email Address..."}
                            value={data.email}
                            messageError={errors.email}
                            label={"Email Address"}
                            required={true}
                        />
                    </div>
                    <div className="mt-6">
                        <FormItem
                            id="password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            typeInput={"password"}
                            placeholder={"Enter Password..."}
                            value={data.password}
                            messageError={errors.password}
                            label={"Password"}
                            required={true}
                        />
                    </div>
                    <div className="mt-6">
                        <FormItem
                            id="password_confirmation"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            typeInput={"password"}
                            placeholder={"Enter Confirm Password..."}
                            value={data.password_confirmation}
                            messageError={errors.password_confirmation}
                            label={"Confirm Password"}
                            required={true}
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <CreateButton disabled={processing}>Save</CreateButton>

                        <PrimaryButton
                            className="ms-2"
                            onClick={closeModal}
                            type="button"
                        >
                            cancel
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

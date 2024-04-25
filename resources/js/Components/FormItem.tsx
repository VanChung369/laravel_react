import {
    ChangeEventHandler,
    FC,
    HTMLAttributes,
    MouseEventHandler,
    ReactNode,
    TextareaHTMLAttributes,
    useEffect,
    useState,
} from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import CustomField from "./CustomField";
import TextareaInput from "./TextareaInput";
import FileUpload from "./FileUpload";
import SelectInput from "./SelectInput";

export const FieldTextInput: FC<{
    field: any;
    props: any;
    value?: any;
    id?: any;
    onChange?: any;
}> = ({ value, id, field, ...props }: any) => {
    const { onChange } = props as any;
    return (
        <TextInput
            id={id}
            {...field}
            {...props}
            className="mt-1 block w-full dark:bg-gray-700 "
            value={value}
            onChange={onChange}
        />
    );
};

export const FieldPasswordInput: FC<{
    field: any;
    props: any;
    value?: any;
    id?: any;
    onChange?: any;
}> = ({ value, id, field, ...props }: any) => {
    const { onChange } = props as any;
    return (
        <TextInput
            id={id}
            type="password"
            {...field}
            {...props}
            className="mt-1 block w-full dark:bg-gray-700 "
            value={value}
            onChange={onChange}
        />
    );
};

export const FieldTextarea: FC<{
    field: any;
    props: any;
    value?: any;
    id?: any;
    onChange?: any;
}> = ({ value, id, field, ...props }: any) => {
    const { onChange } = props as any;
    return (
        <TextareaInput
            id={id}
            {...field}
            {...props}
            className="mt-1 block w-full dark:bg-gray-700 "
            value={value}
            onChange={onChange}
        />
    );
};

export const FieldUpload: FC<{
    field: any;
    props: any;
    id?: any;
    onChange?: any;
}> = ({ id, field, ...props }: any) => {
    const { onChange } = props as any;
    return (
        <FileUpload
            id={id}
            {...field}
            {...props}
            className="mt-1 block w-full dark:bg-gray-700 "
            onChange={onChange}
        />
    );
};

export const FieldDateInput: FC<{
    field: any;
    props: any;
    value?: any;
    id?: any;
    onChange?: any;
}> = ({ value, id, field, ...props }: any) => {
    const { onChange } = props as any;
    return (
        <TextInput
            id={id}
            {...field}
            {...props}
            type="date"
            className="mt-1 block w-full  dark:bg-gray-700 "
            value={value}
            onChange={onChange}
        />
    );
};

export const FieldSelectInput: FC<{
    field: any;
    props: any;
    value?: any;
    id?: any;
    onChange?: any;
    options?: any;
}> = ({ value, id, options, field, ...props }: any) => {
    const [selected, setSelected] = useState(value || "");
    const { onChange } = props as any;
    const valueSelect = options.find((option: any) => option.value === value);

    useEffect(() => {
        setSelected(valueSelect);
    }, [value]);

    return (
        <SelectInput
            {...field}
            {...props}
            options={options}
            className="mt-1 z-10 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm "
            selected={selected}
            onChange={onChange}
        />
    );
};

export default function FormItem({
    id,
    value,
    className = "",
    children,
    typeInput,
    label,
    messageError,
    component,
    onChange,
    required = false,
    ...props
}: HTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement> & {
        onChange?: ChangeEventHandler<any>;
        value?: any;
        messageError?: any;
        label?: any;
        typeInput?: string;
        onBlur?: MouseEventHandler<any>;
        component?: ReactNode;
        required?: boolean;
        dataimage?: any;
        clickDelete?: any;
        options?: any;
        isFocused?: boolean;
        ref?: any;
    }) {
    let componentRender: any = component || TextInput;
    switch (typeInput) {
        case "text":
            componentRender = FieldTextInput;
            break;
        case "textarea":
            componentRender = FieldTextarea;
            break;
        case "file":
            componentRender = FieldUpload;
            break;
        case "date":
            componentRender = FieldDateInput;
            break;
        case "password":
            componentRender = FieldPasswordInput;
            break;
        case "select":
            componentRender = FieldSelectInput;
            break;
        case "checkbox":
            componentRender = <></>;
            break;
        case "group_checkbox":
            componentRender = <></>;
            break;
        case "number":
            componentRender = <></>;
            break;
        case "search":
            componentRender = <></>;
            break;
        case "switch":
            componentRender = <></>;
            break;
        case "radio":
            componentRender = <></>;
            break;
        case "range":
            componentRender = <></>;
            break;
        case "search_debounce":
            componentRender = <></>;
            break;
    }

    return (
        <div className={className}>
            <InputLabel htmlFor={id} value={label} />
            <CustomField
                {...props}
                initialValue={value}
                onChange={onChange}
                component={componentRender}
            />
            {children}
            <InputError className="mt-2" message={messageError} />
        </div>
    );
}

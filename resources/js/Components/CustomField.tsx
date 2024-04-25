import { useState } from "react";

export default function CustomField({
    id,
    onChange,
    onBlur,
    initialValue,
    component: CustomInputComponent,
    ...props
}: any) {
    return (
        <div>
            <CustomInputComponent
                id={id}
                value={initialValue}
                onChange={onChange}
                {...props}
            />
        </div>
    );
}

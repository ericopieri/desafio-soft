import React from "react";

function Input({
    type,
    text,
    handleChange,
    value,
    name,
    id,
    disabled,
    placeholder,
    className,
}) {
    return (
        <div className={"input-base " + className}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                min={type === "number" ? 1 : ""}
                name={name}
                placeholder={placeholder}
                required
                id={id}
                value={value ?? ""}
                onChange={handleChange}
                disabled={disabled}
            />
        </div>
    );
}

export default Input;

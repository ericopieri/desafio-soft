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
}) {
    return (
        <div className="input-base">
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                id={id}
                value={value ?? ""}
                onChange={handleChange}
                disabled={disabled}
            />
        </div>
    );
}

export default Input;

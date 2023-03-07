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
    pattern,
}) {
    return (
        <div className={"input-base " + className}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                pattern={pattern}
                min={type === "number" ? 1 : ""}
                step="any"
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

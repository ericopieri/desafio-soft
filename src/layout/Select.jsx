import React from "react";

function Select({ options, name, handleChange, text, placeholder, value }) {
    const optionsMap = () => {
        return options.map((option) => {
            return (
                <option key={option.codigo} value={option.codigo}>
                    {option.nome}
                </option>
            );
        });
    };

    return (
        <div className="input-base">
            <label htmlFor="name">{text}</label>
            <select
                name={name}
                onChange={(event) => {
                    event.preventDefault();

                    const { value: codigo } =
                        event.target.options[event.target.selectedIndex];
                    handleChange(codigo);
                }}
                value={value || placeholder}
            >
                <option value={placeholder} disabled>
                    {placeholder}
                </option>
                {options?.length > 0 && optionsMap()}
            </select>
        </div>
    );
}

export default Select;

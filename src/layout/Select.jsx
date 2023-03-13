import React from "react";

function Select({ options, name, handleChange, text, placeholder, value }) {
    const truncate = (str) => {
        return str.length > 100 ? str.substring(0, 40) + "..." : str;
    };

    const optionsMap = () => {
        return options.map((option) => {
            return (
                <option
                    key={option.codigo}
                    value={option.codigo}
                    title={option.nome}
                >
                    {truncate(option.nome)}
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

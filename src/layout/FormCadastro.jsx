import React from "react";

function Form({ title, children, handleSubmit, className }) {
    return (
        <form
            className={"form-generico " + className}
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}
        >
            <h1 className="titulo-produtos">{title}</h1>
            {children}
            <button type="submit">Enviar</button>
        </form>
    );
}

export default Form;

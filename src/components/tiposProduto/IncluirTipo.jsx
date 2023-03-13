import React, { useState } from "react";
import FormCadastro from "../../layout/FormCadastro";
import Input from "../../layout/Input";
import Message from "../../layout/Message";

function IncluirTipo({ postNewTipo }) {
    const [newTipo, setNewTipo] = useState({});

    const [type, setType] = useState("");
    const [message, setMessage] = useState("");

    const verificarPost = async () => {
        if (newTipo.nome && newTipo.percentual_imposto) {
            const data = await postNewTipo(newTipo);

            if (data.status === "success") {
                setNewTipo({});
            }

            setMessage(data.message ?? "");
            setType(data.status ?? "");
        }
    };

    const handleInput = (event) => {
        setNewTipo((newTipo) => ({
            ...newTipo,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <div>
            <h1 className="titulo-produtos titulo-large">
                Cadastro de um novo Tipo de Produto
            </h1>
            {message.length > 0 && (
                <Message
                    text={message}
                    type={type}
                    className="tipo-message"
                    handleTimeOut={setMessage}
                />
            )}
            <FormCadastro
                className="tipo-form"
                handleSubmit={() => verificarPost()}
            >
                <Input
                    type="text"
                    text="Nome"
                    name="nome"
                    placeholder="Nome que indentifica o Tipo"
                    value={newTipo.nome ?? ""}
                    handleChange={handleInput}
                />
                <Input
                    type="number"
                    text="% Imposto"
                    name="percentual_imposto"
                    placeholder="Percentual de Imposto"
                    value={newTipo.percentual_imposto ?? ""}
                    handleChange={handleInput}
                />
            </FormCadastro>
        </div>
    );
}

export default IncluirTipo;

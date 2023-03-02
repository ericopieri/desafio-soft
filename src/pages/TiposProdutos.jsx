import React, { useState, useEffect } from "react";
import FormCadastro from "../layout/FormCadastro";
import Input from "../layout/Input";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";

function TiposProdutos() {
    const [newTipo, setNewTipo] = useState({});
    const [tiposOpen, setTiposOpen] = useState(false);
    const [tipos, setTipos] = useState([]);
    const [showTipos, setShowTipos] = useState(false);

    const handleInput = (event) => {
        setNewTipo((newTipo) => ({
            ...newTipo,
            [event.target.name]: event.target.value,
        }));
    };

    const tiposMap = () => {
        return tipos.map((tipo) => (
            <div className="tipo-visu" key={tipo.id}>
                <h3>
                    {tipo.nome} - {tipo.percentual_imposto}%
                </h3>
            </div>
        ));
    };

    useEffect(() => {
        const getTipos = async () => {
            const { data } = await axios.get(
                "http://localhost/tipoProduto.php"
            );

            setTipos(data);
        };

        getTipos();
    });

    return (
        <div className="conteudo-principal">
            <div className="tipos-produtos">
                <h1 className="titulo-produtos titulo-large">
                    Cadastro de um novo Tipo de Produto
                </h1>
                <FormCadastro className="tipo-form">
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
                        placeholder="Nome que indentifica o Tipo"
                        value={newTipo.percentual_imposto ?? ""}
                        handleChange={handleInput}
                    />
                </FormCadastro>
                <div className="container-tipos">
                    <button
                        className="show-tipos"
                        onClick={() => setShowTipos((showTipos) => !showTipos)}
                    >
                        {showTipos ? (
                            <AiOutlineArrowRight className="up" />
                        ) : (
                            <AiOutlineArrowRight className="down" />
                        )}
                    </button>
                    {showTipos && tiposMap()}
                </div>
            </div>
        </div>
    );
}

export default TiposProdutos;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Message from "../layout/Message";
import Input from "../layout/Input";
import Loading from "../layout/Loading";
import FormCadastro from "../layout/FormCadastro";
import axios from "axios";

function EdicaoTipo() {
    const { id } = useParams();

    const [tipo, setTipo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const checkSpecialChar = (char = "") => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        return specialChars.test(char);
    };

    const checkTipoInfo = () => {
        if (tipo.nome && tipo.percentual_imposto) {
            if (checkSpecialChar(tipo.nome)) {
                setMessage("Nome com caracteres especiais!");
                setType("error");
                return false;
            }

            if (tipo.percentual_imposto < 0) {
                setMessage("Imposto negativo não existe!");
                setType("error");
                return false;
            }

            return true;
        }

        return false;
    };

    const attTipo = async () => {
        if (checkTipoInfo()) {
            try {
                let body = new URLSearchParams();
                body.append("nome", tipo.nome);
                body.append("percentual_imposto", tipo.percentual_imposto);

                const { data } = await axios.post(
                    "http://localhost/tipo/" + id + "?action=update",
                    body
                );

                setMessage(data.message);
                setType(data.status);
            } catch (err) {
                setMessage(err.response.data.message);
                setType(err.response.data.status);
            }
        }
    };

    const changeInput = (event) => {
        setTipo((tipo) => {
            return {
                ...tipo,
                [event.target.name]: event.target.value,
            };
        });
    };

    useEffect(() => {
        setIsLoading(true);

        const getTipo = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost/tipo/" + id + "?action=get"
                );

                setTipo(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        getTipo();
    }, []);

    return (
        <div className="conteudo-principal">
            <div className="edicao-produto">
                <FormCadastro
                    title="Edição de Tipo do Produto"
                    handleSubmit={attTipo}
                >
                    {message.length > 0 && (
                        <Message
                            text={message}
                            type={type}
                            handleTimeOut={setMessage}
                            className="tipo-message"
                        />
                    )}
                    {Object.keys(tipo).length > 0 ? (
                        <>
                            <Input
                                text="Nome"
                                type="text"
                                handleChange={changeInput}
                                className="cadastro-input"
                                placeholder="Nome do Produto"
                                name="nome"
                                value={tipo.nome || null}
                            />
                            <Input
                                value={tipo.percentual_imposto || null}
                                text="% Imposto"
                                type="number"
                                handleChange={changeInput}
                                placeholder="Percentual de Imposto"
                                name="percentual_imposto"
                            />
                        </>
                    ) : isLoading ? (
                        <Loading />
                    ) : (
                        <p className="sem-produto-edicao">
                            Sem informações de Tipo de Produto!
                        </p>
                    )}
                </FormCadastro>
            </div>
        </div>
    );
}

export default EdicaoTipo;

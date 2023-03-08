import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FormCadastro from "../layout/FormCadastro";
import Input from "../layout/Input";
import Select from "../layout/Select";
import Message from "../layout/Message";
import Loading from "../layout/Loading";

function EdicaoProduto() {
    const [produto, setProduto] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [tipos, setTipos] = useState([]);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const { id } = useParams();

    const checkSpecialChar = (char = "") => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        return specialChars.test(char);
    };

    const patchProduto = async () => {
        if (Object.keys(produto).length === 0) {
            setMessage("Você não pode editar um produto que NÃO existe!");
            setType("error");
            return;
        }

        if (
            produto.nome &&
            Object.keys(produto.tipo).length > 0 &&
            produto.valor
        ) {
            if (checkSpecialChar(produto.nome)) {
                setMessage("Nome com caracteres especiais!");
                setType("error");
                return;
            }

            if (produto.valor < 1) {
                setMessage("Valor negativo não permitido!");
                setType("error");
                return;
            }

            try {
                let body = new URLSearchParams();
                body.append("nome", produto.nome);
                body.append("valor", produto.valor);
                body.append("tipo", produto.tipo.codigo);

                const { data } = await axios.post(
                    "http://localhost/produto/" +
                        produto.codigo +
                        "?action=update",
                    body
                );

                await getProduto();

                setMessage(data.message);
                setType(data.status);
            } catch (err) {
                setMessage(err.response.data.message);
                setType(err.response.data.status);
            }

            return;
        }

        setMessage("Preencha todas as informações!");
        setType("error");
    };

    const changeInput = (event) => {
        setProduto((newProduto) => ({
            ...newProduto,
            [event.target.name]: event.target.value,
        }));
    };

    const changeSelect = (codigo) => {
        const tipo = tipos.find((tipo) => tipo.codigo == codigo);

        setProduto((newProduto) => ({
            ...newProduto,
            tipo,
        }));
    };

    const getProduto = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "http://localhost/produto/" + id + "?action=get"
            );

            const data = response.data.data;
            setProduto(data);
        } catch (err) {
            setMessage("ID inválido ou produto não localizado!");
            setType("error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getTipos = async () => {
            const response = await axios.get(
                "http://localhost/tipo?action=get"
            );

            setTipos(response.data.data);
        };

        getTipos();
        getProduto();
    }, []);

    return (
        <div className="conteudo-principal">
            <section className="edicao-produto">
                {message.length > 0 && <Message text={message} type={type} />}
                <FormCadastro
                    title="Edição de Produto"
                    handleSubmit={patchProduto}
                >
                    {Object.keys(produto).length > 0 ? (
                        <>
                            <Input
                                handleChange={changeInput}
                                text="Nome"
                                type="text"
                                className="cadastro-input"
                                placeholder="Nome do Produto"
                                name="nome"
                                value={produto.nome || null}
                            />
                            <Input
                                value={produto.valor || null}
                                handleChange={changeInput}
                                text="Valor"
                                type="number"
                                placeholder="Valor unitário"
                                name="valor"
                            />
                            <Select
                                handleChange={changeSelect}
                                value={produto.tipo.codigo}
                                text="Tipo"
                                options={tipos}
                                placeholder="Tipo do Produto"
                                name="tipo"
                            />
                        </>
                    ) : isLoading ? (
                        <Loading />
                    ) : (
                        <p className="sem-produto-edicao">
                            Sem informações de produto!
                        </p>
                    )}
                </FormCadastro>
            </section>
        </div>
    );
}

export default EdicaoProduto;

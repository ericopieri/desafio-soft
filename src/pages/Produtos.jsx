import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import FormCadastro from "../layout/FormCadastro";
import Input from "../layout/Input";
import Select from "../layout/Select";
import Message from "../layout/Message";
import Loading from "../layout/Loading";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Produtos() {
    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const mySwal = withReactContent(Swal);

    const [produtos, setProdutos] = useState([]);
    const [message, setMessage] = useState([""]);
    const [type, setType] = useState([""]);
    const [newProduto, setNewProduto] = useState({});
    const [tipos, setTipos] = useState([]);

    const checkSpecialChar = (char = "") => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        return specialChars.test(char);
    };

    const postNewProduto = async () => {
        if (
            newProduto.nome &&
            newProduto.valor !== undefined &&
            newProduto.tipo
        ) {
            if (newProduto.valor < 0) {
                setMessage("Valor negativo não suportado!");
                setType("error");
                return null;
            }

            if (checkSpecialChar(newProduto.nome)) {
                setMessage("Nome com caracteres especiais!");
                setType("error");
                return null;
            }

            try {
                const newProdutoParams = new URLSearchParams();
                newProdutoParams.append("nome", newProduto.nome);
                newProdutoParams.append("valor", newProduto.valor);
                newProdutoParams.append("tipo", newProduto.tipo);

                const { data } = await axios.post(
                    "http://localhost/produto?action=create",
                    newProdutoParams
                );

                setMessage(data.message ?? "");
                setType(data.status);

                getProdutos();
                setNewProduto({});
                setShowForm(false);
            } catch (error) {
                setMessage(error.response.data.message ?? "");
                setType(error.response.data.status ?? "");
            }
        } else {
            setMessage("Ainda faltam informações a serem preenchidas!");
            setType("error");
        }
    };

    const changeInput = (event) => {
        setNewProduto((newProduto) => ({
            ...newProduto,
            [event.target.name]: event.target.value,
        }));
    };

    const changeSelect = (codigo) => {
        setNewProduto((newProduto) => ({
            ...newProduto,
            tipo: Number(codigo),
        }));
    };

    const remove = async (codigo) => {
        mySwal
            .fire({
                title: "Tem certeza?",
                text: "Deletador este Tipo de Produto, deletará também todos os produtos associados a ele!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#008000",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.get(
                            "http://localhost/produto/" +
                                codigo +
                                "?action=delete"
                        );

                        mySwal.fire("Sucesso", "Produto deletado!", "success");

                        await getProdutos();
                    } catch (err) {
                        setMessage(err.response.data.message);
                        setType(err.response.data.status);
                    }
                }
            });
    };

    const produtosMap = () =>
        produtos.map((produto) => (
            <ProductCard
                produto={produto}
                handleRemove={remove}
                key={produto.codigo}
            />
        ));

    const getProdutos = async () => {
        setShowLoading(true);

        try {
            const { data } = await axios.get(
                "http://localhost/produto?action=get"
            );
            setProdutos(data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setShowLoading(false);
        }
    };

    const getTipos = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost/tipo?action=get"
            );

            setTipos(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getProdutos();
        getTipos();
    }, []);

    return (
        <div className="conteudo-principal">
            <section className="produtos">
                <h1 className="titulo-produtos">Produtos</h1>
                <p className="aproveite">
                    Confira os produtos que estão disponíveis em nossa Loja
                </p>
                {message && (
                    <Message
                        text={message}
                        handleTimeOut={setMessage}
                        type={type}
                    />
                )}
                <section className="container-produtos">
                    {produtos.length > 0 ? (
                        produtosMap()
                    ) : showLoading ? (
                        <Loading />
                    ) : (
                        <p>Não há itens Cadastrados!</p>
                    )}
                </section>
                {showForm && (
                    <FormCadastro
                        handleSubmit={postNewProduto}
                        className="produtos-form"
                        title="Cadastro de um novo Produto"
                    >
                        <Input
                            handleChange={changeInput}
                            text="Nome"
                            type="text"
                            className="cadastro-input"
                            placeholder="Nome do Produto"
                            name="nome"
                            value={newProduto.nome || null}
                        />
                        <Input
                            value={newProduto.valor || null}
                            handleChange={changeInput}
                            text="Valor"
                            type="number"
                            placeholder="Valor unitário"
                            name="valor"
                        />
                        <Select
                            handleChange={changeSelect}
                            value={newProduto.tipo ?? ""}
                            text="Tipo"
                            options={tipos}
                            placeholder="Tipo do Produto"
                            name="tipo"
                        />
                    </FormCadastro>
                )}
                <button
                    onClick={() => setShowForm((showForm) => !showForm)}
                    className="button-pr cadastro-btn"
                >
                    {showForm
                        ? "Fechar Formulário"
                        : "Deseja cadastrar um novo produto?"}
                </button>
            </section>
        </div>
    );
}

export default Produtos;

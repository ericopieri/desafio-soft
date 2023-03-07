import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import FormCadastro from "../layout/FormCadastro";
import Input from "../layout/Input";
import Select from "../layout/Select";
import Message from "../layout/Message";
import Loading from "../layout/Loading";
import axios from "axios";

function Produtos() {
    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const [produtos, setProdutos] = useState([]);
    const [message, setMessage] = useState([""]);
    const [type, setType] = useState([""]);
    const [newProduto, setNewProduto] = useState({});
    const [tipos, setTipos] = useState([]);

    const postNewProduto = async () => {
        try {
            if (
                newProduto.nome &&
                newProduto.valor !== undefined &&
                newProduto.tipo
            ) {
                const newProdutoParams = new URLSearchParams();
                newProdutoParams.append("nome", newProduto.nome);
                newProdutoParams.append("valor", newProduto.valor);
                newProdutoParams.append("tipo", newProduto.tipo);

                const { data } = await axios.post(
                    "http://localhost/produto",
                    newProdutoParams
                );

                setMessage(data.message ?? "");
                setType(data.status);

                getProdutos();
                setNewProduto({});
                setShowForm(false);
            } else {
                setMessage("Ainda faltam informações a serem preenchidas!");
                setType("error");
            }
        } catch (error) {
            setMessage(error.response.data.message ?? "");
            setType(error.response.data.status ?? "");
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

    const produtosMap = () =>
        produtos.map((produto) => <ProductCard produto={produto} />);

    const getProdutos = async () => {
        setShowLoading(true);

        const { data } = await axios.get("http://localhost/produto");

        setShowLoading(false);
        setProdutos(data.data);
    };

    const getTipos = async () => {
        const { data } = await axios.get("http://localhost/tipo");

        setTipos(data.data);
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
                {message.length > 0 && (
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

import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import FormCadastro from "../layout/FormCadastro";
import Input from "../layout/Input";
import Select from "../layout/Select";
import axios from "axios";

function Produtos() {
    const [showForm, setShowForm] = useState(false);

    const [produtos, setProdutos] = useState([]);
    const [newProduto, setNewProduto] = useState({});
    const [tipos, setTipos] = useState([]);

    const postNewProduto = async () => {
        try {
            const newProdutoParams = new URLSearchParams();
            newProdutoParams.append("nome", newProduto.nome);
            newProdutoParams.append("valor", newProduto.valor);
            newProdutoParams.append("tipo", newProduto.tipo);

            const { data } = await axios.post("http://locahost/", newProduto);
            setProdutos([...produtos, data]);
            setNewProduto({});
            setShowForm(false);
        } catch (error) {
            console.log(error);
        }
    };

    const changeInput = (event) => {
        setNewProduto((produto) => ({
            ...newProduto,
            [event.target.name]: event.target.value,
        }));
    };

    const changeSelect = (codigo) => {
        console.log(codigo);
    };

    useEffect(() => console.log(newProduto), [newProduto]);

    useEffect(() => {
        const getProdutos = async () => {
            const { data } = await axios.get(
                "http://localhost/Desafio/produtos.php"
            );

            setProdutos(data);
        };

        const getTipos = async () => {
            const { data } = await axios.get(
                "http://localhost/Desafio/produtoPost.php"
            );

            setTipos(data);
        };

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
                <section className="container-produtos">
                    {produtos.map((produto) => (
                        <ProductCard produto={produto} />
                    ))}
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
                            placeholder="Nome do Produto"
                            name="nome"
                            className="cadastro-input"
                            value={newProduto.nome || null}
                        />
                        <Input
                            value={newProduto.valor || null}
                            handleChange={changeInput}
                            text="Valor"
                            type="number"
                            placeholder="Valor unitário"
                            name="valor"
                            className="cadastro-input"
                        />
                        <Select
                            handleChange={changeSelect}
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

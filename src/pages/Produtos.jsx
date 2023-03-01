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

    useEffect(() => {
        const getProdutos = async () => {
            const { data } = await axios.get(
                "http://localhost/Desafio/produtos.php"
            );

            setProdutos(data);
        };

        const getTipos = async () => {
            const { data } = await axios.get(
                "http://localhost/Desafio/tipoProduto.php"
            );

            setTipos(data);
        };

        getProdutos();
        getTipos();
    }, []);

    useEffect(() => {
        console.log(produtos);
    }, [produtos]);

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
                        className="produtos-form"
                        title="Cadastro de um novo Produto"
                    >
                        <Input
                            text="Nome"
                            type="text"
                            placeholder="Nome do Produto"
                            name="nome"
                            className="cadastro-input"
                        />
                        <Input
                            text="Valor"
                            type="number"
                            placeholder="Valor unitário"
                            name="nome"
                            className="cadastro-input"
                        />
                        <Select
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

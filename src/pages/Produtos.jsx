import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

function Produtos() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const getProdutos = async () => {
            const { data } = await axios.get(
                "http://localhost/Desafio/produtos.php"
            );

            setProdutos(data);
        };

        getProdutos();
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
            </section>
        </div>
    );
}

export default Produtos;

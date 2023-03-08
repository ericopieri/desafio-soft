import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import axios from "axios";
import IncluirProdutos from "../components/venda/IncluirProdutos";
import ConcluirVenda from "../components/venda/ConcluirVenda";

function Venda() {
    const [products, setProducts] = useState([]);
    const [itens, setItens] = useState([]);
    const [totalImpostos, setTotalImpostos] = useState(0.0);

    const removeItem = (id = false) => {
        const newItens = id ? itens.filter((item) => item.id !== id) : [];

        setItens(newItens);
    };

    const atualizarImpostos = () => {
        const newTotalImpostos = itens.reduce((accum, item) => {
            const percentual = item.produto.tipo.percentual_imposto / 100;

            return Number((accum + item.total * percentual).toFixed(2));
        }, 0);

        setTotalImpostos(newTotalImpostos);
    };

    const persistirVenda = async () => {
        if (itens.length > 0) {
            const totalValor = itens.reduce(
                (accum, item) => accum + item.total,
                0
            );

            const totalComImpostos = totalValor + totalImpostos;

            try {
                let venda = new URLSearchParams();
                venda.append("total", totalComImpostos);
                venda.append("itens", JSON.stringify(itens));

                const { data } = await axios.post(
                    "http://localhost/venda?action=create",
                    venda
                );

                setItens([]);
                setTotalImpostos(0);

                return data;
            } catch (err) {
                return err;
            }
        }
    };

    const incluirProduto = (newItem) => {
        setItens((itens) => [...itens, newItem]);
    };

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get(
                "http://localhost/produto?action=get"
            );
            setProducts(data.data);
        };

        getProducts();
    }, []);

    useEffect(() => {
        atualizarImpostos();
    }, [itens]);

    return (
        <div className="conteudo-principal">
            <section className="venda">
                <IncluirProdutos
                    products={products}
                    handleIncluir={incluirProduto}
                />
                <ConcluirVenda
                    itens={itens}
                    persistirVenda={persistirVenda}
                    imposto={totalImpostos}
                    handleRemove={removeItem}
                />
            </section>
        </div>
    );
}

export default Venda;

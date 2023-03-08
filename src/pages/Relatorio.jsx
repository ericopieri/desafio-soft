import React, { useEffect, useState } from "react";
import VendaCard from "../components/relatorio/VendaCard";
import Loading from "../layout/Loading";
import axios from "axios";

function Relatorio() {
    const [vendas, setVendas] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        setShowLoading(true);

        const getVendas = async () => {
            const { data } = await axios.get(
                "http://localhost/venda?action=get"
            );
            setShowLoading(false);
            setVendas(data.data);
        };

        getVendas();
    }, []);

    const vendasMap = () => {
        return vendas.map((venda) => <VendaCard venda={venda} />);
    };

    return (
        <div className="conteudo-principal relatorio">
            <section className="relatorio-vendas">
                <h1 className="titulo-produtos">Relatório de Vendas</h1>
                <div className="relatorio-vendas-container">
                    {vendas.length > 0 ? (
                        vendasMap()
                    ) : showLoading ? (
                        <Loading />
                    ) : (
                        <div>Não há vendas cadastradas na Base de Dados!</div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Relatorio;

import React, { useEffect, useState } from "react";
import VendaCard from "../components/relatorio/VendaCard";
import axios from "axios";

function Relatorio() {
    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        const getVendas = async () => {
            const { data } = await axios.get("http://localhost/vendas.php");
            setVendas(data);
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
                    ) : (
                        <div>Sem vendas Cadastradas!</div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Relatorio;

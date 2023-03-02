import React from "react";
import moment from "moment";
import ItemVendaCard from "../relatorio/ItemVendaCard";
import "moment/locale/pt-br";

function VendaCard({ venda }) {
    const itensMap = () => {
        return venda.itens.map((item, index) => {
            return <ItemVendaCard item={item} />;
        });
    };

    return (
        <div className="venda-card">
            <p className="data-venda">
                {moment(venda.data).format("DD [de] MMMM [de] YYYY") +
                    " às " +
                    moment(venda.data).format("HH:mm [horas]")}
            </p>
            <h4 className="itens-titulo">Itens</h4>
            {itensMap()}
        </div>
    );
}

export default VendaCard;

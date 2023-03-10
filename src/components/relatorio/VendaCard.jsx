import React from "react";
import moment from "moment";
import ItemVendaCard from "../relatorio/ItemVendaCard";
import "moment/locale/pt-br";

import impostoImagem from "../../img/imposto.png";

function VendaCard({ venda }) {
    const impostoTotal = venda.itens.reduce(
        (accum, item) => accum + item.total * (item.percentual_imposto / 100),
        0
    );

    const itensMap = () => {
        return venda.itens.map((item, index) => {
            return <ItemVendaCard item={item} key={item.codigo} />;
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
            <div className="imposto-item">
                <img src={impostoImagem} alt="Impostos" />
                <span>R$ {impostoTotal.toFixed(2)}</span>
            </div>
        </div>
    );
}

export default VendaCard;

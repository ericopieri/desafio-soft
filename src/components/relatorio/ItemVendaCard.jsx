import React from "react";
import moment from "moment";

function ItemVendaCard({ item }) {
    const checkDeletado = () => {
        if (item.produto_deletadoEm) {
            return " deletado";
        }

        return "";
    };

    const imposto =
        item.quantidade * item.produto_valor * (item.percentual_imposto / 100);

    return (
        <div className={"item-venda-card" + checkDeletado()}>
            <h4>
                {item.produto_nome}{" "}
                <span className="quantidade-item-venda">
                    ({item.quantidade}x)
                </span>
            </h4>
            <p className="preco-item-venda">
                Valor un.:{"  "}
                <span>R$ {item.produto_valor.toFixed(2)}</span>
            </p>
            <div className="total-item-venda">
                Total: <span>R$ {item.total.toFixed(2)}</span>
            </div>
            <div className="imposto-item-venda">
                Imposto: <span>R$ {imposto.toFixed(2)}</span>
            </div>
            {item.produto_deletadoEm && (
                <p className="deletado-p">
                    Produto <span>deletado</span> do sistema no dia{" "}
                    {moment(item.produto_deletadoEm).format(
                        "DD [de] MMMM [de] YYYY"
                    )}{" "}
                    às {moment(item.produto_deletadoEm).format("HH[h]mm")}
                </p>
            )}
        </div>
    );
}

export default ItemVendaCard;

import React from "react";

function ItemVendaCard({ item }) {
    const imposto =
        item.quantidade *
        item.produto.valor *
        (item.produto.tipo.percentual_imposto / 100);

    return (
        <div className="item-venda-card">
            <h4>
                {item.produto.nome}{" "}
                <span className="quantidade-item-venda">
                    ({item.quantidade}x)
                </span>
            </h4>
            <p className="preco-item-venda">
                Valor un.:{"  "}
                <span>R$ {item.produto.valor.toFixed(2)}</span>
            </p>
            <div className="total-item-venda">
                Total: <span>R$ {item.total.toFixed(2)}</span>
            </div>
            <div className="imposto-item-venda">
                Imposto: <span>R$ {imposto.toFixed(2)}</span>
            </div>
        </div>
    );
}

export default ItemVendaCard;

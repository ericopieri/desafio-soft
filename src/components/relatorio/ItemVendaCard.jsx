import React from "react";

function ItemVendaCard({ item }) {
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
                <span>R$ {item.produto.valor}</span>
            </p>
            <div className="total-item-venda">
                Total: <span>R$ {item.total}</span>
            </div>
        </div>
    );
}

export default ItemVendaCard;

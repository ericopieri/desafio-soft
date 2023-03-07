import React from "react";

function LinhaTabela({ item, handleClick, excluding }) {
    return (
        <tr
            onClick={() => {
                console.log(item.id);
                handleClick(item.id);
            }}
            className={excluding !== false ? "exclude" : ""}
        >
            <td className="left-text">
                {item.produto.codigo} - {item.produto.nome}
            </td>
            <td>{item.quantidade}</td>
            <td>R$ {item.produto.valor.toFixed(2)}</td>
            <td>R$ {item.total.toFixed(2)}</td>
        </tr>
    );
}

export default LinhaTabela;

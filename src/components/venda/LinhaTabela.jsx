import React from "react";

function LinhaTabela({ item, handleClickRemove }) {
    return (
        <tr>
            <td className="left-text">
                {item.produto.codigo} - {item.produto.nome}
            </td>
            <td>{item.quantidade}</td>
            <td>R$ {item.produto.valor.toFixed(2)}</td>
            <td>R$ {item.total.toFixed(2)}</td>
            <td>
                <button
                    className="button-ex-item"
                    onClick={() => handleClickRemove(item.id)}
                >
                    Excluir
                </button>
            </td>
        </tr>
    );
}

export default LinhaTabela;

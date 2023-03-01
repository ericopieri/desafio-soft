import React from "react";

function LinhaTabela({ item }) {
    const formataValorMonetario = (valor) => {
        return Number(valor).toFixed(2);
    };

    return (
        <tr>
            <td className="left-text">
                {item.produto.codigo} - {item.produto.nome}
            </td>
            <td>{item.quantidade}</td>
            <td>R$ {formataValorMonetario(item.produto.valor)}</td>
            <td>R$ {formataValorMonetario(item.total)}</td>
        </tr>
    );
}

export default LinhaTabela;

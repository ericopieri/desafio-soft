import React from "react";

function Tabela({ children, className, imposto }) {
    return (
        <table className={"tabela " + className}>
            <thead>
                <tr>
                    <th className="tabela-metade left-text">Produto</th>
                    <th>Quantidade</th>
                    <th>Valor un.</th>
                    <th>Total</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody className="corpo-tabela">{children}</tbody>
            <tfoot>
                <tr>
                    <th className="tabela-metade left-text">
                        Imposto calculado
                    </th>
                    <th>R$: {imposto}</th>
                </tr>
            </tfoot>
        </table>
    );
}

export default Tabela;

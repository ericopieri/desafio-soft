import React, { useState, useEffect } from "react";
import Tabela from "../venda/Tabela";
import LinhaTabela from "../../components/venda/LinhaTabela";
import ButtonPrimary from "../../layout/ButtonPrimary";
import Message from "../../layout/Message";

function ConcluirVenda({ itens, persistirVenda, imposto, handleRemove }) {
    const [excluding, setExcluding] = useState(false);

    const [message, setMessage] = useState(false);
    const [type, setType] = useState("");

    const fluxoPersistir = async () => {
        const response = await persistirVenda();

        setMessage(response.message);
        setType(response.status);
    };

    const itensMap = () => {
        return itens.map((item) => {
            return (
                <LinhaTabela
                    item={item}
                    handleClick={handleRemove}
                    excluding={excluding}
                />
            );
        });
    };

    return (
        <div className="half concluir">
            <div className="concluir-venda-actions">
                <button onClick={() => setExcluding((excluding) => !excluding)}>
                    Excluir
                </button>
                <button>Limpar</button>
            </div>
            {message.length > 0 && (
                <Message
                    text={message}
                    type={type}
                    handleTimeOut={setMessage}
                />
            )}
            <Tabela className="itens-compra" imposto={imposto}>
                {itens.length > 0 ? (
                    itensMap()
                ) : (
                    <tr id="sem-itens" className="center-text">
                        Não há itens adicionados à compra
                    </tr>
                )}
            </Tabela>
            <ButtonPrimary
                text="Concluir Venda"
                handleClick={fluxoPersistir}
                disabled={itens.length}
            />
        </div>
    );
}

export default ConcluirVenda;

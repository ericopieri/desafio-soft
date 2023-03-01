import React, { useState } from "react";
import Tabela from "../venda/Tabela";
import LinhaTabela from "../../components/venda/LinhaTabela";
import ButtonPrimary from "../../layout/ButtonPrimary";
import Message from "../../layout/Message";

function ConcluirVenda({ itens, persistirVenda, imposto }) {
    const [message, setMessage] = useState(false);
    const [type, setType] = useState("");

    const fluxoPersistir = async () => {
        await persistirVenda();

        setMessage("Venda cadastrada com Sucesso!");
        setType("success");
    };

    const itensMap = () => {
        return itens.map((item) => {
            return <LinhaTabela item={item} />;
        });
    };

    return (
        <div className="half concluir">
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
            <ButtonPrimary text="Concluir Venda" handleClick={fluxoPersistir} />
        </div>
    );
}

export default ConcluirVenda;

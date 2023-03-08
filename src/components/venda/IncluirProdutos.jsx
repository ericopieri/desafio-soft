import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "../../layout/Input";
import Select from "../../layout/Select.jsx";
import Message from "../../layout/Message.jsx";
import ButtonPrimary from "../../layout/ButtonPrimary";

function IncluirProdutos({ products, handleIncluir, imposto }) {
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const [newItem, setNewItem] = useState({
        quantidade: 1,
    });

    useEffect(() => {
        const total =
            newItem.produto && newItem.quantidade
                ? Number(newItem.produto.valor) * Number(newItem.quantidade)
                : null;

        setNewItem((newItem) => ({
            ...newItem,
            total,
        }));
    }, [newItem.produto, newItem.quantidade]);

    const verificarInfos = () => {
        if (!newItem.produto || !newItem.quantidade) {
            setMessage("Preencha todas as informações!");
            setType("error");
            return;
        }

        if (newItem.quantidade < 1) {
            setNewItem((newItem) => ({
                ...newItem,
                quantidade: 1,
            }));
            setMessage("Quantidade abaixo de 1 não permitida!");
            setType("error");
            return;
        }

        handleIncluir({
            ...newItem,
            id: uuidv4(),
        });

        setMessage("Novo item de compra Adicionado com sucesso!");
        setType("success");
        setNewItem({
            quantidade: 1,
        });
    };

    const handleSelect = (codigo) => {
        const product = products.find((product) => product.codigo == codigo);

        setNewItem((newItem) => ({
            ...newItem,
            produto: { ...product },
            quantidade: 1,
        }));
    };

    const handleChangeInput = (event) => {
        setNewItem((newItem) => {
            return {
                ...newItem,
                [event.target.name]: event.target.value,
            };
        });
    };

    return (
        <section className="half incluir">
            {message.length > 0 && (
                <Message
                    text={message}
                    handleTimeOut={setMessage}
                    type={type}
                />
            )}
            <Select
                text="Produto"
                name="Produto"
                handleChange={handleSelect}
                options={products}
                placeholder="Selecione o Produto"
                value={newItem.produto?.codigo ?? null}
            />
            <div className="group-inputs">
                <Input
                    type="number"
                    className="input-clean"
                    name="quantidade"
                    handleChange={handleChangeInput}
                    placeholder="Qtd do produto"
                    text="Quantidade"
                    value={newItem.quantidade}
                />
                <Input
                    type="number"
                    name="valor-unitario"
                    placeholder="Valor unitário"
                    text="Valor unitário"
                    disabled
                    value={newItem.produto?.valor ?? null}
                />
                <Input
                    type="text"
                    name="preco"
                    placeholder="Preço Total"
                    text="Preço Total"
                    value={newItem.total ?? null}
                    disabled
                />
            </div>
            <ButtonPrimary text="Incluir" handleClick={verificarInfos} />
        </section>
    );
}

export default IncluirProdutos;

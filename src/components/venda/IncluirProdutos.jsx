import React, { useState, useEffect } from "react";
import Input from "../../layout/Input";
import Select from "../../layout/Select.jsx";
import ButtonPrimary from "../../layout/ButtonPrimary";

function IncluirProdutos({ products, handleIncluir, imposto }) {
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
        if (newItem.produto && newItem.quantidade) {
            handleIncluir(newItem);
            setNewItem({
                quantidade: 1,
            });
        }
    };

    const handleSelect = (codigo) => {
        const product = products.find((product) => product.codigo === codigo);

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

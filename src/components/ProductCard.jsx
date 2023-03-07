import React from "react";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";

function ProjectCard({ produto }) {
    return (
        <div className="product-card">
            <div className="product-actions">
                <button>
                    <BsFillTrashFill />
                </button>
                <button>
                    <BsPencilFill />
                </button>
            </div>
            <h3>{produto.nome}</h3>
            <p className="preco-produto">
                Preço: <span>R$ {produto.valor.toFixed(2)}</span>
            </p>
            <p className="tipo-produto">{produto.tipo.nome}</p>
        </div>
    );
}

export default ProjectCard;

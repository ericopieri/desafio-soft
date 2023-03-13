import React from "react";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function ProjectCard({ produto, handleRemove }) {
    return (
        <div className="product-card">
            <div className="product-actions">
                <Link onClick={() => handleRemove(produto.codigo)}>
                    <BsFillTrashFill />
                </Link>
                <Link to={"/produtos/editar/" + produto.codigo}>
                    <BsPencilFill />
                </Link>
            </div>
            <h3 title={produto.nome}>{produto.nome}</h3>
            <p className="preco-produto">
                Preço: <span>R$ {produto.valor.toFixed(2)}</span>
            </p>
            <p className="tipo-produto">{produto.tipo_nome}</p>
        </div>
    );
}

export default ProjectCard;

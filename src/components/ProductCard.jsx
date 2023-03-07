import React from "react";

function ProjectCard({ produto }) {
    return (
        <div className="product-card">
            <h3>{produto.nome}</h3>
            <p className="preco-produto">
                Preço: <span>R$ {produto.valor.toFixed(2)}</span>
            </p>
            <p className="tipo-produto">{produto.tipo.nome}</p>
        </div>
    );
}

export default ProjectCard;

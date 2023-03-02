import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo">
                Loja do mirante
            </Link>
            <nav className="menu">
                <ul>
                    <li>
                        <Link to="/venda">Venda</Link>
                    </li>
                    <li>
                        <Link to="/produtos">Produtos</Link>
                    </li>
                    <li>
                        <Link to="/tipos">Cadastro de Tipo de Produto</Link>
                    </li>
                    <li>
                        <Link to="/relatorio">Relatório</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

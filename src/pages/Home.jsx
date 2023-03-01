import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Home() {
    return (
        <div className="conteudo-principal home">
            <section className="bem-vindo">
                <h1 className="titulo-mirante">Bem-vindo à </h1>
                <div className="loja-mirante">
                    Loja do Mirante <FaShoppingCart className="icon-mirante" />
                </div>
                <p>Quer ver oque temos para te ofecerer? Clique aqui e</p>
                <Link to="/produtos" className="comece-comprar">
                    Comece a Comprar
                </Link>
            </section>
        </div>
    );
}

export default Home;

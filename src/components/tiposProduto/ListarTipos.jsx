import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import Loading from "../../layout/Loading";
import impostoImagem from "../../img/imposto.png";

function ListarTipos({ tipos }) {
    const [showTipos, setShowTipos] = useState(false);

    const tiposMap = () => {
        return (
            <div className="tipos-container">
                {tipos.map((tipo) => (
                    <div className="tipos-visu" key={tipo.codigo}>
                        <div className="product-actions">
                            <Link>
                                <BsFillTrashFill />
                            </Link>
                            <Link to={"/tipos/editar/" + tipo.codigo}>
                                <BsPencilFill />
                            </Link>
                        </div>
                        <h3>{tipo.nome}</h3>
                        <div className="imposto-item centralizado-imposto">
                            <img src={impostoImagem} alt="Impostos" />
                            <span>{tipo.percentual_imposto}%</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="tipos">
            {showTipos && (tipos.length > 0 ? tiposMap() : <Loading />)}
            <div className="tipos-button-div">
                <button onClick={() => setShowTipos((showTipos) => !showTipos)}>
                    {showTipos ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                </button>
            </div>
        </div>
    );
}

export default ListarTipos;

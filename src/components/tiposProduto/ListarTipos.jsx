import React, { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Loading from "../../layout/Loading";
import impostoImagem from "../../img/imposto.png";

function ListarTipos({ tipos }) {
    const [showTipos, setShowTipos] = useState(false);

    const tiposMap = () => {
        return (
            <div className="tipos-container">
                {tipos.map((tipo) => (
                    <div className="tipos-visu" key={tipo.codigo}>
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

import React, { useState, useEffect } from "react";
import Divider from "../layout/Divider";
import axios from "axios";
import ListarTipos from "../components/tiposProduto/ListarTipos";
import IncluirTipo from "../components/tiposProduto/IncluirTipo";

function TiposProdutos() {
    const [tipos, setTipos] = useState([]);

    const postNewTipo = async (newTipo) => {
        let newTipoParams = new URLSearchParams();
        newTipoParams.append("nome", newTipo.nome);
        newTipoParams.append("percentual_imposto", newTipo.percentual_imposto);

        const { data: tiposAtualizados } = await axios.post(
            "http://localhost/tipoProdutoPost.php",
            newTipoParams
        );

        setTipos(tiposAtualizados);
    };

    useEffect(() => {
        const getTipos = async () => {
            const { data } = await axios.get(
                "http://localhost/tipoProduto.php"
            );

            setTipos(data);
        };

        getTipos();
    }, []);

    return (
        <div className="conteudo-principal">
            <div className="tipos-produtos">
                <IncluirTipo postNewTipo={postNewTipo} />
                <Divider className="vertical" />
                <ListarTipos tipos={tipos} />
            </div>
        </div>
    );
}

export default TiposProdutos;

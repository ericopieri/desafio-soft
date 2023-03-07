import React, { useState, useEffect } from "react";
import Divider from "../layout/Divider";
import axios from "axios";
import ListarTipos from "../components/tiposProduto/ListarTipos";
import IncluirTipo from "../components/tiposProduto/IncluirTipo";

function TiposProdutos() {
    const [tipos, setTipos] = useState([]);

    const postNewTipo = async (newTipo) => {
        if (newTipo.nome && newTipo.percentual_imposto != undefined) {
            try {
                let newTipoParams = new URLSearchParams();
                newTipoParams.append("nome", newTipo.nome);
                newTipoParams.append(
                    "percentual_imposto",
                    newTipo.percentual_imposto
                );

                const { data } = await axios.post(
                    "http://localhost/tipo",
                    newTipoParams
                );

                return data;
            } catch (error) {
                return error.response.data;
            }
        }
    };

    const getTipos = async () => {
        const { data } = await axios.get("http://localhost/tipo");

        setTipos(data.data);
    };

    useEffect(() => {
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

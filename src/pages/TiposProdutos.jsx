import React, { useState, useEffect } from "react";
import Divider from "../layout/Divider";
import axios from "axios";
import ListarTipos from "../components/tiposProduto/ListarTipos";
import IncluirTipo from "../components/tiposProduto/IncluirTipo";

function TiposProdutos() {
    const [tipos, setTipos] = useState([]);

    const [showLoading, setShowLoading] = useState(false);

    const checkSpecialChar = (char = "") => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        return specialChars.test(char);
    };

    const postNewTipo = async (newTipo) => {
        if (newTipo.nome && newTipo.percentual_imposto !== undefined) {
            if (checkSpecialChar(newTipo.nome)) {
                return {
                    status: "error",
                    message: "Nome com caracteres especiais!",
                };
            }

            if (newTipo.percentual_imposto < 0) {
                return {
                    status: "error",
                    message: "Imposto negativo não existe!",
                };
            }

            try {
                let newTipoParams = new URLSearchParams();
                newTipoParams.append("nome", newTipo.nome);
                newTipoParams.append(
                    "percentual_imposto",
                    newTipo.percentual_imposto
                );

                const { data } = await axios.post(
                    "http://localhost/tipo?action=create",
                    newTipoParams
                );

                getTipos();
                return data;
            } catch (error) {
                return error.response.data;
            }
        }
    };

    const getTipos = async () => {
        try {
            setShowLoading(true);

            const { data } = await axios.get(
                "http://localhost/tipo?action=get"
            );

            setTipos(data.data);
        } catch (err) {
        } finally {
            setShowLoading(false);
        }
    };

    useEffect(() => {
        getTipos();
    }, []);

    return (
        <div className="conteudo-principal">
            <section className="tipos-produtos">
                <IncluirTipo postNewTipo={postNewTipo} />
                <Divider className="vertical" />
                <ListarTipos tipos={tipos} showLoading={showLoading} />
            </section>
        </div>
    );
}

export default TiposProdutos;

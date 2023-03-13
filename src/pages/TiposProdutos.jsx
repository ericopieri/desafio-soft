import React, { useState, useEffect } from "react";
import Divider from "../layout/Divider";
import axios from "axios";
import ListarTipos from "../components/tiposProduto/ListarTipos";
import IncluirTipo from "../components/tiposProduto/IncluirTipo";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function TiposProdutos() {
    const mySwal = withReactContent(Swal);
    const [tipos, setTipos] = useState([]);

    const [showLoading, setShowLoading] = useState(false);

    const checkSpecialChar = (char = "") => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        return specialChars.test(char);
    };

    const deleteTipo = (codigo) => {
        mySwal
            .fire({
                title: "Tem certeza?",
                text: "Deletador este Tipo de Produto, deletará também todos os produtos associados a ele!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#008000",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.get(
                            "http://localhost/tipo/" + codigo + "?action=delete"
                        );

                        mySwal.fire(
                            "Sucesso",
                            "Tipo de Produto deletado!",
                            "success"
                        );

                        getTipos();
                    } catch (error) {
                        mySwal.fire(
                            "Erro",
                            error.response.data.message,
                            "error"
                        );
                    }
                }
            });
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
                <ListarTipos
                    tipos={tipos}
                    showLoading={showLoading}
                    deleteTipo={deleteTipo}
                />
            </section>
        </div>
    );
}

export default TiposProdutos;

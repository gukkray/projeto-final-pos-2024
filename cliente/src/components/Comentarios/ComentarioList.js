import React, { useEffect, useState } from "react";
import { fetchData, deleteData } from "../../api";
import { useNavigate } from "react-router-dom";

const ComentarioList = () => {
    const [comentarios, setComentarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData("comentarios")
            .then(setComentarios)
            .catch((error) => {
                console.error("Erro ao buscar comentários:", error);
            });
    }, []);

    const handleDelete = (id) => {
        deleteData("comentarios", id)
            .then(() => {
                setComentarios(comentarios.filter((comentario) => comentario.id !== id));
            })
            .catch((error) => {
                console.error("Erro ao excluir comentário:", error);
            });
    };

    return (
        <div>
            <h1 style={{ textAlign: "center", color: "#333" }}>Comentários</h1>
            <button
                onClick={() => navigate("/comentarios/form")}
                style={{
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "block",
                    margin: "20px auto",
                }}
            >
                Novo Comentário
            </button>
            {comentarios.length === 0 ? (
                <p style={{ textAlign: "center" }}>Não há comentários registrados.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {comentarios.map((comentario) => (
                        <li
                            key={comentario.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                                marginBottom: "15px",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <p><strong>Nome:</strong> {comentario.nome}</p>
                            <p><strong>E-mail:</strong> {comentario.email}</p>
                            <p><strong>Comentário:</strong> {comentario.conteudo}</p>
                            <p><strong>Postagem:</strong> {comentario.postagem_titulo}</p>
                            <button
                                onClick={() => handleDelete(comentario.id)}
                                style={{
                                    padding: "10px",
                                    backgroundColor: "#FF6347",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ComentarioList;

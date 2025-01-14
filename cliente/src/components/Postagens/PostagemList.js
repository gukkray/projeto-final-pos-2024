import React, { useEffect, useState } from "react";
import { fetchData, deleteData } from "../../api";
import { useNavigate } from "react-router-dom";

const PostagemList = () => {
    const [postagens, setPostagens] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData("postagens")
            .then((data) => setPostagens(data))
            .catch((error) => {
                console.error("Erro ao buscar postagens:", error);
            });
    }, []);

    const handleDelete = (id) => {
        deleteData("postagens", id)
            .then(() => {
                setPostagens(postagens.filter((postagem) => postagem.id !== id));
            })
            .catch((error) => {
                console.error("Erro ao excluir postagem:", error);
            });
    };

    return (
        <div>
            <h1 style={{ textAlign: "center", color: "#333" }}>Postagens Criadas</h1>
            <button
                onClick={() => navigate("/postagens/form")}
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
                Nova Postagem
            </button>
            {postagens.length === 0 ? (
                <p style={{ textAlign: "center" }}>Não há postagens registradas.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {postagens.map((postagem) => (
                        <li
                            key={postagem.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                                marginBottom: "15px",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <h3>{postagem.titulo}</h3>
                            <p>{postagem.conteudo}</p>
                            <p>
                                <strong>Responsável:</strong> {postagem.usuario_nome}
                            </p>
                            <button
                                onClick={() => handleDelete(postagem.id)}
                                style={{
                                    padding: "10px",
                                    backgroundColor: "#FF6347",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    marginRight: "10px",
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

export default PostagemList;

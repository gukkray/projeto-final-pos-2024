import React, { useEffect, useState } from "react";
import { fetchData, deleteData } from "../../api";
import { useNavigate } from "react-router-dom";

const AlbumList = () => {
    const [albuns, setAlbuns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData("albuns")
            .then(setAlbuns)
            .catch((error) => {
                console.error("Erro ao buscar álbuns:", error);
            });
    }, []);

    const handleDelete = (id) => {
        deleteData("albuns", id)
            .then(() => {
                setAlbuns(albuns.filter((album) => album.id !== id));
            })
            .catch((error) => {
                console.error("Erro ao excluir álbum:", error);
            });
    };

    return (
        <div>
            <h1 style={{ textAlign: "center", color: "#333" }}>Álbuns</h1>
            <button
                onClick={() => navigate("/albuns/form")}
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
                Novo Álbum
            </button>
            {albuns.length === 0 ? (
                <p style={{ textAlign: "center" }}>Não há álbuns registrados.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {albuns.map((album) => (
                        <li
                            key={album.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                                marginBottom: "15px",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <p><strong>Título:</strong> {album.titulo}</p>
                            <p><strong>Usuário:</strong> {album.usuario_nome}</p>
                            <button
                                onClick={() => handleDelete(album.id)}
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

export default AlbumList;

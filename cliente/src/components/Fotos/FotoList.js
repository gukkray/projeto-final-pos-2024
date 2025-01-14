import React, { useEffect, useState } from "react";
import { fetchData, deleteData } from "../../api";
import { useNavigate } from "react-router-dom";

const FotoList = () => {
    const [fotos, setFotos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData("fotos")
            .then((data) => setFotos(data))
            .catch((error) => {
                console.error("Erro ao buscar fotos:", error);
            });
    }, []);

    const handleDelete = (id) => {
        deleteData("fotos", id)
            .then(() => {
                setFotos(fotos.filter((foto) => foto.id !== id));
            })
            .catch((error) => {
                console.error("Erro ao excluir foto:", error);
            });
    };

    return (
        <div>
            <h1 style={{ textAlign: "center", color: "#333" }}>Fotos</h1>
            <button
                onClick={() => navigate("/fotos/form")}
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
                Nova Foto
            </button>
            {fotos.length === 0 ? (
                <p style={{ textAlign: "center" }}>Não há fotos registradas.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {fotos.map((foto) => (
                        <li
                            key={foto.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                                marginBottom: "15px",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <h3>{foto.titulo}</h3>
                            <p><strong>Álbum:</strong> {foto.album}</p>
                            <img
                                src={foto.url_miniatura}
                                alt={foto.titulo}
                                width="100"
                                style={{ borderRadius: "8px" }}
                            />
                            <br />
                            <img
                                src={foto.url}
                                alt={foto.titulo}
                                width="300"
                                style={{ borderRadius: "8px", marginTop: "10px" }}
                            />
                            <br />
                            <button
                                onClick={() => handleDelete(foto.id)}
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

export default FotoList;

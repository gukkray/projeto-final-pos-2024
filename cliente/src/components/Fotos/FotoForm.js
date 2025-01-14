import React, { useState } from "react";
import { createData } from "../../api";
import { useNavigate } from "react-router-dom";

const FotoForm = () => {
    const [titulo, setTitulo] = useState("");
    const [url, setUrl] = useState("");
    const [urlMiniatura, setUrlMiniatura] = useState("");
    const [album, setAlbum] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        createData("fotos", { titulo, url, url_miniatura: urlMiniatura, album })
            .then(() => {
                setMensagem("Foto criada com sucesso!");
                setTitulo("");
                setUrl("");
                setUrlMiniatura("");
                setAlbum("");
                setTimeout(() => navigate("/fotos"), 1000); // Redireciona para a lista de fotos após 1s
            })
            .catch((error) => {
                console.error("Erro ao criar foto:", error);
                setMensagem("Erro ao criar foto.");
            });
    };

    return (
        <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h2 style={{ textAlign: "center", color: "#333" }}>Criar Foto</h2>
                {mensagem && <p style={{ color: "green", textAlign: "center" }}>{mensagem}</p>}

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Título da Foto
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o título da foto"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        URL da Foto
                    </label>
                    <input
                        type="url"
                        placeholder="Digite a URL da foto"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        URL da Miniatura
                    </label>
                    <input
                        type="url"
                        placeholder="Digite a URL da miniatura"
                        value={urlMiniatura}
                        onChange={(e) => setUrlMiniatura(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Álbum
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o nome do álbum"
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Criar Foto
                </button>
            </form>
        </div>
    );
};

export default FotoForm;

import React, { useState, useEffect } from "react";
import { createData, fetchData } from "../../api";
import { useNavigate } from "react-router-dom";

const AlbumForm = () => {
    const [titulo, setTitulo] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    // Carrega os usuários
    useEffect(() => {
        fetchData("usuarios")
            .then(setUsuarios)
            .catch((error) => {
                console.error("Erro ao buscar usuários:", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação dos campos
        if (!usuarioId || !titulo) {
            setMensagem("Por favor, preencha todos os campos.");
            return;
        }

        // Criar álbum com título e usuário responsável
        createData("albuns", { titulo, usuario_id: usuarioId })
            .then((novoAlbum) => {
                console.log("Álbum criado:", novoAlbum);
                setMensagem("Álbum criado com sucesso!");
                setTimeout(() => navigate("/albuns"), 1000); // Redireciona após 1s
            })
            .catch((error) => {
                console.error("Erro ao criar álbum:", error);
                setMensagem("Erro ao criar álbum.");
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
                <h2 style={{ textAlign: "center", color: "#333" }}>Criar Álbum</h2>
                {mensagem && <p style={{ color: "green", textAlign: "center" }}>{mensagem}</p>}

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Selecione o Usuário
                    </label>
                    <select
                        value={usuarioId}
                        onChange={(e) => setUsuarioId(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <option value="">Selecione o Usuário</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Título do Álbum
                    </label>
                    <input
                        type="text"
                        placeholder="Título do Álbum"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
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
                    Criar Álbum
                </button>
            </form>
        </div>
    );
};

export default AlbumForm;

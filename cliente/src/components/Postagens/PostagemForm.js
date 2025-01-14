import React, { useState, useEffect } from "react";
import { createData, fetchData } from "../../api";
import { useNavigate } from "react-router-dom";

const PostagemForm = () => {
    const [titulo, setTitulo] = useState("");
    const [conteudo, setConteudo] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData("usuarios")
            .then(setUsuarios)
            .catch((error) => console.error("Erro ao buscar usuários:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        createData("postagens", { titulo, conteudo, usuario: usuarioId })
            .then(() => {
                setMensagem("Postagem criada com sucesso!");
                setTitulo("");
                setConteudo("");
                setUsuarioId("");
                setTimeout(() => navigate("/postagens"), 1000); // Redireciona para a lista de postagens após 1s
            })
            .catch((error) => {
                console.error("Erro ao criar postagem:", error);
                setMensagem("Erro ao criar postagem.");
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
                <h2 style={{ textAlign: "center", color: "#333" }}>Criar Postagem</h2>
                {mensagem && <p style={{ color: "green", textAlign: "center" }}>{mensagem}</p>}

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Título da Postagem
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o título da postagem"
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
                        Conteúdo da Postagem
                    </label>
                    <textarea
                        placeholder="Digite o conteúdo da postagem"
                        value={conteudo}
                        onChange={(e) => setConteudo(e.target.value)}
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
                        Usuário Responsável
                    </label>
                    <select
                        value={usuarioId}
                        onChange={(e) => setUsuarioId(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                        required
                    >
                        <option value="">Selecione um usuário</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nome}
                            </option>
                        ))}
                    </select>
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
                    Criar Postagem
                </button>
            </form>
        </div>
    );
};

export default PostagemForm;

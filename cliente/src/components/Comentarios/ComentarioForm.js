import React, { useState, useEffect } from "react";
import { createData, fetchData } from "../../api";
import { useNavigate } from "react-router-dom";

const ComentarioForm = () => {
    const [postagemId, setPostagemId] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [conteudo, setConteudo] = useState("");
    const [postagens, setPostagens] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData("postagens")
            .then(setPostagens)
            .catch((error) => {
                console.error("Erro ao buscar postagens:", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            postagem: postagemId,
            nome,
            email,
            conteudo,
        };
        createData("comentarios", payload)
            .then(() => {
                setMensagem("Comentário adicionado com sucesso!");
                setNome("");
                setEmail("");
                setConteudo("");
                setPostagemId("");
                setTimeout(() => navigate("/comentarios"), 1000); // Redireciona após 1s
            })
            .catch((error) => {
                console.error("Erro ao criar comentário:", error);
                setMensagem("Erro ao adicionar comentário.");
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
                <h2 style={{ textAlign: "center", color: "#333" }}>Adicionar Comentário</h2>
                {mensagem && <p style={{ color: "green", textAlign: "center" }}>{mensagem}</p>}

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Selecione a Postagem
                    </label>
                    <select
                        value={postagemId}
                        onChange={(e) => setPostagemId(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <option value="">Selecione a Postagem</option>
                        {postagens.map((postagem) => (
                            <option key={postagem.id} value={postagem.id}>
                                {postagem.titulo}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Seu Nome
                    </label>
                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
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
                        Seu E-mail
                    </label>
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        Seu Comentário
                    </label>
                    <textarea
                        placeholder="Digite seu comentário"
                        value={conteudo}
                        onChange={(e) => setConteudo(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            minHeight: "100px",
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
                    Adicionar Comentário
                </button>
            </form>
        </div>
    );
};

export default ComentarioForm;

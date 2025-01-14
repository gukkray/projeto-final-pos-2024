import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TarefaForm = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState("");
    const [titulo, setTitulo] = useState("");
    const [concluido, setConcluido] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    // Busca usuários ao carregar o componente
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/usuarios/");
                if (response.ok) {
                    const data = await response.json();
                    setUsuarios(data);
                } else {
                    setMensagem("Erro ao carregar os usuários.");
                }
            } catch (error) {
                setMensagem("Erro na comunicação com a API.");
            }
        };
        fetchUsuarios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/tarefas/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usuario, titulo, concluido }),
            });

            if (response.ok) {
                setMensagem("Tarefa adicionada com sucesso!");
                setTitulo("");
                setConcluido(false);
                setUsuario("");
                setTimeout(() => navigate("/tarefas"), 1000); // Redireciona para a lista após 1s
            } else {
                const erro = await response.json();
                setMensagem(`Erro: ${erro.detail || "Não foi possível adicionar a tarefa."}`);
            }
        } catch (error) {
            setMensagem("Erro na comunicação com a API.");
        }
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
                <h2 style={{ textAlign: "center", color: "#333" }}>Adicionar Nova Tarefa</h2>
                {mensagem && <p style={{ color: "green", textAlign: "center" }}>{mensagem}</p>}

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Usuário
                    </label>
                    <select
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                        required
                    >
                        <option value="">Selecione um usuário</option>
                        {usuarios.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Título
                    </label>
                    <input
                        type="text"
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
                        Concluída
                    </label>
                    <input
                        type="checkbox"
                        checked={concluido}
                        onChange={(e) => setConcluido(e.target.checked)}
                        style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "10px",
                        }}
                    />
                    <span>Marque se a tarefa está concluída</span>
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
                    Salvar Tarefa
                </button>
            </form>
        </div>
    );
};

export default TarefaForm;

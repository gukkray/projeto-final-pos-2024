import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TarefasList = () => {
    const [tarefas, setTarefas] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/tarefas/")
            .then((response) => setTarefas(response.data))
            .catch((error) => {
                setError("Erro ao buscar tarefas.");
                console.error("Erro ao buscar tarefas:", error);
            });
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8000/api/tarefas/${id}/`)
            .then(() => setTarefas(tarefas.filter((tarefa) => tarefa.id !== id)))
            .catch((error) => console.error("Erro ao excluir tarefa:", error));
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ color: "#333" }}>Lista de Tarefas</h2>
                <button
                    onClick={() => navigate("/tarefas/form")}
                    style={{
                        padding: "10px 15px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    + Nova Tarefa
                </button>
            </div>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "#f4f4f4" }}>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Título</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Usuário</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.length > 0 ? (
                        tarefas.map((tarefa) => (
                            <tr key={tarefa.id}>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{tarefa.id}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{tarefa.titulo}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                    {tarefa.usuario_nome || "Usuário não informado"}
                                </td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                    {tarefa.concluido ? "Concluída" : "Não Concluída"}
                                </td>
                                <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                                    <button
                                        onClick={() => navigate(`/tarefas/form/${tarefa.id}`)}
                                        style={{
                                            marginRight: "10px",
                                            padding: "5px 10px",
                                            backgroundColor: "#2196F3",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "3px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(tarefa.id)}
                                        style={{
                                            padding: "5px 10px",
                                            backgroundColor: "#f44336",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "3px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="5"
                                style={{
                                    padding: "10px",
                                    textAlign: "center",
                                    border: "1px solid #ddd",
                                    color: "#999",
                                }}
                            >
                                Nenhuma tarefa encontrada.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TarefasList;

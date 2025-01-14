import React, { useState } from "react";
import { createData } from "../../api";
import { useNavigate } from "react-router-dom";

const UsuarioForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        createData("usuarios", { nome: name, email })
            .then(() => {
                setSuccess("Usuário criado com sucesso!");
                setTimeout(() => navigate("/usuarios"), 1000); // Redireciona após 1s
            })
            .catch((err) => {
                setError("Erro ao criar usuário. Verifique os dados.");
                console.error("Error creating usuario:", err.response?.data || err.message);
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
                <h2 style={{ textAlign: "center", color: "#333" }}>Criar Usuário</h2>
                {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Nome
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Digite o email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    Criar Usuário
                </button>
            </form>
        </div>
    );
};

export default UsuarioForm;

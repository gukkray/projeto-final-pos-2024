import React, { useEffect, useState } from "react";
import { fetchData } from "../../api";
import { Link } from "react-router-dom";

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData("usuarios")
            .then((data) => setUsuarios(data))
            .catch((err) => {
                setError("Erro ao carregar usuários.");
                console.error("Error fetching usuarios:", err.response?.data || err.message);
            });
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ color: "#333" }}>Lista de Usuários</h2>
                <Link
                    to="/usuarios/form"
                    style={{
                        padding: "10px 15px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "5px",
                        fontWeight: "bold",
                    }}
                >
                    + Novo Usuário
                </Link>
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
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Nome</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{usuario.id}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{usuario.nome}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{usuario.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="3"
                                style={{
                                    padding: "10px",
                                    textAlign: "center",
                                    border: "1px solid #ddd",
                                    color: "#999",
                                }}
                            >
                                Nenhum usuário encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UsuarioList;

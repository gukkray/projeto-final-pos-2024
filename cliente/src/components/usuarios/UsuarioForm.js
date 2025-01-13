import React, { useState } from "react";
import { createData } from "../../api";

const UsuarioForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        createData("usuarios", { nome: name, email })
            .then((newUsuario) => {
                setSuccess("Usuário criado com sucesso!");
                setName("");
                setEmail("");
                console.log("Usuario created:", newUsuario);
            })
            .catch((err) => {
                setError("Erro ao criar usuário. Verifique os dados.");
                console.error("Error creating usuario:", err.response?.data || err.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Usuario</h2>
            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UsuarioForm;

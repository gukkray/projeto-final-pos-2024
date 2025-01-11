import React, { useState } from "react";
import { createData } from "../../api";

const UsuarioForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        createData("usuarios", { nome: name, email, nome_usuario: name }).then((newUsuario) => {
            console.log("Usuario created:", newUsuario);
        }).catch((error) => {
            console.error("Error creating usuario:", error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Usuario</h2>
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

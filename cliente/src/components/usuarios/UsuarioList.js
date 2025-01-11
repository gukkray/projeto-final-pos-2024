import React, { useEffect, useState } from "react";
import { fetchData, deleteData } from "../../api";

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);

    // Busca os usuários ao carregar o componente
    useEffect(() => {
        fetchData("usuarios")
            .then(setUsuarios)
            .catch((error) => {
                console.error("Error fetching usuarios:", error);
            });
    }, []);

    // Função para excluir um usuário
    const handleDelete = (id) => {
        deleteData("usuarios", id)
            .then(() => {
                setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting usuario:", error);
            });
    };

    return (
        <div>
            <h1>Usuarios</h1>
            {usuarios.length === 0 ? (
                <p>No usuarios found.</p>
            ) : (
                <ul>
                    {usuarios.map((usuario) => (
                        <li key={usuario.id}>
                            {usuario.nome} ({usuario.email}){" "}
                            <button onClick={() => handleDelete(usuario.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsuarioList;

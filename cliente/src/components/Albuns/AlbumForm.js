import React, { useState, useEffect } from "react";
import { createData, fetchData } from "../../api";

const AlbumForm = () => {
    const [titulo, setTitulo] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [usuarios, setUsuarios] = useState([]);

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
        // Criar álbum com título e usuário responsável
        createData("albuns", { titulo, usuario_id: usuarioId })
            .then((novoAlbum) => {
                console.log("Álbum criado:", novoAlbum);
            })
            .catch((error) => {
                console.error("Erro ao criar álbum:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Criar Álbum</h2>

            {/* selecionar usuário */}
            <select
                value={usuarioId}
                onChange={(e) => setUsuarioId(e.target.value)}
                required
            >
                <option value="">Selecione o Usuário</option>
                {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                        {usuario.nome}
                    </option>
                ))}
            </select>

            {/* título do álbum */}
            <input
                type="text"
                placeholder="Título do Álbum"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />

            <button type="submit">Criar Álbum</button>
        </form>
    );
};

export default AlbumForm;

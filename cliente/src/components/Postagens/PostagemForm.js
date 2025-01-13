import React, { useState, useEffect } from "react";
import { createData, fetchData } from "../../api";

const PostagemForm = () => {
    const [titulo, setTitulo] = useState("");
    const [conteudo, setConteudo] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetchData("usuarios")
            .then(setUsuarios)
            .catch((error) => console.error("Erro ao buscar usuários:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        createData("postagens", { titulo, conteudo, usuario: usuarioId })
            .then((newPostagem) => {
                console.log("Postagem criada:", newPostagem);
            })
            .catch((error) => {
                console.error("Erro ao criar postagem:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Criar Postagem</h2>
            <input
                type="text"
                placeholder="Título da Postagem"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />
            <textarea
                placeholder="Conteúdo da Postagem"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                required
            />
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
            <button type="submit">Criar Postagem</button>
        </form>
    );
};

export default PostagemForm;

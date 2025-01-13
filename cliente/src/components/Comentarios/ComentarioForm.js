import React, { useState, useEffect } from "react";
import { createData, fetchData } from "../../api";

const ComentarioForm = () => {
    const [postagemId, setPostagemId] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [conteudo, setConteudo] = useState("");
    const [postagens, setPostagens] = useState([]);

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
            conteudo
        };
        console.log("Enviando os seguintes dados:", payload);

        createData("comentarios", payload)
            .then((novoComentario) => {
                console.log("Comentário criado:", novoComentario);
                alert("Comentário adicionado com sucesso!");
            })
            .catch((error) => {
                console.error("Erro ao criar comentário:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Adicionar Comentário</h2>

            <select
                value={postagemId}
                onChange={(e) => setPostagemId(e.target.value)}
                required
            >
                <option value="">Selecione a Postagem</option>
                {postagens.map((postagem) => (
                    <option key={postagem.id} value={postagem.id}>
                        {postagem.titulo}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Seu Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />

            <input
                type="email"
                placeholder="Seu E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <textarea
                placeholder="Seu Comentário"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                required
            />

            <button type="submit">Adicionar Comentário</button>
        </form>
    );
};

export default ComentarioForm;

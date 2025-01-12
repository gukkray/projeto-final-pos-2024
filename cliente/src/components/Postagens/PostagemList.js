import React, { useEffect, useState } from "react";
import { fetchData, deleteData } from "../../api";

const PostagemList = () => {
    const [postagens, setPostagens] = useState([]);

    // Busca as postagens ao carregar 
    useEffect(() => {
        fetchData("postagens")
            .then((data) => setPostagens(data))
            .catch((error) => {
                console.error("Error fetching postagens:", error);
            });
    }, []);

    // excluir uma postagem
    const handleDelete = (id) => {
        deleteData("postagens", id)
            .then(() => {
                setPostagens(postagens.filter((postagem) => postagem.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting postagem:", error);
            });
    };

    return (
        <div>
            <h1>Postagens Criadas</h1>
            {postagens.length === 0 ? (
                <p>Não há postagens registradas.</p>
            ) : (
                <ul>
                    {postagens.map((postagem) => (
                        <li key={postagem.id}>
                            <h3>{postagem.titulo}</h3>
                            <p>{postagem.conteudo}</p>
                            <p><strong>Responsável:</strong> {postagem.usuario_nome}</p>
                            <button onClick={() => handleDelete(postagem.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostagemList;

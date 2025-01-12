import React, { useEffect, useState } from "react";
import { fetchData, deleteData } from "../../api";

const ComentarioList = () => {
    const [comentarios, setComentarios] = useState([]);

    // Busca os comentários ao carregar 
    useEffect(() => {
        fetchData("comentarios")
            .then(setComentarios)
            .catch((error) => {
                console.error("Erro ao buscar comentários:", error);
            });
    }, []);

    //  excluir comentário
    const handleDelete = (id) => {
        deleteData("comentarios", id)
            .then(() => {
                setComentarios(comentarios.filter((comentario) => comentario.id !== id));
            })
            .catch((error) => {
                console.error("Erro ao excluir comentário:", error);
            });
    };

    return (
        <div>
            <h1>Comentários</h1>
            {comentarios.length === 0 ? (
                <p>Não há comentários registrados.</p>
            ) : (
                <ul>
                    {comentarios.map((comentario) => (
                        <li key={comentario.id}>
                            <p><strong>Nome:</strong> {comentario.nome}</p>
                            <p><strong>E-mail:</strong> {comentario.email}</p>
                            <p><strong>Comentário:</strong> {comentario.conteudo}</p>
                            <p><strong>Postagem:</strong> {comentario.postagem_titulo}</p>
                            <button onClick={() => handleDelete(comentario.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ComentarioList;

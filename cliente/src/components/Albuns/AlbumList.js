import React, { useEffect, useState } from "react";
import { fetchData, deleteData } from "../../api";

const AlbumList = () => {
    const [albuns, setAlbuns] = useState([]);

    // Busca álbuns ao carregar
    useEffect(() => {
        fetchData("albuns")
            .then(setAlbuns)
            .catch((error) => {
                console.error("Erro ao buscar álbuns:", error);
            });
    }, []);

    //  excluir um álbum
    const handleDelete = (id) => {
        deleteData("albuns", id)
            .then(() => {
                setAlbuns(albuns.filter((album) => album.id !== id));
            })
            .catch((error) => {
                console.error("Erro ao excluir álbum:", error);
            });
    };

    return (
        <div>
            <h1>Álbuns</h1>
            {albuns.length === 0 ? (
                <p>Não há álbuns registrados.</p>
            ) : (
                <ul>
                    {albuns.map((album) => (
                        <li key={album.id}>
                            <p><strong>Título:</strong> {album.titulo}</p>
                            <p><strong>Usuário:</strong> {album.usuario_nome}</p>
                            <button onClick={() => handleDelete(album.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AlbumList;

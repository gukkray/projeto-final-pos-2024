import React, { useEffect, useState } from "react";
import { fetchData, deleteData } from "../../api";

const FotoList = () => {
    const [fotos, setFotos] = useState([]);

    // Buscar as fotos ao carregar 
    useEffect(() => {
        fetchData("fotos")
            .then((data) => setFotos(data))
            .catch((error) => {
                console.error("Error fetching fotos:", error);
            });
    }, []);

    // excluir uma foto
    const handleDelete = (id) => {
        deleteData("fotos", id)
            .then(() => {
                setFotos(fotos.filter((foto) => foto.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting foto:", error);
            });
    };

    return (
        <div>
            <h1>Fotos</h1>
            {fotos.length === 0 ? (
                <p>Não há fotos registradas.</p>
            ) : (
                <ul>
                    {fotos.map((foto) => (
                        <li key={foto.id}>
                            <h3>{foto.titulo}</h3>
                            <p><strong>Álbum:</strong> {foto.album}</p>
                            <img src={foto.url_miniatura} alt={foto.titulo} width="100" />
                            <br />
                            <img src={foto.url} alt={foto.titulo} width="300" />
                            <br />
                            <button onClick={() => handleDelete(foto.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FotoList;

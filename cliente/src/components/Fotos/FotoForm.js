import React, { useState } from "react";
import { createData } from "../../api";

const FotoForm = () => {
    const [titulo, setTitulo] = useState("");
    const [url, setUrl] = useState("");
    const [urlMiniatura, setUrlMiniatura] = useState("");
    const [album, setAlbum] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Criar a foto com título, URL e miniatura
        createData("fotos", { titulo, url, url_miniatura: urlMiniatura, album }).then((newFoto) => {
            console.log("Foto criada:", newFoto);
        }).catch((error) => {
            console.error("Error criando foto:", error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Criar Foto</h2>

            {/* Campo para título da foto */}
            <input
                type="text"
                placeholder="Título da Foto"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />

            {/* Campo para URL da foto */}
            <input
                type="url"
                placeholder="URL da Foto"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />

            {/* Campo para URL da miniatura */}
            <input
                type="url"
                placeholder="URL da Miniatura"
                value={urlMiniatura}
                onChange={(e) => setUrlMiniatura(e.target.value)}
                required
            />

            {/* Campo para selecionar o álbum */}
            <input
                type="text"
                placeholder="Álbum"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                required
            />

            <button type="submit">Criar Foto</button>
        </form>
    );
};

export default FotoForm;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsuarioList from "./components/usuarios/UsuarioList";
import UsuarioForm from "./components/usuarios/UsuarioForm";
import TarefaList from "./components/tarefas/TarefaList";
import TarefaForm from "./components/tarefas/TarefaForm";
import PostagemForm from "./components/Postagens/PostagemForm";
import PostagemList from "./components/Postagens/PostagemList";
import FotoForm from "./components/Fotos/FotoForm";
import FotoList from "./components/Fotos/FotoList";
import ComentarioForm from "./components/Comentarios/ComentarioForm";
import ComentarioList from "./components/Comentarios/ComentarioList";
import AlbumForm from "./components/Albuns/AlbumForm";
import AlbumList from "./components/Albuns/AlbumList";

const routes = [
    { path: "/tarefas", element: <TarefaList /> },
    { path: "/tarefas/form", element: <TarefaForm /> },
    { path: "/tarefas/form/:id", element: <TarefaForm /> },
    { path: "/usuarios", element: <UsuarioList /> },
    { path: "/usuarios/form", element: <UsuarioForm /> },
    { path: "/postagens", element: <PostagemList /> },
    { path: "/postagens/form", element: <PostagemForm /> },
    { path: "/fotos", element: <FotoList /> },
    { path: "/fotos/form", element: <FotoForm /> },
    { path: "/comentarios", element: <ComentarioList /> },
    { path: "/comentarios/form", element: <ComentarioForm /> },
    { path: "/albuns", element: <AlbumList /> },
    { path: "/albuns/form", element: <AlbumForm /> },
];

function App() {
    return (
        <Router>
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <h1 style={{ textAlign: "center", color: "#333" }}>React API Cliente</h1>
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

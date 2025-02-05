import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Novo componente
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

function App() {
    return (
        <Router>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                {/* Sidebar */}
                <Sidebar />

                {/* Conteúdo Principal */}
                <div style={{ flex: 1, padding: "20px", fontFamily: "Arial, sans-serif" }}>
                    <h1 style={{ textAlign: "left", color: "#333" }}>React API Cliente</h1>
                    <Routes>
                        <Route path="/" element={<h2>Bem-vindo ao Sistema!</h2>} />
                        <Route path="/tarefas" element={<TarefaList />} />
                        <Route path="/tarefas/form" element={<TarefaForm />} />
                        <Route path="/tarefas/form/:id" element={<TarefaForm />} />
                        <Route path="/usuarios" element={<UsuarioList />} />
                        <Route path="/usuarios/form" element={<UsuarioForm />} />
                        <Route path="/postagens" element={<PostagemList />} />
                        <Route path="/postagens/form" element={<PostagemForm />} />
                        <Route path="/fotos" element={<FotoList />} />
                        <Route path="/fotos/form" element={<FotoForm />} />
                        <Route path="/comentarios" element={<ComentarioList />} />
                        <Route path="/comentarios/form" element={<ComentarioForm />} />
                        <Route path="/albuns" element={<AlbumList />} />
                        <Route path="/albuns/form" element={<AlbumForm />} />
                        <Route path="*" element={<h2>Página não encontrada!</h2>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

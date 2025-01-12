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

function App() {
    return (
        <Router>  {/* Adicionando o Router para habilitar as rotas */}
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <h1 style={{ textAlign: "center", color: "#333" }}>React API Cliente</h1>
                <Routes>
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;

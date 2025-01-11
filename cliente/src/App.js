import React from "react";
import UsuarioList from "./components/usuarios/UsuarioList";
import UsuarioForm from "./components/usuarios/UsuarioForm";

function App() {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>React API Client</h1>
            <UsuarioForm />
            <UsuarioList />
        </div>
    );
}

export default App;

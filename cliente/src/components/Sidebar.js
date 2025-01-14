import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const navStyle = {
        padding: "10px 20px",
        textDecoration: "none",
        color: "#333",
        fontWeight: "bold",
        display: "block",
    };

    const activeStyle = {
        backgroundColor: "#ddd",
        borderRadius: "5px",
    };

    return (
        <div style={{ width: "200px", background: "#f7f7f7", padding: "20px" }}>
            <h3 style={{ textAlign: "center" }}>Navegação</h3>
            <NavLink to="/tarefas" style={navStyle} activeStyle={activeStyle}>
                Tarefas
            </NavLink>
            <NavLink to="/usuarios" style={navStyle} activeStyle={activeStyle}>
                Usuários
            </NavLink>
            <NavLink to="/postagens" style={navStyle} activeStyle={activeStyle}>
                Postagens
            </NavLink>
            <NavLink to="/fotos" style={navStyle} activeStyle={activeStyle}>
                Fotos
            </NavLink>
            <NavLink to="/comentarios" style={navStyle} activeStyle={activeStyle}>
                Comentários
            </NavLink>
            <NavLink to="/albuns" style={navStyle} activeStyle={activeStyle}>
                Álbuns
            </NavLink>
        </div>
    );
};

export default Sidebar;

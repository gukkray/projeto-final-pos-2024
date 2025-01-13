import React, { useState, useEffect } from "react";

const TarefaForm = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [titulo, setTitulo] = useState("");
  const [concluido, setConcluido] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // Busca usuários ao carregar o componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/usuarios/");
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          setMensagem("Erro ao carregar os usuários.");
        }
      } catch (error) {
        setMensagem("Erro na comunicação com a API.");
      }
    };
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/tarefas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, titulo, concluido }),
      });

      if (response.ok) {
        setMensagem("Tarefa adicionada com sucesso!");
        setTitulo("");
        setConcluido(false);
        setUsuario("");
      } else {
        const erro = await response.json();
        setMensagem(`Erro: ${erro.detail || "Não foi possível adicionar a tarefa."}`);
      }
    } catch (error) {
      setMensagem("Erro na comunicação com a API.");
    }
  };

  return (
    <div>
      <h1>Adicionar Nova Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Usuário:
          <select value={usuario} onChange={(e) => setUsuario(e.target.value)} required>
            <option value="">Selecione um usuário</option>
            {usuarios.map((user) => (
              <option key={user.id} value={user.id}>
                {user.nome}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Concluído:
          <input
            type="checkbox"
            checked={concluido}
            onChange={(e) => setConcluido(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Salvar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default TarefaForm;

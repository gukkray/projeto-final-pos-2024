import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TarefasList = () => {
  const [tarefas, setTarefas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/tarefas/')

      .then(response => setTarefas(response.data))
      .catch(error => console.error('Erro ao buscar tarefas:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/tarefas/${id}/`)
      .then(() => setTarefas(tarefas.filter(tarefa => tarefa.id !== id)))
      .catch(error => console.error('Erro ao excluir tarefa:', error));
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <button onClick={() => navigate('/tarefas/form')}>Nova Tarefa</button>
      <ul>
  {tarefas.map(tarefa => (
    <li key={tarefa.id}>
      <strong>{tarefa.titulo}</strong>
      <p>Usuário: {tarefa.usuario_nome || 'Usuário não informado'}</p>
      <p>{tarefa.concluido ? 'Concluída' : 'Não Concluída'}</p>
      <button onClick={() => navigate(`/tarefas/form/${tarefa.id}`)}>Editar</button>
      <button onClick={() => handleDelete(tarefa.id)}>Excluir</button>
    </li>
  ))}
</ul>
    </div>
  );
};

export default TarefasList;

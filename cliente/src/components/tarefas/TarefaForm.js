import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TarefasForm = () => {
  const [titulo, setTitulo] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [concluido, setConcluido] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Carregar usuários ao carregar o formulário
  useEffect(() => {
    axios.get('/api/usuarios/')  // Endpoint para buscar os usuários
      .then(response => {
        setUsuarios(response.data);  // Atualiza o estado com os usuários
      })
      .catch(error => {
        console.error('Erro ao carregar usuários:', error);
      });

    // Carregar tarefa se houver o id (edição)
    if (id) {
      axios.get(`/api/tarefas/${id}/`)
        .then(response => {
          setTitulo(response.data.titulo);
          setUsuarioId(response.data.usuario.id);  // Supondo que a resposta tenha o id do usuário
          setConcluido(response.data.concluido);
        })
        .catch(error => {
          console.error('Erro ao carregar tarefa:', error);
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { titulo, usuario_id: usuarioId, concluido };

    const request = id
      ? axios.put(`/api/tarefas/${id}/`, payload)
      : axios.post('/api/tarefas/', payload);

    request
      .then(() => navigate('/tarefas'))
      .catch(error => console.error('Erro ao salvar tarefa:', error));
  };

  return (
    <div>
      <h1>{id ? 'Editar Tarefa' : 'Nova Tarefa'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Usuário</label>
          <select
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            required
          >
            <option value="">Selecione o Usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Concluído</label>
          <input
            type="checkbox"
            checked={concluido}
            onChange={(e) => setConcluido(e.target.checked)}
          />
        </div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate('/tarefas')}>Cancelar</button>
      </form>
    </div>
  );
};

export default TarefasForm;

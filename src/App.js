import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    const { data } = await api.get("repositories");

    setRepositories(data);
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    await api.post("repositories", {
      title: `Projeto novo ${Date.now()}`,
      url: "http://github.com/...",
      techs: [],
    });

    loadRepositories();
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    loadRepositories();
  }

  async function handleLikeRepository(id) {
    await api.post(`repositories/${id}/like`);

    loadRepositories();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title} ({repository.likes} likes)
            <button
              onClick={() => handleLikeRepository(repository.id)}
              class="like"
            >
              Like
            </button>
            <button
              onClick={() => handleRemoveRepository(repository.id)}
              class="remover"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

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
    const { data } = await api.post("repositories", {
      title: `Projeto novo ${Date.now()}`,
      url: "http://github.com/...",
      techs: [],
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  async function handleLikeRepository(id) {
    await api.post(`repositories/${id}/like`);

    await loadRepositories();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <span>({repository.likes} likes)</span>
            <button
              onClick={() => handleLikeRepository(repository.id)}
              className="like"
            >
              Like
            </button>
            <button
              onClick={() => handleRemoveRepository(repository.id)}
              className="remover"
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

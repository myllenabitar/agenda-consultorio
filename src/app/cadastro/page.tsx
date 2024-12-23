'use client';
import React, { useState } from 'react';
import Link from "next/link";

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const json = await response.json();
    if (response.ok) {
      alert('Cadastro realizado com sucesso!');
    } else {
      alert(`Erro: ${json.message}`);
    }
  };

  return (
    <div>
      <Link href="/" className="botao-home">⬅ Home</Link>
      <h1>Cadastro</h1>
      <form onSubmit={handleCadastro}>
      <label htmlFor="Nome Completo">Nome Completo:</label>
        <input
          type="nome"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

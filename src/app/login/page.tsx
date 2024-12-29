'use client';
import React, { useState } from 'react';
import Link from "next/link";

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const json = await response.json();
    if (response.ok) {
      alert('Login Feito com Sucesso!');
    } else {
      alert(`Erro: ${json.message}`);
    }
  };

  return (
    <div>
      <Link href="/" className="botao-home">⬅ Home</Link>
      <h1>Login</h1>
      <form onSubmit={handleCadastro}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

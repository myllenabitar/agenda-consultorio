'use client';
import React, { useState } from 'react';
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [usuario, setUsuario] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          setMensagem('Login bem-sucedido!');
          setUsuario(json.usuario.nome);
        } else {
          setMensagem(json.message || 'Erro ao realizar o login.');
          setUsuario(null);
        }
      })
      .catch(() => {
        setMensagem('Erro de rede. Tente novamente mais tarde.');
        setUsuario(null);
      });
  };

  return (
    <div>
      <Link href="/" className="botao-home">⬅ Home</Link>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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

        <button type="submit">Entrar</button>
        <Link href="/cadastro"> Ou Cadastre-se</Link>
      </form>

      {/* Mensagem de validação */}
      {mensagem && <p>{mensagem}</p>}

      {/* Usuário logado */}
      {usuario && (
        <div className="usuario-logado">
          <p>Usuário logado: {usuario}</p>
        </div>
      )}
    </div>
  );
}


import Link from "next/link";


export default function Page() {
  return (
    <main>
      <nav className="menu">
      <Link href="/">Home</Link>  
      <Link href="/consultas">Consultas</Link> 
      <Link href="/login">Login</Link> 
      <Link href="/cadastro">Cadastro</Link> 
    </nav>
    <h1>Home</h1>
    </main>
  );
}
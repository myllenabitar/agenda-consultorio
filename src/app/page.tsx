
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <nav className="menu">
      <Link href="/">Home</Link>  
      <Link href="/consultas">Consultas</Link>  
      <Link href="/login">Login</Link>
    </nav>
    </main>
  );
}
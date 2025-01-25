
import Link from "next/link";
import Head from "next/head";
import Carousel from "./components/Carousel"; 
import TreatmentBlocks from "./components/TreatmentBlocks";
import styles from '../styles/Home.module.css';

export default function Page() {
  const images = ["/images/image1.jpg"];

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Consultório Odontológico Bitar" />
        <meta name="keywords" content="odontologia, dentista, tratamento odontológico" />
        <meta name="description" content="Tratamentos odontológicos de qualidade." />
        <meta property="og:title" content="Consultório Odontológico Bitar" />
        <meta property="og:description" content="Tratamentos odontológicos de qualidade." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://consultorio-odontologico-bitar.vercel.app/" />
        <meta property="og:image" content="https://consultorio-odontologico-bitar.vercel.app/images/dentista.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Consultório Odontológico Bitar" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Consultório Odontológico Bitar" />
        <meta name="twitter:description" content="Tratamentos odontológicos de qualidade." />
        <meta name="twitter:image" content="https://consultorio-odontologico-bitar.vercel.app/images/dentista.png" />
        <meta name="twitter:image:alt" content="Consultório Odontológico Bitar" />

        <title>Consultório Odontológico Bitar</title>
        <meta name="description" content="Tratamentos odontológicos de qualidade." />
      </Head>
      <main>
      <div>
        <nav className="menu">
        <link rel="icon" href="/images/dentista.png" type="image/png" />
          <Link href="/">Home</Link>  
          <Link href="/consultas">Consultas</Link> 
          <Link href="/login">Login</Link> 
          <Link href="/cadastro">Cadastro</Link>
           
        </nav>
      <h1>Consutório Odontológico Bitar</h1>
      <Carousel images={images} />
        <div>
          <h1 style={{ textAlign: "center", margin: "20px 0" }}>Tratamentos que Oferecemos</h1>
      <TreatmentBlocks />
      </div>
        </div>
      </main>
      <footer>
        <div className={styles.footer}>
          <p>Agende já sua consulta!</p>
          <p>Telefone: (11) 99999-9999</p>
          <p>E-mail: myllena.odo@gmail.com</p>
          <p>Myllena Bitar &#169 2025. Todos os direitos reservados.</p>
        </div>
      </footer>

    </>
  );
}
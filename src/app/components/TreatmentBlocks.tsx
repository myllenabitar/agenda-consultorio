import Image from "next/image";
import styles from "./TreatmentBlocks.module.css";

const treatments = [
  { title: "Profilaxia", image: "/images/profilaxia.png", description: "Higiene bucal e prevenção de doenças." },
  { title: "Restauração", image: "/images/restauracao.png", description: "Reparos e restaurações dentárias." },
  { title: "Tratamento de Canal", image: "/images/canal.png", description: "Tratamentos de urgência e canais." },
  { title: "Exodontias", image: "/images/exodontia.png", description: "Extrações dentárias seguras." },
  { title: "Próteses Dentárias", image: "/images/proteses.png", description: "Reabilitação com próteses personalizadas." },
  { title: "Clareamento", image: "/images/clareamento.png", description: "Sorrisos mais brancos e saudáveis." },
];

export default function TreatmentBlocks() {
  return (
    <div className={styles.container}>
      {treatments.map((treatment, index) => (
        <div key={index} className={styles.block}>
          <Image 
            src={treatment.image} 
            alt={treatment.title} 
            width={200} 
            height={200} 
            className={styles.image}
          />
          <h3 className={styles.title}>{treatment.title}</h3>
          <p className={styles.description}>{treatment.description}</p>
        </div>
      ))}
    </div>
  );
}

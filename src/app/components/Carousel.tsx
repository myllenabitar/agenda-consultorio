'use client';
import Image from 'next/image';
import styles from './Carousel.module.css'; 

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
  return (
    <div className={styles.carousel}>
      <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          fill
          sizes="100vw"
          className="image"
          quality={90} 
          style={{
            objectFit: "cover",
          }}
        />
      ))}
    </div>
    </div>
  );
};

export default Carousel;


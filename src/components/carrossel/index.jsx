import { useState, useEffect } from "react";
import style from "./carrossel.module.css";

export default function Carrossel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    { id: 1, src: "/banner1.svg", alt: "Banner 1" },
    { id: 2, src: "/banner2.svg", alt: "Banner 2" },
  ];

  const totalSlides = banners.length;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-slide a cada 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className={style.carrossel}>
      <div className={style.carrosselContainer}>
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`${style.slide} ${
              index === currentSlide ? style.active : ""
            }`}
          >
            <img src={banner.src} alt={banner.alt} />
            {/* <div className={style.conteudo}>
              <h2 className={style.titulo}>
                <span className={style.especial}>Especial</span>
                <span className={style.destaque}>Adega</span>
              </h2>
              <p className={style.descricao}>
                Descubra as melhores ofertas e sabores,
                <br />
                com vinhos de diversas nacionalidades.
              </p>
              <button className={style.botaoAcao}>Clique aqui</button>
            </div> */}
          </div>
        ))}
      </div>

      <button
        className={`${style.botaoNavegacao} ${style.prev}`}
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button
        className={`${style.botaoNavegacao} ${style.next}`}
        onClick={nextSlide}
      >
        &gt;
      </button>

      <div className={style.indicadores}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={`${style.indicador} ${
              index === currentSlide ? style.ativo : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

import { useFiltro } from "../filtro/FiltroContext";
import { BiSolidOffer, BiSolidPear } from "react-icons/bi";
import style from "./navbar.module.css";
import { PiCarrotFill } from "react-icons/pi";
import { GiCoolSpices, GiGrain } from "react-icons/gi";
import { FaEgg } from "react-icons/fa6";
import { LuCupSoda } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { categoriaAtiva, setCategoriaAtiva } = useFiltro();
  const navbarRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Verificar posição de scroll para mostrar/esconder as setas
  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = navbarRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    };
    
    const navbar = navbarRef.current;
    if (navbar) {
      navbar.addEventListener('scroll', handleScroll);
      handleScroll(); // Verificar inicialmente
    }
    
    return () => {
      if (navbar) {
        navbar.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Função para filtrar por categoria
  const filtrarPorCategoria = (categoria) => {
    if (categoriaAtiva === categoria) {
      // Se clicar na mesma categoria, desativa
      setCategoriaAtiva("");
    } else {
      setCategoriaAtiva(categoria);
    }
  };

  // Função para rolar a navbar horizontalmente
  const scrollNavbar = (direction) => {
    if (!navbarRef.current) return;
    
    const scrollAmount = 200; // Quantidade de pixels para rolar
    const currentScroll = navbarRef.current.scrollLeft;
    
    navbarRef.current.scrollTo({
      left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <nav className={style.navbar} ref={navbarRef}>
      {isMobile && showLeftArrow && (
        <div className="swipe-indicator left" onClick={() => scrollNavbar('left')}>
          <FaChevronLeft />
        </div>
      )}
      
      <ul className={style.navbar__list}>
        <li
          className={`${style.navbar__item} ${
            categoriaAtiva === "Ofertas" ? style.ativo : ""
          }`}
          onClick={() => filtrarPorCategoria("Ofertas")}
        >
          <div className={style.navbar__item__icon}>
            <BiSolidOffer
              size={24}
              color={categoriaAtiva === "Ofertas" ? "#22c55e" : "#000"}
            />
          </div>
          <span
            className={categoriaAtiva === "Ofertas" ? style.textoAtivo : ""}
          >
            Ofertas
          </span>
        </li>
        <li
          className={`${style.navbar__item} ${
            categoriaAtiva === "Frutas" ? style.ativo : ""
          }`}
          onClick={() => filtrarPorCategoria("Frutas")}
        >
          <div className={style.navbar__item__icon}>
            <BiSolidPear
              size={24}
              color={categoriaAtiva === "Frutas" ? "#22c55e" : "#000"}
            />
          </div>
          <span className={categoriaAtiva === "Frutas" ? style.textoAtivo : ""}>
            Frutas
          </span>
        </li>
        <li
          className={`${style.navbar__item} ${
            categoriaAtiva === "Legumes" ? style.ativo : ""
          }`}
          onClick={() => filtrarPorCategoria("Legumes")}
        >
          <div className={style.navbar__item__icon}>
            <PiCarrotFill
              size={24}
              color={categoriaAtiva === "Legumes" ? "#22c55e" : "#000"}
            />
          </div>
          <span
            className={categoriaAtiva === "Legumes" ? style.textoAtivo : ""}
          >
            Legumes
          </span>
        </li>
        <li
          className={`${style.navbar__item} ${
            categoriaAtiva === "Temperos" ? style.ativo : ""
          }`}
          onClick={() => filtrarPorCategoria("Temperos")}
        >
          <div className={style.navbar__item__icon}>
            <GiCoolSpices
              size={24}
              color={categoriaAtiva === "Temperos" ? "#22c55e" : "#000"}
            />
          </div>
          <span
            className={categoriaAtiva === "Temperos" ? style.textoAtivo : ""}
          >
            Temperos
          </span>
        </li>
        <li
          className={`${style.navbar__item} ${
            categoriaAtiva === "Ovos" ? style.ativo : ""
          }`}
          onClick={() => filtrarPorCategoria("Ovos")}
        >
          <div className={style.navbar__item__icon}>
            <FaEgg
              size={24}
              color={categoriaAtiva === "Ovos" ? "#22c55e" : "#000"}
            />
          </div>
          <span className={categoriaAtiva === "Ovos" ? style.textoAtivo : ""}>
            Ovos
          </span>
        </li>
        <li
          className={`${style.navbar__item} ${
            categoriaAtiva === "Bebidas" ? style.ativo : ""
          }`}
          onClick={() => filtrarPorCategoria("Bebidas")}
        >
          <div className={style.navbar__item__icon}>
            <LuCupSoda
              size={24}
              color={categoriaAtiva === "Bebidas" ? "#22c55e" : "#000"}
            />
          </div>
          <span
            className={categoriaAtiva === "Bebidas" ? style.textoAtivo : ""}
          >
            Bebidas
          </span>
        </li>
        <li
          className={`${style.navbar__item} ${
            categoriaAtiva === "Nozes e Grãos" ? style.ativo : ""
          }`}
          onClick={() => filtrarPorCategoria("Nozes e Grãos")}
        >
          <div className={style.navbar__item__icon}>
            <GiGrain
              size={24}
              color={categoriaAtiva === "Nozes e Grãos" ? "#22c55e" : "#000"}
            />
          </div>
          <span
            className={
              categoriaAtiva === "Nozes e Grãos" ? style.textoAtivo : ""
            }
          >
            Nozes e Grãos
          </span>
        </li>
      </ul>
      
      {isMobile && showRightArrow && (
        <div className="swipe-indicator right" onClick={() => scrollNavbar('right')}>
          <FaChevronRight />
        </div>
      )}
    </nav>
  );
}

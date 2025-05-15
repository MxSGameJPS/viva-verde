import { useState } from "react";
import style from "./card.module.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Card({ produto }) {
  const [favorito, setFavorito] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!produto) return null;

  const handleAddToCart = () => {
    if (!user) {
      // Se não estiver logado, redirecionar para login
      navigate("/login");
      return;
    }

    // Preparar o produto para adicionar ao carrinho
    const produtoFormatado = {
      id: produto.id,
      name: produto.nome,
      price: produto.precoNovo ?? produto.preco ?? produto.precoAntigo,
      image: produto.img,
      unit: produto.unidade,
    };

    // Adicionar ao carrinho
    const success = addToCart(produtoFormatado);

    if (success) {
      // Feedback visual
      setAdicionado(true);
      setTimeout(() => setAdicionado(false), 1500);
    }
  };

  return (
    <div className={style.card}>
      <button
        className={style.favorito}
        onClick={() => setFavorito((prev) => !prev)}
        aria-label={favorito ? "Desfavoritar" : "Favoritar"}
        type="button"
      >
        {favorito ? (
          <MdFavorite color="#FF0000" size={24} />
        ) : (
          <MdFavoriteBorder color="#FF0000" size={24} />
        )}
      </button>
      {produto.img && (
        <img src={produto.img} alt={produto.nome} className={style.imagem} />
      )}
      <p className={style.nome}>{produto.nome}</p>
      {produto.precoAntigo && (
        <p className={style.precoAntigo}>
          Por:
          {produto.precoAntigo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          /{produto.unidade}
        </p>
      )}
      <p className={style.precoAtual}>
        <span>
          {(
            produto.precoNovo ??
            produto.preco ??
            produto.precoAntigo
          ).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <span className={style.unidade}> /{produto.unidade}</span>
      </p>
      <button
        className={`${style.adicionar} ${adicionado ? style.adicionado : ""}`}
        onClick={handleAddToCart}
        disabled={adicionado}
      >
        {adicionado ? "Adicionado ✓" : "Adicionar 🛒"}
      </button>
    </div>
  );
}

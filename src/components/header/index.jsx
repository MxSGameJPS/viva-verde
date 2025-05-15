import { AiOutlineShoppingCart } from "react-icons/ai";
import style from "./header.module.css";
import { FaLocationDot, FaRegCircleUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "../auth/useAuth";
import { useCart } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleCartClick = () => {
    if (user) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  // Calcular o número total de itens no carrinho
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header>
      <section className={style.header}>
        <div className={style.container}>
          <img
            src="/logo.svg"
            alt="logo"
            onClick={() => navigate("/")}
            className={style.logo}
          />
          <div className={style.search}>
            <input type="search" placeholder="Pesquisar" />
            <FiSearch className={style.searchIcon} />
          </div>
          <ul className={style.lista}>
            <li className={style.lista__item}>
              <div className={style.user}>
                <FaRegCircleUser size={28} color="#fff" />
              </div>
              <div className={style.userText}>
                <span>Bem-vindo</span>
                {user && user.name ? (
                  <button
                    className={style.userText__button}
                    onClick={handleProfileClick}
                  >
                    {user.name}
                  </button>
                ) : (
                  <button
                    className={style.userText__button}
                    onClick={() => navigate("/login")}
                  >
                    Entrar
                  </button>
                )}
              </div>
            </li>
            <li className={style.lista__item}>
              <div className={style.user}>
                <FaLocationDot size={28} color="#fff" />
              </div>
              <div className={style.userText}>
                <span>Entregar em:</span>
                <strong>
                  {user && user.address
                    ? user.address
                    : "Selecione um endereço"}
                </strong>
              </div>
            </li>
            <li className={style.lista__item} onClick={handleCartClick}>
              <div className={style.user}>
                <AiOutlineShoppingCart size={28} color="#fff" />
                {user && totalItems > 0 && (
                  <span className={style.cartBadge}>{totalItems}</span>
                )}
              </div>
              <div className={style.userText}>
                <strong>Meu</strong>
                <strong>Carrinho</strong>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </header>
  );
}

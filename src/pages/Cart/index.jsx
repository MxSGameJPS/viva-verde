import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../components/cart/CartContext";
import { useAuth } from "../../components/auth/useAuth";
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import style from "./cart.module.css";

export default function Cart() {
  const { user } = useAuth();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
    paymentMethod,
    setPaymentMethod,
    needChange,
    setNeedChange,
    changeFor,
    setChangeFor,
  } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    // Redirecionar para página de login se não estiver logado
    navigate("/login");
    return null;
  }

  if (orderPlaced) {
    return (
      <div className={style.orderSuccessContainer}>
        <div className={style.orderSuccessCard}>
          <h2 className={style.orderSuccessTitle}>
            Pedido Realizado com Sucesso!
          </h2>
          <p className={style.orderSuccessMessage}>
            Seu pedido foi recebido e está sendo processado. Em breve você
            receberá mais informações.
          </p>
          <div className={style.paymentDetails}>
            <p>
              <strong>Forma de pagamento:</strong>{" "}
              {paymentMethod === "pix"
                ? "PIX"
                : paymentMethod === "card"
                ? "Cartão na entrega"
                : "Dinheiro"}
            </p>
            {paymentMethod === "money" && needChange && (
              <p>
                <strong>Troco para:</strong> R$ {changeFor}
              </p>
            )}
          </div>
          <div className={style.orderActions}>
            <button
              className={style.backToHomeButton}
              onClick={() => navigate("/")}
            >
              Voltar para a Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    // Aqui seria feita a integração com API de pagamento
    // Por enquanto, apenas simulamos o processo
    clearCart();
    setOrderPlaced(true);
  };

  // Formatador de preços em reais
  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className={style.emptyCartContainer}>
        <div className={style.emptyCartCard}>
          <h2 className={style.emptyCartTitle}>Seu carrinho está vazio</h2>
          <p className={style.emptyCartMessage}>
            Adicione produtos ao seu carrinho para continuar comprando.
          </p>
          <button
            className={style.continueShopping}
            onClick={() => navigate("/")}
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.cartContainer}>
      <div className={style.cartContent}>
        <h1 className={style.cartTitle}>Meu Carrinho</h1>

        <div className={style.cartGrid}>
          <div className={style.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={style.cartItem}>
                <div className={style.productImage}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={style.productInfo}>
                  <h3 className={style.productName}>{item.name}</h3>
                  <p className={style.productPrice}>
                    {formatPrice(item.price)}
                  </p>
                </div>
                <div className={style.productQuantity}>
                  <button
                    className={style.quantityBtn}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinusCircle />
                  </button>
                  <span className={style.quantityValue}>{item.quantity}</span>
                  <button
                    className={style.quantityBtn}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <FaPlusCircle />
                  </button>
                </div>
                <div className={style.productTotal}>
                  <p>{formatPrice(item.price * item.quantity)}</p>
                </div>
                <button
                  className={style.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>

          <div className={style.cartSummary}>
            <h2 className={style.summaryTitle}>Resumo do Pedido</h2>

            <div className={style.summaryDetails}>
              <div className={style.summaryRow}>
                <span>Subtotal:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className={style.summaryRow}>
                <span>Frete:</span>
                <span>Grátis</span>
              </div>
              <div className={`${style.summaryRow} ${style.summaryTotal}`}>
                <span>Total:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
            </div>

            <div className={style.paymentMethods}>
              <h3 className={style.paymentTitle}>Forma de Pagamento</h3>

              <div className={style.paymentOptions}>
                <div className={style.paymentOption}>
                  <input
                    type="radio"
                    id="pix"
                    name="payment"
                    value="pix"
                    checked={paymentMethod === "pix"}
                    onChange={() => setPaymentMethod("pix")}
                  />
                  <label htmlFor="pix">PIX</label>
                </div>

                <div className={style.paymentOption}>
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <label htmlFor="card">Cartão na entrega</label>
                </div>

                <div className={style.paymentOption}>
                  <input
                    type="radio"
                    id="money"
                    name="payment"
                    value="money"
                    checked={paymentMethod === "money"}
                    onChange={() => setPaymentMethod("money")}
                  />
                  <label htmlFor="money">Dinheiro</label>
                </div>
              </div>

              {paymentMethod === "money" && (
                <div className={style.changeOptions}>
                  <div className={style.needChangeOption}>
                    <input
                      type="checkbox"
                      id="needChange"
                      checked={needChange}
                      onChange={(e) => setNeedChange(e.target.checked)}
                    />
                    <label htmlFor="needChange">Precisa de troco?</label>
                  </div>

                  {needChange && (
                    <div className={style.changeForInput}>
                      <label htmlFor="changeFor">Troco para:</label>
                      <div className={style.inputWithPrefix}>
                        <span className={style.currencyPrefix}>R$</span>
                        <input
                          type="number"
                          id="changeFor"
                          value={changeFor}
                          onChange={(e) => setChangeFor(e.target.value)}
                          placeholder="0,00"
                          min={getCartTotal()}
                          step="0.01"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              className={style.checkoutButton}
              onClick={handleCheckout}
              disabled={
                paymentMethod === "money" &&
                needChange &&
                (!changeFor || parseFloat(changeFor) < getCartTotal())
              }
            >
              Finalizar Compra
            </button>

            <button
              className={style.continueShoppingButton}
              onClick={() => navigate("/")}
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

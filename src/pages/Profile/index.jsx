import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/useAuth";
import style from "./profile.module.css";

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar para o login se não estiver autenticado
    if (!user) {
      navigate("/login");
      return;
    }

    // Preencher os campos com os dados do usuário
    setName(user.name || "");
    setAddress(user.address || "");
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(name, address);
    setSuccessMessage("Perfil atualizado com sucesso!");

    // Limpar a mensagem após 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className={style.profileContainer}>
      <div className={style.profileCard}>
        <h2 className={style.title}>Meu Perfil</h2>
        <p className={style.email}>{user.email}</p>

        {successMessage && (
          <div className={style.successMessage}>{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.inputGroup}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="address">Endereço de entrega</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Seu endereço completo"
              required
            />
          </div>

          <button type="submit" className={style.submitButton}>
            Salvar alterações
          </button>
        </form>

        <button onClick={handleLogout} className={style.logoutButton}>
          Sair da conta
        </button>

        <button onClick={() => navigate("/")} className={style.backButton}>
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
}

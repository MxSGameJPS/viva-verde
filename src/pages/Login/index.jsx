import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./login.module.css";
import { useAuth } from "../../components/auth/useAuth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (activeTab === "login") {
      // Tentativa de login
      const success = login(email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Credenciais inválidas. Tente admin@admin.com / Admin123");
      }
    } else {
      // Para fins de demo, vamos simular que o cadastro usa as mesmas credenciais
      login("admin@admin.com", "Admin123");
      navigate("/");
    }
  };

  const handleComeceBtnClick = () => {
    setActiveTab("cadastro");
  };

  return (
    <div className={style.container}>
      <div className={style.leftPanel}>
        <div className={style.card}>
          <img src="/logo.svg" alt="Logo Viva Verde" className={style.logo} />
          <p className={style.slogan}>
            Frescor e qualidade na sua mesa, da horta direto pra você
          </p>
          <button className={style.btnVerde} onClick={handleComeceBtnClick}>
            Vamos Começar
          </button>
          <small className={style.termos}>
            Criando sua conta você aceita nossos termos
          </small>
        </div>
      </div>

      <div className={style.rightPanel}>
        <div className={style.loginCard}>
          <div className={style.tabs}>
            <button
              className={`${style.tab} ${
                activeTab === "login" ? style.active : ""
              }`}
              onClick={() => setActiveTab("login")}
            >
              Acessar
            </button>
            <button
              className={`${style.tab} ${
                activeTab === "cadastro" ? style.active : ""
              }`}
              onClick={() => setActiveTab("cadastro")}
            >
              Cadastrar
            </button>
          </div>

          {error && <div className={style.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} className={style.form}>
            {activeTab === "cadastro" && (
              <>
                <div className={style.inputGroup}>
                  <label htmlFor="nome">Nome Completo</label>
                  <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>
                <div className={style.inputGroup}>
                  <label htmlFor="endereco">Endereço</label>
                  <input
                    type="text"
                    id="endereco"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    placeholder="Digite seu endereço completo"
                    required
                  />
                </div>
              </>
            )}

            <div className={style.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>

            {activeTab === "login" && (
              <div className={style.forgotPassword}>
                <a href="#">Esqueceu sua senha?</a>
              </div>
            )}

            <button type="submit" className={style.submitButton}>
              {activeTab === "login" ? "Entrar" : "Cadastrar"}
            </button>

            <div className={style.divider}>
              <span>ou continue com</span>
            </div>

            <div className={style.socialButtons}>
              <button type="button" className={style.googleButton}>
                <FcGoogle size={20} />
                <span>Google</span>
              </button>
              <button type="button" className={style.facebookButton}>
                <FaFacebookF size={20} color="#1877F2" />
                <span>Facebook</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

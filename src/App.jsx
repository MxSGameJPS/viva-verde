import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./global.css";
import Header from "./components/header";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { AuthProvider } from "./components/auth/AuthContext";
import { CartProvider } from "./components/cart/CartContext";
import Navbar from "./components/navbar/inde";
import { FiltroProvider } from "./components/filtro/FiltroContext";
import Footer from "./components/footer";
import Carrossel from "./components/carrossel";
import { useEffect } from "react";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Adiciona uma classe específica ao body quando estamos na página de login
    if (isLoginPage) {
      document.body.classList.add("login-page");
    } else {
      document.body.classList.remove("login-page");
    }

    return () => {
      document.body.classList.remove("login-page");
    };
  }, [isLoginPage]);

  return (
    <div className={isLoginPage ? "app-login" : ""}>
      {!isLoginPage && (
        <>
          <Header />
          <Navbar />
          {isHomePage && <Carrossel />}
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FiltroProvider>
            <AppContent />
          </FiltroProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

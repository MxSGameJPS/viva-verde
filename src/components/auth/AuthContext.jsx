import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Usuário padrão
const defaultUser = {
  email: "admin@admin.com",
  password: "Admin123",
  name: "Admin",
  address: "Av. Paulista, 1000",
};

export function AuthProvider({ children }) {
  // Verifica se já existe um usuário no localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Salva o usuário no localStorage sempre que ele mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  function login(email, password) {
    // Verifica se é o usuário padrão
    if (email === defaultUser.email && password === defaultUser.password) {
      const { password, ...userWithoutPassword } = defaultUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
  }

  function updateProfile(newName, newAddress) {
    if (user) {
      setUser({
        ...user,
        name: newName || user.name,
        address: newAddress || user.address,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

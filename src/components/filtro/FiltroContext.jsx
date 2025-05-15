import { createContext, useState, useContext } from "react";

// Criar o contexto
export const FiltroContext = createContext();

// Provider para envolver a aplicação
export const FiltroProvider = ({ children }) => {
  const [filtroSelecionado, setFiltroSelecionado] = useState(null);
  const [ordenacao, setOrdenacao] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <FiltroContext.Provider
      value={{
        filtroSelecionado,
        setFiltroSelecionado,
        ordenacao,
        setOrdenacao,
        categoriaAtiva,
        setCategoriaAtiva,
        filtersVisible,
        setFiltersVisible,
      }}
    >
      {children}
    </FiltroContext.Provider>
  );
};

// Hook personalizado para facilitar o uso do contexto
export const useFiltro = () => {
  return useContext(FiltroContext);
};

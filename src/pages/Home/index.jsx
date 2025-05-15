import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useFiltro } from "../../components/filtro/FiltroContext";
import ListaProdutos from "../../components/card/listaProdutos";
import style from "./style.module.css";

export default function Home() {
  const {
    filtroSelecionado,
    setFiltroSelecionado,
    ordenacao,
    setOrdenacao,
    categoriaAtiva,
    setCategoriaAtiva,
    filtersVisible,
    setFiltersVisible,
  } = useFiltro();

  // Função para alternar a visibilidade dos filtros no mobile
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <main className={style.main}>
      <div className={style.container}>
        {/* Sidebar de filtros */}
        <aside
          className={`${style.sidebar} filtros-sidebar ${
            filtersVisible ? "visible" : ""
          }`}
        >
          <div className={style.filtroHeader}>
            <h2>Filtros</h2>
            <button className={style.fechaFiltro} onClick={toggleFilters}>
              ×
            </button>
          </div>

          <div className={style.filtroGrupo}>
            <h3>Categorias</h3>
            <ul>
              <li>
                <button
                  className={categoriaAtiva === "Frutas" ? style.ativo : ""}
                  onClick={() => setCategoriaAtiva("Frutas")}
                >
                  Frutas
                </button>
              </li>
              <li>
                <button
                  className={categoriaAtiva === "Verduras" ? style.ativo : ""}
                  onClick={() => setCategoriaAtiva("Verduras")}
                >
                  Verduras
                </button>
              </li>
              <li>
                <button
                  className={categoriaAtiva === "Legumes" ? style.ativo : ""}
                  onClick={() => setCategoriaAtiva("Legumes")}
                >
                  Legumes
                </button>
              </li>
            </ul>
          </div>

          <div className={style.filtroGrupo}>
            <h3>Preço</h3>
            <select
              onChange={(e) => setOrdenacao(e.target.value)}
              value={ordenacao}
            >
              <option value="">Selecione</option>
              <option value="preco-menor">Menor preço</option>
              <option value="preco-maior">Maior preço</option>
            </select>
          </div>

          <div className={style.filtroGrupo}>
            <h3>Promoções</h3>
            <label>
              <input
                type="checkbox"
                checked={filtroSelecionado === "ofertas"}
                onChange={() => {
                  if (filtroSelecionado === "ofertas") {
                    setFiltroSelecionado(null);
                  } else {
                    setFiltroSelecionado("ofertas");
                  }
                }}
              />
              Ofertas
            </label>
          </div>
        </aside>

        {/* Seção de produtos */}
        <section className={style.content}>
          <div className={style.headerProdutos}>
            <h1>Produtos</h1>
          </div>

          {/* Renderizando ListaProdutos diretamente, sem a div que adiciona grid */}
          <ListaProdutos />
        </section>
      </div>

      {/* Botão de filtro para mobile */}
      <button className="filter-button-mobile" onClick={toggleFilters}>
        <FaFilter />
      </button>
    </main>
  );
}

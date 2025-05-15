import { useState, useEffect } from "react";
import style from "./Filtro.module.css";
import { useFiltro } from "./FiltroContext";

export default function Filtro() {
  const {
    categoriaAtiva,
    setCategoriaAtiva,
    filtroSelecionado,
    setFiltroSelecionado,
    ordenacao,
    setOrdenacao,
  } = useFiltro();

  const [categorias, setCategorias] = useState([]);
  const [precoRange, setPrecoRange] = useState([0, 70]); // Valores padrão para o filtro de preço

  useEffect(() => {
    // Buscar as categorias do arquivo JSON
    fetch("/produtos/produtos.json")
      .then((res) => res.json())
      .then((data) => {
        // Obtendo as categorias do objeto (são as chaves do objeto JSON)
        const cats = Object.keys(data);
        setCategorias(cats);
      })
      .catch((err) => {
        console.log("Erro ao buscar categorias:", err);
      });
  }, []);

  const handlePrecoChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const index = parseInt(e.target.dataset.index, 10);

    const novoRange = [...precoRange];
    novoRange[index] = value;

    setPrecoRange(novoRange);
  };

  return (
    <div className={style.filtros}>
      <h3>Filtros</h3>

      <div className={style.selectContainer}>
        <select
          value={categoriaAtiva || ""}
          onChange={(e) => setCategoriaAtiva(e.target.value)}
          className={style.select}
        >
          <option value="">Categoria</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className={style.selectContainer}>
        <select
          value={ordenacao || ""}
          onChange={(e) => setOrdenacao(e.target.value)}
          className={style.select}
        >
          <option value="">Ordenar por</option>
          <option value="preco-menor">Menor preço</option>
          <option value="preco-maior">Maior preço</option>
        </select>
      </div>

      <div className={style.checkboxContainer}>
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
          Mostrar apenas ofertas
        </label>
      </div>

      <div className={style.precoContainer}>
        <p>Preço</p>
        <div className={style.precoValores}>
          <span>R$ {precoRange[0]}</span>
          <span>R$ {precoRange[1]}</span>
        </div>
        <div className={style.sliderContainer}>
          <input
            type="range"
            min="0"
            max="70"
            value={precoRange[0]}
            data-index="0"
            onChange={handlePrecoChange}
            className={style.slider}
          />
          <input
            type="range"
            min="0"
            max="70"
            value={precoRange[1]}
            data-index="1"
            onChange={handlePrecoChange}
            className={style.slider}
          />
        </div>
      </div>
    </div>
  );
}

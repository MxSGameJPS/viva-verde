import { useEffect, useState } from "react";
import Card from "./index.jsx";
import style from "./listaProdutos.module.css";
import { useFiltro } from "../filtro/FiltroContext";

export default function ListaProdutos() {
  const { categoriaAtiva, filtroSelecionado, ordenacao } = useFiltro();
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [todosOsProdutos, setTodosOsProdutos] = useState([]);

  useEffect(() => {
    fetch("/produtos/produtos.json")
      .then((res) => res.json())
      .then((data) => {
        // Convertendo o objeto para um array de produtos
        const produtosArray = Object.entries(data).flatMap(
          ([categoria, produtos]) =>
            produtos.map((produto) => ({
              ...produto,
              categoria, // Adicionar a categoria a cada produto
            }))
        );
        setTodosOsProdutos(produtosArray);
        // Inicialmente, mostrar todos os produtos
        setProdutosFiltrados(produtosArray);
      })
      .catch((err) => {
        console.log("Erro ao buscar produtos:", err);
      });
  }, []);

  // Aplicar filtros quando eles mudarem
  useEffect(() => {
    if (!todosOsProdutos || todosOsProdutos.length === 0) return;

    let produtos = [...todosOsProdutos];

    // Filtrar por categoria
    if (categoriaAtiva && categoriaAtiva !== "") {
      produtos = produtos.filter(
        (produto) => produto.categoria === categoriaAtiva
      );
    }

    // Filtrar por ofertas
    if (filtroSelecionado === "ofertas") {
      produtos = produtos.filter(
        (produto) => produto.precoNovo && produto.precoAntigo
      );
    }

    // Ordenar produtos
    if (ordenacao === "preco-menor") {
      produtos.sort((a, b) => {
        const precoA = a.precoNovo || a.preco || a.precoAntigo || 0;
        const precoB = b.precoNovo || b.preco || b.precoAntigo || 0;
        return precoA - precoB;
      });
    } else if (ordenacao === "preco-maior") {
      produtos.sort((a, b) => {
        const precoA = a.precoNovo || a.preco || a.precoAntigo || 0;
        const precoB = b.precoNovo || b.preco || b.precoAntigo || 0;
        return precoB - precoA;
      });
    }

    // Atualizar a lista filtrada
    setProdutosFiltrados(produtos);
    console.log(
      "Aplicando filtros - Categoria:",
      categoriaAtiva,
      "Produtos:",
      produtos.length
    );
  }, [categoriaAtiva, filtroSelecionado, ordenacao, todosOsProdutos]);

  return (
    <div className={style.listaProdutos}>
      {Array.isArray(produtosFiltrados) ? (
        <>
          {produtosFiltrados.map((produto) => (
            <Card key={produto.id} produto={produto} />
          ))}
          {produtosFiltrados.length === 0 && (
            <p className={style.semProdutos}>
              Nenhum produto encontrado com os filtros selecionados.
            </p>
          )}
        </>
      ) : (
        <p className={style.semProdutos}>Carregando produtos...</p>
      )}
    </div>
  );
}

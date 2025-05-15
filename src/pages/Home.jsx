import style from "./Home.module.css";
import Ordenar from "../components/filtro/ordenar";
import ListaProdutos from "../components/card/listaProdutos";
import Filtro from "../components/filtro/Filtro";

export default function Home() {
  return (
    <>
      <div className={style.home}>
        <div className={style.lateral}>
          <Filtro />
        </div>
        <div className={style.conteudo}>
          <Ordenar />
          <ListaProdutos />
        </div>
      </div>
    </>
  );
}

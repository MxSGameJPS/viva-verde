import { useState } from "react";
import style from "./ordenar.module.css";

export default function Ordenar() {
  const [ordem, setOrdem] = useState("relevancia");

  return (
    <div className={style.ordenar}>
      <label htmlFor="ordem">Ordenar por:</label>
      <select
        id="ordenar-select"
        value={ordem}
        onChange={(e) => setOrdem(e.target.value)}
        >
        <option value="relevancia">Relevância</option>
        <option value="preco">Preço</option>
        <option value="nome">Nome</option>
        <option value="mais-vendidos">Mais vendidos</option>
        </select>
    </div>
  );
}

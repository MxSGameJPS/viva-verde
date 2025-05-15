import style from "./footer.module.css";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
  AiOutlineMail,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerContent}>
        <div className={style.footerLogo}>
          <img src="/logo.svg" alt="Logo Viva Verde" />
          <p>
            O Viva Verde é qualidade aliada a uma experiência única que valoriza
            o produtor, o meio ambiente e os nossos clientes.
          </p>
          <div className={style.socialIcons}>
            <a href="#" aria-label="Instagram">
              <AiOutlineInstagram size={24} />
            </a>
            <a href="#" aria-label="Twitter">
              <AiOutlineTwitter size={24} />
            </a>
            <a href="#" aria-label="WhatsApp">
              <AiOutlineWhatsApp size={24} />
            </a>
            <a href="#" aria-label="Email">
              <AiOutlineMail size={24} />
            </a>
          </div>
        </div>

        <div className={style.footerLinks}>
          <div className={style.footerColumn}>
            <h3>Institucional</h3>
            <ul>
              <li>
                <a href="#">Sobre nós</a>
              </li>
              <li>
                <a href="#">Sustentabilidade</a>
              </li>
              <li>
                <a href="#">Trabalhe conosco</a>
              </li>
            </ul>
          </div>

          <div className={style.footerColumn}>
            <h3>Suporte e informações</h3>
            <ul>
              <li>
                <a href="#">Central de ajuda</a>
              </li>
              <li>
                <a href="#">Como comprar</a>
              </li>
              <li>
                <a href="#">Prazos e entregas</a>
              </li>
              <li>
                <a href="#">Formas de pagamento</a>
              </li>
              <li>
                <a href="#">Trocas e devoluções</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={style.footerBottom}>
        <p>© 2023 Viva Verde. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

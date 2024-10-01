import '../assets/styles/Footer.css'
import { FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer>
      <ul>
        <li id="guide">
          <span className="title">Ajuda</span>

          <div className="links">
            <a href="/pagamento">
              <span>Pagamento</span>
            </a>

            <a href="/envio">
              <span>Envio</span>
            </a>

            <a href="/trocas-e-devolucoes">
              <span>Trocas e devoluções</span>
            </a>

            <a href="/guia-de-tamanhos">
              <span>Guia de tamanhos</span>
            </a>
          </div>
        </li>

        <li id="contact">
          <span className="title">Apoio ao cliente</span>

          <div className="links">
            <a href="/contato">
              <span>Contato</span>
            </a>

            <a href="/estado-do-pedido">
              <span>Estado do seu pedido</span>
            </a>
          </div>
        </li>

        <li id="company">
          <span className="title">Empresa</span>

          <div className="links">
            <a href="/quem-somos">
              <span>Quem somos</span>
            </a>
          </div>
        </li>

        <li id="social">
          <span className="title">Social</span>

          <div className="links">
            <a
              href="https://www.instagram.com/only.for.buddies/"
              target="_blank"
            >
              <FaInstagram />
            </a>
          </div>
        </li>
      </ul>
    </footer>
  )
}

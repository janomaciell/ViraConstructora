import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>VIRA CONSTRUCTORA</h3>
            <p>Construyendo futuro en Buenos Aires y la costa atlántica</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Navegación</h4>
              <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/proyectos">Proyectos</Link></li>
                <li><Link to="/servicios">Servicios</Link></li>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contacto</h4>
              <ul>
                <li>Constitución 1386 y Totoras</li>
                <li>Buenos Aires, Argentina</li>
                <li><a href="tel:+54111561684537">011-156168-4537</a></li>
                <li><a href="mailto:viraconstructora@gmail.com">viraconstructora@gmail.com</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Redes Sociales</h4>
              <ul>
                <li>
                  <a href="https://wa.me/549111561684537" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/viraconstructora" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} VIRA Constructora. Todos los derechos reservados.<br />
            <span className="programmer-credit">
              Programado por <a href="https://portfolio-jano-maciel.vercel.app/" target="_blank" rel="noopener noreferrer">Jano Maciel</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'
  const isContact = location.pathname === '/contacto'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location])

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/proyectos', label: 'PROYECTOS' },
    { path: '/servicios', label: 'SERVICIOS' },
    { path: '/nosotros', label: 'NOSOTROS' },
    { path: '/contacto', label: 'CONTACTO' }
  ]

  return (
    <header className={`header ${(isScrolled || !isHome || isContact) ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <img 
            src={isContact ? "/img/ViraColor.png" : "/img/ViraBlanco.png"}
            alt="VIRA Constructora" 
            className={`logo-image ${(isScrolled || !isHome || isContact) ? 'scrolled' : ''}`}
          />
        </Link>
        
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

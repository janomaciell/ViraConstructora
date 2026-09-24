import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './ui/Logo'
import Isotype from './ui/Isotype'
import ThemeToggle from './ui/ThemeToggle'
import LangToggle from './ui/LangToggle'
import { useLanguage } from '../i18n/language-context'
import useLockBodyScroll from '../hooks/useLockBodyScroll'
import './Header.css'

/** Rutas cuyo hero es media a pantalla completa: la nav va en blanco arriba. */
const MEDIA_HERO_ROUTES = ['/proyectos', '/servicios', '/nosotros']

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const progressRef = useRef(null)
  const { t } = useLanguage()

  const onMedia =
    MEDIA_HERO_ROUTES.includes(location.pathname) ||
    location.pathname.startsWith('/proyectos/')

  useLockBodyScroll(menuOpen)

  // Estado de scroll + barra de progreso, en un solo rAF
  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 24)

      const bar = progressRef.current
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
      }
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Cerrar el menú al navegar
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Escape cierra el menú
  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/proyectos', label: t.nav.projects },
    { to: '/servicios', label: t.nav.services },
    { to: '/nosotros', label: t.nav.about },
    { to: '/contacto', label: t.nav.contact },
  ]

  const tone = !scrolled && onMedia && !menuOpen ? 'media' : 'surface'

  return (
    <>
      <header
        className="site-header"
        data-tone={tone}
        data-scrolled={scrolled ? 'true' : 'false'}
        data-menu={menuOpen ? 'open' : 'closed'}
      >
        <div className="site-header__inner">
          <Link to="/" className="site-header__brand" aria-label={t.meta.brand}>
            <Logo tone={tone === 'media' ? 'dark' : 'auto'} width={172} priority />
          </Link>

          <nav className="site-header__nav" aria-label={t.nav.home}>
            <ul>
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `site-header__link ${isActive ? 'is-active' : ''}`
                    }
                  >
                    <Isotype className="site-header__link-mark" size={13} />
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <LangToggle className="site-header__toggle" />
            <ThemeToggle className="site-header__toggle" />

            <button
              type="button"
              className="menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? t.meta.closeMenu : t.meta.openMenu}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <span className="site-header__progress" ref={progressRef} aria-hidden="true" />
      </header>

      <div
        id="site-menu"
        className="site-menu"
        data-open={menuOpen ? 'true' : 'false'}
        aria-hidden={!menuOpen}
      >
        <nav className="site-menu__nav">
          <ul>
            {links.map((link, index) => (
              <li key={link.to} style={{ '--i': index }}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `site-menu__link ${isActive ? 'is-active' : ''}`
                  }
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span className="site-menu__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="site-menu__label">{link.label}</span>
                  <Isotype className="site-menu__mark" size={22} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-menu__foot" style={{ '--i': 5 }}>
          <a href={`mailto:${t.footer.email}`} className="site-menu__contact">
            {t.footer.email}
          </a>
          <a href="tel:+54111561684537" className="site-menu__contact">
            {t.footer.phone}
          </a>
        </div>
      </div>
    </>
  )
}

export default Header

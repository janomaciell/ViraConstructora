import { useEffect } from "react"
import "./About.css"
import WhatsAppButton from "../components/WhatsAppButton"
// Video importado desde public

const About = () => {
  const teamMembers = [
    { name: "ALEJANDRO RACCA", role: "MMO. LÍDER" },
    { name: "VICTORIA RAIGADA", role: "MMO. OFICINA TÉCNICA" },
    { name: "CARLOS CONTI", role: "TESORERO" },
    { name: "DAFNE N. G. ALIMIR", role: "MCP. ADMINISTRATIVA" },
  ]
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header')
      if (window.scrollY > 10) {
        header?.classList.add('scrolled')
      } else {
        header?.classList.remove('scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className="about-page">
      {/* Hero Section con video */}
      <section className="about-hero">
        <div className="hero-background">
          <video
            src="/img/ANCLA/videohabitaciones.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onLoadStart={() => console.log('About video loading')}
            onCanPlay={() => console.log('About video can play')}
            onError={(e) => console.error('About video error:', e)}
            onPlay={() => console.log('About video playing')}
          />
        </div>
        <div className="hero-overlay-about">
          <div className="hero-text">
            <h1>SOBRE NOSOTROS</h1>
          </div>
        </div>
      </section>

      {/* Intro Section - Fondo Negro */}
      <section className="about-intro-section">
        <div className="intro-container">
          <p className="intro-label">PRESENTACIÓN</p>
          <div className="intro-content">
            <p className="intro-text">
              Somos un equipo interdisciplinario de profesionales abocados a la construcción y desarrollo de viviendas
              y unidades funcionales en todo el partido de Pinamar y alrededores.
            </p>
            <p className="intro-text secondary">
              Nos especializamos en construcciones privadas, así como desarrollos en pozo propios y de terceros.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section - Fondo Blanco */}
      <section className="about-values-section">
        <div className="values-container">
          <h2 className="section-title">
            Construimos con <span className="title-light">valores</span>
          </h2>
          <p className="section-intro">
            Los 3 grandes valores que nos caracterizan y guían en todos los procesos son:
          </p>
        </div>
      </section>

      {/* Individual Values - Alternating backgrounds */}
      <section className="value-detail transparency">
        <div className="value-content-wrapper">
          <div className="value-text-side">
            <h3>La Transparencia</h3>
            <p>
              Mantenemos una comunicación clara y honesta en todos los procesos, informando constantemente sobre el
              avance y estado de cada proyecto.
            </p>
          </div>
        </div>
      </section>

      <section className="value-detail honesty">
        <div className="value-content-wrapper">
          <div className="value-text-side">
            <h3>La Honestidad</h3>
            <p>
              Actuamos con integridad en todas nuestras relaciones, cumpliendo con los compromisos adquiridos y
              manteniendo la confianza de nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      <section className="value-detail innovation">
        <div className="value-content-wrapper">
          <div className="value-text-side">
            <h3>La Innovación</h3>
            <p>
              Incorporamos las últimas tendencias en diseño y construcción, siempre buscando la excelencia
              arquitectónica y tecnológica.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section">
        <div className="stats-wrapper">
          <div className="stat-block">
            <div className="stat-number">+4</div>
            <p className="stat-label">Años de trayectoria</p>
          </div>
          <div className="stat-block">
            <div className="stat-number">47</div>
            <p className="stat-label">Viviendas y unidades funcionales</p>
          </div>
          <div className="stat-block">
            <div className="stat-number">4.370</div>
            <p className="stat-label">M² construidos y proyectados</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team-section">
        <div className="team-container">
          <p className="section-label">ORGANIGRAMA</p>
          <h2 className="team-title">Nuestro equipo</h2>
          <p className="team-intro">
            Nuestro equipo interdisciplinario está compuesto por profesionales especializados en diferentes áreas
          </p>
          <div className="team-list">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member-item">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="cta-content">
          <h2>¿Listo para tu próximo proyecto?</h2>
          <p>Estamos aquí para ayudarte a hacerlo realidad</p>
          <a href="/contacto" className="cta-link">
            Contactanos
          </a>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  )
}

export default About
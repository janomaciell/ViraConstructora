import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Projects.css'
import WhatsAppButton from '../components/WhatsAppButton'
// Video importado desde public

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('todos')

  const projects = [
    {
      id: 'ancla-i',
      title: 'ANCLA I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '180 M2 · 4 DORMITORIOS · 3 BAÑOS',
      description: 'Proyecto completo de construcción con diseño contemporáneo y terminaciones de primera calidad.',
      image: '/img/ANCLA/FACHADA 1.jpg',
      featured: true
    },
    {
      id: 'vulcano-i',
      title: 'VULCANO I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '145 M2 · 3 DORMITORIOS · 2 BAÑOS',
      description: 'Desarrollo integral con arquitectura moderna y espacios optimizados.',
      image: '/img/VULCANO/fachada vulcano.jpg',
    },
    {
      id: 'chape-i',
      title: 'CHAPE I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '155 M2 · 3 DORMITORIOS · 3 BAÑOS',
      description: 'Proyecto de construcción con diseño funcional y terminaciones premium.',
      image: '/img/CHAPE/CHAPE 1.jpg',
    },
    {
      id: 'dafna-i',
      title: 'DAFNA I',
      category: 'proyecto',
      location: 'PROYECTO Y DIRECCION',
      status: '155 M2 · 3 DORMITORIOS · 3 BAÑOS',
      description: 'Proyecto de diseño y dirección con arquitectura contemporánea.',
      image: '/img/DAFNEA/DAFNEA.jpg'
    },
    {
      id: 'dedalo-i',
      title: 'DEDALO I',
      category: 'proyecto',
      location: 'PROYECTO Y DIRECCION',
      status: '140 M2 · 3 DORMITORIOS · 3 BAÑOS',
      description: 'Desarrollo de proyecto y dirección con enfoque en la funcionalidad.',
      image: '/img/DEDALO1/DEDALO I.jpg'
    },
    {
      id: 'dedalo-ii',
      title: 'DEDALO II',
      category: 'construccion',
      location: 'CONSTRUCCION',
      status: '155 M2 · 3 DORMITORIOS · 3 BAÑOS',
      description: 'Construcción de vivienda con diseño moderno y espacios amplios.',
      image: '/img/DEDALO2/FAHCADA DEDALO II.jpg'
    },
    {
      id: 'positive-house-xii',
      title: 'POSITIVE HOUSE XII',
      category: 'construccion',
      location: 'CONSTRUCCION',
      status: '150 M2 · 3 DORMITORIOS · 3 BAÑOS',
      description: 'Construcción de vivienda con arquitectura sustentable y diseño innovador.',
      image: '/img/PH-XII/PH XII.jpg'
    },
    {
      id: 'positive-house-xiii',
      title: 'POSITIVE HOUSE XIII',
      category: 'construccion',
      location: 'CONSTRUCCION',
      status: '130 M2 · 3 DORMITORIOS · 2 BAÑOS',
      description: 'Construcción de vivienda con diseño contemporáneo y eficiencia energética.',
      image: ''
    },
    {
      id: 'barrio-coodopin',
      title: 'BARRIO CODOOPIN',
      category: 'direccion',
      location: 'DIRECCION DE OBRA',
      status: '1280 M2 · 18 VIVIENDAS',
      description: 'Dirección de obra para desarrollo de barrio con múltiples viviendas.',
      image: '/img/COODOPIN/CODOOPIN.jpg'
    },
    {
      id: 'niza-i',
      title: 'NIZA I',
      category: 'proyecto',
      location: 'PROYECTO',
      status: '350 M2 · 6 UNIDADES FUNCIONALES',
      description: 'Proyecto de desarrollo con múltiples unidades funcionales.',
      image: ''
    },
    {
      id: 'garzas-i',
      title: 'GARZAS I',
      category: 'construccion',
      location: 'CONSTRUCCION',
      status: '230 M2 · 3 DORMITORIOS · 2 BAÑOS',
      description: 'Construcción de vivienda con diseño moderno y espacios amplios.',
      image: '/img/GARZAS/GARZAS.jpg'
    },
    {
      id: 'progreso-y-biarritz',
      title: 'PROGRESO Y BIARRITZ',
      category: 'proyecto',
      location: 'PROYECTO Y FINAL DE OBRA',
      status: '435 M2 · 7 UNIDADES FUNCIONALES',
      description: 'Proyecto completo con finalización de obra para desarrollo multifamiliar.',
      image: '/img/PROGRESO-Y-BIARRITZ/PROGRESO.jpg'
    },
    {
      id: 'espartillo-i',
      title: 'ESPARTILLO I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '235 M2 · 4 DORMITORIOS · 3 BAÑOS',
      description: 'Proyecto integral con diseño contemporáneo y espacios amplios.',
      image: '/img/ESPARTILLO/ESPARTILLO.jpg'
    },
    {
      id: 'corbeta-agradable-i',
      title: 'CORBETA AGRADABLE I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '90 M2 · 2 DORMITORIOS · 1 BAÑO',
      description: 'Proyecto compacto con diseño funcional y eficiente.',
      image: '/img/CORBETA-AGRADABLE1/CORBETA AGRADABLE .jpg'
    },
    {
      id: 'silfides-i',
      title: 'SILFIDES I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '150 M2 · 4 DORMITORIOS · 3 BAÑOS',
      description: 'Proyecto de vivienda con diseño moderno y espacios optimizados.',
      image: ''
    },
    {
      id: 'zorzal-i',
      title: 'ZORZAL I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '120 M2 · 3 DORMITORIOS · 2 BAÑOS',
      description: 'Desarrollo de proyecto con arquitectura contemporánea.',
      image: '/img/ZORZAL/ZORZAL.jpg'
    },
    {
      id: 'colon-i',
      title: 'COLON I',
      category: 'proyecto',
      location: 'PROYECTO',
      status: '120 M2 · 3 DORMITORIOS · 2 BAÑOS',
      description: 'Proyecto de diseño con enfoque en la funcionalidad y eficiencia.',
      image: '/img/COLON1/COLON.jpg'
    }
  ]
  const heroSlides = [
  {
    video: '/img/ANCLA/VideoAnclaInterior.mp4',
    title: 'CONSTRUIMOS CONFIANZA,',
    subtitle: 'DISEÑAMOS FUTURO.',
    number: '01'
  },
  

]
  const filters = [
    { id: 'todos', label: 'Todos los proyectos' },
    { id: 'proyecto', label: 'Proyectos' },
    { id: 'construccion', label: 'Construcción' },
    { id: 'direccion', label: 'Dirección' }
  ]

  const filteredProjects = activeFilter === 'todos' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

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
    handleScroll() // <-- Llama al efecto al montar el componente
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="projects-page">
      {/* Hero Section con video de fondo igual que Home */}
      <section className="hero-section">
        <div className="hero-slides">
          <div className="hero-slide active">
            <div className="hero-background">
              <video
                src="/img/ANCLA/VideoAnclaInterior.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onLoadStart={() => console.log('Projects video loading')}
                onCanPlay={() => console.log('Projects video can play')}
                onError={(e) => console.error('Projects video error:', e)}
                onPlay={() => console.log('Projects video playing')}
              />
            </div>
          </div>
        </div>
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-text-wrapper">
              <h1 className="hero-title">
                <span className="hero-label">NUESTROS PROYECTOS</span>
                 
                <span className="title-line">Desarrollos inmobiliarios de calidad</span>
              </h1>
              <img 
                src="/img/ViraBlanco.png" 
                alt="VIRA Constructora" 
                className="hero-logo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="projects-filter-section">
        <div className="container-wide">
          <div className="filter-buttons">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid - 2 columnas */}
      <section className="projects-grid-section">
        <div className="container-wide">
          <div className="projects-grid-two-columns">
            {filteredProjects.map((project) => (
              <Link 
                key={project.id} 
                to={`/proyectos/${project.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="project-card-modern">
                  <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay-gradient">
                      <div className="project-overlay-text">
                        <h3 className="project-title-overlay">{project.title}</h3>
                        <p className="project-subtitle-overlay">{project.location}</p>
                      </div>
                      <button className="project-arrow-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="projects-cta-section">
        <div className="container-wide">
          <div className="cta-content-project">
            <h2>¿Interesado en algún proyecto?</h2>
            <p>Contactanos para más información y agenda una visita</p>
            <a href="/contacto" className="cta-button-main">Contactar ahora</a>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  )
}

export default Projects
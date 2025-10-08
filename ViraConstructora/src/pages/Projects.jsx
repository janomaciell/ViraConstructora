import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Projects.css'
import WhatsAppButton from '../components/WhatsAppButton'

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
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
      featured: true
    },
    {
      id: 'vulcano-i',
      title: 'VULCANO I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '145 M2 · 3 DORMITORIOS · 2 BAÑOS',
      description: 'Desarrollo integral con arquitectura moderna y espacios optimizados.',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200'
    },
    {
      id: 'chape-i',
      title: 'CHAPE I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '155 M2 · 3 DORMITORIOS · 3 BAÑOS',
      description: 'Proyecto de construcción con diseño funcional y terminaciones premium.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200'
    },
    {
      id: 'dafna-i',
      title: 'DAFNA I',
      category: 'proyecto',
      location: 'PROYECTO Y DIRECCION',
      status: '155 M2 · 3 DORMITORIOS · 3 BAÑOS',
      description: 'Proyecto de diseño y dirección con arquitectura contemporánea.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200'
    },
    {
      id: 'dedalo-i',
      title: 'DEDALO I',
      category: 'proyecto',
      location: 'PROYECTO Y DIRECCION',
      status: '140 M2 · 3 DORMITORIOS · 3 BAÑOS',
      description: 'Desarrollo de proyecto y dirección con enfoque en la funcionalidad.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200'
    },
    {
      id: 'dedalo-ii',
      title: 'DEDALO II',
      category: 'construccion',
      location: 'CONSTRUCCION',
      status: '155 M2 · 3 DORMITORIOS · 3 BAÑOS',
      description: 'Construcción de vivienda con diseño moderno y espacios amplios.',
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200'
    },
    {
      id: 'positive-house-xii',
      title: 'POSITIVE HOUSE XII',
      category: 'construccion',
      location: 'CONSTRUCCION',
      status: '150 M2 · 3 DORMITORIOS · 3 BAÑOS',
      description: 'Construcción de vivienda con arquitectura sustentable y diseño innovador.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200'
    },
    {
      id: 'positive-house-xiii',
      title: 'POSITIVE HOUSE XIII',
      category: 'construccion',
      location: 'CONSTRUCCION',
      status: '130 M2 · 3 DORMITORIOS · 2 BAÑOS',
      description: 'Construcción de vivienda con diseño contemporáneo y eficiencia energética.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200'
    },
    {
      id: 'barrio-coodopin',
      title: 'BARRIO COODOPIN',
      category: 'direccion',
      location: 'DIRECCION DE OBRA',
      status: '1280 M2 · 18 VIVIENDAS',
      description: 'Dirección de obra para desarrollo de barrio con múltiples viviendas.',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200'
    },
    {
      id: 'niza-i',
      title: 'NIZA I',
      category: 'proyecto',
      location: 'PROYECTO',
      status: '350 M2 · 6 UNIDADES FUNCIONALES',
      description: 'Proyecto de desarrollo con múltiples unidades funcionales.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200'
    },
    {
      id: 'garzas-i',
      title: 'GARZAS I',
      category: 'construccion',
      location: 'CONSTRUCCION',
      status: '230 M2 · 3 DORMITORIOS · 2 BAÑOS',
      description: 'Construcción de vivienda con diseño moderno y espacios amplios.',
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200'
    },
    {
      id: 'progreso-y-biarritz',
      title: 'PROGRESO Y BIARRITZ',
      category: 'proyecto',
      location: 'PROYECTO Y FINAL DE OBRA',
      status: '435 M2 · 7 UNIDADES FUNCIONALES',
      description: 'Proyecto completo con finalización de obra para desarrollo multifamiliar.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200'
    },
    {
      id: 'espartillo-i',
      title: 'ESPARTILLO I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '235 M2 · 4 DORMITORIOS · 3 BAÑOS',
      description: 'Proyecto integral con diseño contemporáneo y espacios amplios.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200'
    },
    {
      id: 'corbeta-agradable-i',
      title: 'CORBETA AGRADABLE I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '90 M2 · 2 DORMITORIOS · 1 BAÑO',
      description: 'Proyecto compacto con diseño funcional y eficiente.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200'
    },
    {
      id: 'silfides-i',
      title: 'SILFIDES I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '150 M2 · 4 DORMITORIOS · 3 BAÑOS',
      description: 'Proyecto de vivienda con diseño moderno y espacios optimizados.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200'
    },
    {
      id: 'zorzal-i',
      title: 'ZORZAL I',
      category: 'proyecto',
      location: 'PROYECTO, DIRECCION Y CONSTRUCCION',
      status: '120 M2 · 3 DORMITORIOS · 2 BAÑOS',
      description: 'Desarrollo de proyecto con arquitectura contemporánea.',
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200'
    },
    {
      id: 'colon-i',
      title: 'COLON I',
      category: 'proyecto',
      location: 'PROYECTO',
      status: '120 M2 · 3 DORMITORIOS · 2 BAÑOS',
      description: 'Proyecto de diseño con enfoque en la funcionalidad y eficiencia.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200'
    }
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

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920" 
            alt="Nuestros proyectos"
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>NUESTROS PROYECTOS</h1>
              <p>Desarrollos inmobiliarios de calidad en las mejores ubicaciones de Pinamar</p>
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
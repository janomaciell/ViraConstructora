import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import WhatsAppButton from "../components/WhatsAppButton"
import './Home.css'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [expandedProject, setExpandedProject] = useState(0) // 🔹 Primer proyecto expandido por defecto
  const heroRef = useRef(null)

  useEffect(() => {
    // Intersection Observer para animaciones
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.fade-in-up, .fade-in, .stagger-item').forEach(el => {
      observer.observe(el)
    })

    // Parallax suave
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset
          const heroImg = document.querySelector('.hero-background img')
          const heroContent = document.querySelector('.hero-content')
          
          if (heroImg && scrolled < window.innerHeight) {
            heroImg.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0002})`
          }
          
          if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.opacity = Math.max(0, 1 - scrolled / 600)
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Auto-slide para hero
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 5)
    }, 6000)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      clearInterval(slideInterval)
    }
  }, [])

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80',
      title: 'CONSTRUIMOS CONFIANZA,',
      subtitle: 'DISEÑAMOS FUTURO.',
      number: '01'
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80',
      title: 'ARQUITECTURA QUE',
      subtitle: 'TRASCIENDE',
      number: '02'
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80',
      title: 'INNOVACIÓN Y',
      subtitle: 'EXCELENCIA',
      number: '03'
    },
    {
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop&q=80',
      title: 'CALIDAD EN',
      subtitle: 'CADA DETALLE',
      number: '04'
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80',
      title: 'TU HOGAR',
      subtitle: 'SOÑADO',
      number: '05'
    }
  ]

  const projects = [
    { 
      name: 'ANCLAI', 
      desc: 'CONSTRUCCION',
      specs: '180 M² · 4 DORM · 3 BAÑOS',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80',
    },
    { 
      name: 'VULCANO I', 
      desc: 'CONSTRUCCION',
      specs: '145 M² · 3 DORM · 2 BAÑOS',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop&q=80',
    },
    { 
      name: 'CHAPE I', 
      desc: 'CONSTRUCCION',
      specs: '155 M² · 3 DORM · 3 BAÑOS',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80',
    },
    { 
      name: 'DAFNEAI',
      desc: 'PROYECTO Y DIRECCION',
      specs: '155 M² · 3 DORM · 3 BAÑOS',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80',
    },
    { 
      name: 'DEDALO I', 
      desc: 'PROYECTO Y DIRECCION',
      specs: '140 M² · 3 DORM · 3 BAÑOS',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=80',
    },
    { 
      name: 'POSITIVE HOUSE XII', 
      desc: 'CONSTRUCCION',
      specs: '155 M² · 3 DORM · 3 BAÑOS',
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop&q=80',
    },
    { 
      name: 'POSITIVE HOUSE XIII', 
      desc: 'CONSTRUCCION',
      specs: '130 M² · 3 DORM · 2 BAÑOS',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&q=80',
    },
    { 
      name: 'BARRIO COODOPIN', 
      desc: 'DIRECCION DE OBRA',
      specs: '1280 M² · 18 VIVIENDAS',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&q=80',
    },
  ]



  return (
    <div className="home">
      {/* Hero Section con Slider */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-slides">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="hero-background">
                <img 
                  src={slide.image}
                  alt="VIRA Constructora"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-text-wrapper">
              <h1 className="hero-title">
                <span className="title-line">{heroSlides[currentSlide].title}</span>
                <span className="title-line">{heroSlides[currentSlide].subtitle}</span>
              </h1>
              <p className="hero-tagline">VIRA CONSTRUCTORA</p>
            </div>
            
            <div className="hero-slide-info">
              <span className="slide-number">{heroSlides[currentSlide].number}</span>
              <span className="slide-separator">—</span>
              <span className="slide-total">05</span>
            </div>
          </div>

          <Link to="/proyectos" className="hero-cta">
          <span>EXPLORAR PROYECTOS</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>
        </div>

        <div className="slide-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Intro Statement Section */}
      <section className="intro-statement">
        <div className="intro-divider"></div>
        <div className="intro-content fade-in-up">
        <p className="intro-lead">
          Creamos <span className="highlight">inversiones seguras, modernas y con visión de futuro</span> en una zona estratégica de constante crecimiento.
        </p>
        <p className="intro-detail">
          Combinamos diseño, tecnología y calidad constructiva para ofrecer proyectos que <span className="emphasis">trascienden en el tiempo</span> y generan valor real para nuestros clientes e inversores.
        </p>

        </div>
      </section>

      {/* About Section Mejorado */}
      <section className="about-section">
        <div className="about-grid">
          <div className="about-text">
            <div className="section-label fade-in-up">SOBRE NOSOTROS</div>
            <p className="fade-in-up stagger-item">
              En <strong>VIRA Constructora</strong>, queremos que eleves tu calidad de vida con <strong>inversiones confiables y rentables</strong> en una zona privilegiada de Pinamar, rodeada de naturaleza, mar, bosques y dunas.
            </p>
            <p className="fade-in-up stagger-item">
              Nuestro objetivo es dejar una huella en tus momentos de <strong>desconexión, contemplación y descanso</strong>.
            </p>
            <p className="fade-in-up stagger-item">
              Con 4 años de trayectoria, hemos desarrollado <strong>47 viviendas y unidades funcionales</strong>, sumando <strong>4.370 m² construidos y proyectados</strong>.
            </p>
            <p className="fade-in-up stagger-item">
              Somos un equipo de <strong>profesionales dedicados y comprometidos</strong>, listos para ayudarte a construir un futuro más lento, pausado y conectado con lo que realmente importa.
            </p>
          </div>
          
          <div className="about-stats fade-in-up">
            <div className="stat-item">
              <div className="stat-number">47</div>
              <div className="stat-label">Viviendas desarrolladas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4,370</div>
              <div className="stat-label">M² construidos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4+</div>
              <div className="stat-label">Años de experiencia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="philosophy-image fade-in">
          <img 
            src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&h=900&fit=crop&q=80"
            alt="Filosofía VIRA"
          />
        </div>
        <div className="philosophy-content">
          <div className="philosophy-text fade-in-up">
            <span className="philosophy-label">NUESTRA FILOSOFÍA</span>
            <h2>Descubre qué hace especial a una casa VIRA</h2>
            <Link to="/nosotros" className="philosophy-cta">
              <span>NUESTRA FILOSOFÍA</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section con Accordion */}
      <section className="projects-section">
        <div className="section-header fade-in-up">
          <div className="section-label">NUESTRO TRABAJO</div>
          <h2>Proyectos destacados</h2>
        </div>
        
        <div className="projects-masonry">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`project-card ${expandedProject === index ? 'expanded' : ''}`}
              onClick={() => setExpandedProject(index)}
            >
              <div className="project-image-wrapper">
                <img 
                  src={project.image} 
                  alt={project.name}
                  loading="lazy"
                />
                <div className="project-overlay"></div>
              </div>
              
              {/* 🔹 Label vertical cuando está colapsado */}
              <div className="project-label">{project.name}</div>
              
              {/* 🔹 Info completa cuando está expandido */}
              <div className="project-info">
                <div className="project-meta">
                  <span className="project-type">{project.desc}</span>
                </div>
                <h3>{project.name}</h3>
                <p className="project-specs">{project.specs}</p>

              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta fade-in-up">
          <Link to="/proyectos" className="btn-primary">
            <span>VER TODOS LOS PROYECTOS</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Testimonial/Quote Section */}
      <section className="quote-section">
        <div className="quote-container fade-in-up">
          <blockquote>
            <p className="quote-text">
              "En VIRA, creemos que son los detalles más finos los que dan forma a la belleza, funcionalidad y calidad duradera de un hogar. Es por eso que cada casa que construimos está diseñada cuidadosamente, diseñada con precisión y elaborada para brindar fortaleza, comodidad y elegancia duradera para quienes no esperan nada menos que excepcional."
            </p>
          </blockquote>
          <div className="quote-author">
            <div className="author-image">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80" alt="Fundador" />
            </div>
            <div className="author-info">
              <div className="author-name">Juan Pérez</div>
              <div className="author-title">CEO & FUNDADOR</div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="locations-section">
        <div className="locations-content">
          <div className="section-label fade-in-up">UBICACIONES</div>
          <h2 className="fade-in-up">Creando hogares en los entornos más deseables de Pinamar y la costa atlántica</h2>
          
          <div className="locations-map fade-in-up">
          <div className="locations-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55889.108190121406!2d-56.937740083375814!3d-37.098023888919755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d2f40bc78e1e4fd%3A0xfc83c4f8b2f6341!2sVIRA%20CONSTRUCTORA!5e1!3m2!1ses-419!2sar!4v1759794953969!5m2!1ses-419!2sar"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>


          </div>
        </div>

          
      </section>

      {/* Instagram Section Mejorado */}
      <section className="instagram-section">
        <div className="instagram-header fade-in-up">
          <div className="section-label">SÍGUENOS</div>
          <h2>@viraconstructora</h2>
        </div>

        <div className="instagram-embed fade-in-up">
          <iframe
            src="https://www.instagram.com/viraconstructora/embed"
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            title="Instagram VIRA Constructora"
          ></iframe>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  )
}

export default Home
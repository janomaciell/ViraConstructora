import { useState } from 'react'
import './Services.css'
import WhatsAppButton from '../components/WhatsAppButton'

const Services = () => {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      id: 1,
      number: '01',
      title: 'Arquitectura y Diseño',
      subtitle: 'NUESTRA MARCA PERSONAL',
      description: 'A lo largo de los años ha sido poner el valor cada uno de los vecindarios donde implantamos nuestros proyectos. Las viviendas que proyectamos en nuestro estudio siguen las tendencias de arquitectura más actuales y cuentan con detalles de diseño que logran sorprender positivamente a nuestros clientes.',
      features: [
        'Diseño 3D',
        'Videos de presentación en HD',
        'Renders realistas',
        'Recorrido con realidad virtual',
        'Planos y detalles constructivos',
        'Cálculos estructurales'
      ],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200'
    },
    {
      id: 2,
      number: '02',
      title: 'Gestoría',
      subtitle: 'TRÁMITES Y PERMISOS',
      description: 'Nuestro equipo de profesionales matriculados se encarga de todas las diligencias y presentaciones necesarias para la ejecución de la obra.',
      features: [
        'Permiso municipal',
        'Gas natural',
        'Servicio eléctrico',
        'Agua corriente',
        'Servicio sanitario',
        'Documentación completa'
      ],
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200'
    },
    {
      id: 3,
      number: '03',
      title: 'Administración de Obra',
      subtitle: 'CONTROL TOTAL',
      description: 'Llevamos un control digital y analógico de todos los comprobantes de pagos a proveedores, facturas emitidas y recibidas. Esto nos permite llevar un control minucioso de los gastos de las obras.',
      features: [
        'Control de pagos',
        'Gestión de facturas',
        'Reportes detallados',
        'Seguimiento en tiempo real',
        'Transparencia total',
        'Informes mensuales'
      ],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200'
    },
    {
      id: 4,
      number: '04',
      title: 'Seguridad en Obra',
      subtitle: 'PROTECCIÓN INTEGRAL',
      description: 'Todo el personal que esté afectado a la obra se encuentra contratado y cubierto por cualquier tipo de accidente producto del trabajo que se encuentre realizando.',
      features: [
        'Personal asegurado',
        'Planes de seguridad e higiene',
        'Botiquines de primeros auxilios',
        'Charlas semanales de seguridad',
        'Elementos de protección',
        'Cumplimiento normativo'
      ],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200'
    },
    {
      id: 5,
      number: '05',
      title: 'Construcción',
      subtitle: 'EJECUCIÓN PROFESIONAL',
      description: 'Ofrecemos las opciones de construcción mediante las modalidades llave en mano, mano de obra o mixtas. Toda la construcción se realiza con nuestro staff permanente de albañiles, plomeros, electricistas y contratistas.',
      features: [
        'Llave en mano',
        'Mano de obra especializada',
        'Modalidades mixtas',
        'Staff permanente',
        'Seguimiento continuo',
        'Garantía de calidad'
      ],
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200'
    }
  ]

  return (
    <div className="services-page">
      {/* Hero Section - Minimalista */}
      <section className="services-hero">
        <div className="services-hero-content">
          <p className="hero-label">NUESTROS SERVICIOS</p>
          <h1>Excelencia en<br />cada detalle</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="services-intro">
        <div className="intro-wrapper">
          <p className="intro-lead">
            Ofrecemos soluciones integrales para el desarrollo de proyectos inmobiliarios, 
            desde el diseño inicial hasta la entrega final, con el más alto estándar de calidad.
          </p>
        </div>
      </section>

      {/* Services List - Vertical con imágenes grandes */}
      <section className="services-list">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className={`service-item ${index % 2 === 0 ? 'reverse' : ''}`}
            onClick={() => setActiveService(index)}
          >
            <div className="service-visual">
              <div className="service-image-large">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-number-display">{service.number}</div>
            </div>
            
            <div className="service-info">
              <div className="service-info-content">
                <p className="service-category">{service.subtitle}</p>
                <h2 className="service-name">{service.title}</h2>
                <p className="service-brief">{service.description}</p>
                
                <div className="service-features-grid">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="feature-tag">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Process Section - Minimalista */}
      <section className="services-process">
        <div className="process-container">
          <h2 className="process-title">Del concepto a la realidad</h2>
          <div className="process-flow">
            {services.map((service, index) => (
              <div key={service.id} className="process-step">
                <div className="step-line"></div>
                <div className="step-content">
                  <span className="step-num">{service.number}</span>
                  <h3>{service.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="services-stats">
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-value">100%</div>
            <p className="stat-label">Compromiso con la calidad</p>
          </div>
          <div className="stat-box">
            <div className="stat-value">24/7</div>
            <p className="stat-label">Seguimiento de obra</p>
          </div>
          <div className="stat-box">
            <div className="stat-value">5+</div>
            <p className="stat-label">Servicios integrales</p>
          </div>
        </div>
      </section>

      {/* CTA Section - Elegante */}
      <section className="services-cta">
        <div className="cta-wrapper">
          <h2>Iniciá tu proyecto</h2>
          <p>Transformamos tus ideas en espacios extraordinarios</p>
          <a href="/contacto" className="cta-link-service">
            Contactar
          </a>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  )
}

export default Services
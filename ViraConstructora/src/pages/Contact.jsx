import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import WhatsAppButton from '../components/WhatsAppButton'
import './Contact.css'

const Contact = () => {
  const form = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Configuración de EmailJS (reemplaza con tus credenciales reales)
    const serviceID = 'YOUR_SERVICE_ID'
    const templateID = 'YOUR_TEMPLATE_ID'
    const publicKey = 'YOUR_PUBLIC_KEY'

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
        console.log('Email enviado:', result.text)
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
        setTimeout(() => setSubmitStatus(null), 5000)
      })
      .catch((error) => {
        console.error('Error al enviar:', error.text)
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus(null), 5000)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="contact-page-modern">
      {/* Hero Title */}
      <section className="contact-hero-modern">
        <div className="container-wide">
          <h1 className="hero-title-modern">
            Cada gran proyecto comienza con una<br />
            <span className="italic">conversación</span>
          </h1>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="container-wide">
          <div className="contact-split-modern">
            {/* Left Side - Info Minimalista */}
            <div className="contact-left-side">
              {/* Location */}
              <div className="location-section">
                <h3 className="section-title">Ubicación</h3>
                <p className="location-text">
                  Constitución 1386 y Totoras<br />
                  Buenos Aires, Argentina
                </p>
              </div>

              {/* Talk to Us */}
              <div className="talk-section">
                <h3 className="section-title">Contáctanos</h3>
                <a href="tel:+54111561684537" className="phone-number">011-156168-4537</a>
              </div>

              {/* Social Links (minimalista, solo íconos) */}
              <div className="social-links">

                <a href="https://www.instagram.com/viraconstructora" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="contact-right-side">
              <div className="form-intro">
                <p className="form-intro-text">
                  Contacta directamente al equipo o dejá un mensaje en el formulario,<br />
                  y nos pondremos en contacto.
                </p>
              </div>

              <form ref={form} onSubmit={handleSubmit} className="contact-form-modern">
                <div className="form-group-modern">
                  <label htmlFor="name" className="form-label-modern">Tu nombre</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="form-input-modern"
                    disabled={isSubmitting}
                    placeholder="Escribe tu nombre completo"
                  />
                </div>

                <div className="form-group-modern">
                  <label htmlFor="email" className="form-label-modern">Tu email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="form-input-modern"
                    disabled={isSubmitting}
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="form-group-modern">
                  <label htmlFor="phone" className="form-label-modern">Número de teléfono</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="form-input-modern"
                    disabled={isSubmitting}
                    placeholder="Ej: 011-123456789"
                  />
                </div>

                <div className="form-group-modern">
                  <label htmlFor="message" className="form-label-modern">Cuéntanos sobre tu proyecto</label>
                  <textarea 
                    id="message"
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    rows="3"
                    className="form-textarea-modern"
                    disabled={isSubmitting}
                    placeholder="Describe tu idea o consulta..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-button-modern"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>

                {submitStatus === 'success' && (
                  <div className="form-message-modern success">
                    ¡Mensaje enviado con éxito! Te contactaremos pronto.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-message-modern error">
                    Hubo un error al enviar el mensaje. Por favor, intentá nuevamente.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  )
}

export default Contact

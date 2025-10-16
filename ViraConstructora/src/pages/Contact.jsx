import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import WhatsAppButton from '../components/WhatsAppButton'
import './Contact.css'

// 🔥 INICIALIZAR EmailJS con tu Public Key
emailjs.init('aq7CBtsGS1ChR6Fuu') // 👈 Tu Public Key

const Contact = () => {
  const form = useRef()
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    hasLand: null,
    squareMeters: '',
    name: '',
    email: '',
    phone: '',
    meetingDate: '',
    meetingTime: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleLandResponse = (response) => {
    setFormData({ ...formData, hasLand: response })
    if (response === 'no') {
      setStep(3)
    } else {
      setStep(2)
    }
  }

  const handleSquareMeters = (meters) => {
    setFormData({ ...formData, squareMeters: meters })
    setStep(3)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 18; hour++) {
      const time = `${String(hour).padStart(2, '0')}:00`
      const displayTime = hour < 12 ? `${hour}:00 AM` : hour === 12 ? `12:00 PM` : `${hour - 12}:00 PM`
      slots.push({ value: time, label: displayTime })
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split('T')[0]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.hasLand === 'si') {
      if (!formData.meetingDate || !formData.meetingTime) {
        alert('Por favor, selecciona una fecha y hora para la videollamada.')
        return
      }
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const meetingDateTime = formData.meetingDate && formData.meetingTime
        ? new Date(`${formData.meetingDate}T${formData.meetingTime}`)
        : null
      
      const formattedDateTime = meetingDateTime
        ? (meetingDateTime.toLocaleDateString('es-AR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
          }) + ' a las ' + meetingDateTime.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit'
          }))
        : 'No aplica'

      const currentDate = new Date().toLocaleDateString('es-AR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        has_land: formData.hasLand === 'si' ? 'Sí' : 'No',
        square_meters: formData.squareMeters || 'No especificado',
        meeting_datetime: formattedDateTime,
        request_date: currentDate
      }

      // 🔥 ENVIAR EMAIL 1: Confirmación al CLIENTE
      await emailjs.send(
        'service_hyhlgf5',           // Service ID
        'template_13du8u8',         // 👈 Reemplaza con el Template ID del email al cliente
        templateParams
      )

      console.log('✅ Email de confirmación enviado al cliente')

      // 🔥 ENVIAR EMAIL 2: Notificación a la CONSTRUCTORA
      await emailjs.send(
        'service_hyhlgf5',           // Service ID
        'template_f9iwgld',
        templateParams
      )

      console.log('✅ Email de notificación enviado a la constructora')

      // Si tiene terreno, abrir Google Calendar
      if (formData.hasLand === 'si') {
        const startDateTime = new Date(`${formData.meetingDate}T${formData.meetingTime}:00`)
        const endDateTime = new Date(startDateTime)
        endDateTime.setHours(endDateTime.getHours() + 1)

        const formatDateForCalendar = (date) => {
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')
          const hours = String(date.getHours()).padStart(2, '0')
          const minutes = String(date.getMinutes()).padStart(2, '0')
          return `${year}${month}${day}T${hours}${minutes}00`
        }

        const startTime = formatDateForCalendar(startDateTime)
        const endTime = formatDateForCalendar(endDateTime)

        const eventTitle = '🏗️ Videollamada con Vira Constructora'
        const eventDetails = `
VIDEOLLAMADA AGENDADA CON VIRA CONSTRUCTORA

📋 TUS DATOS:
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}

🏡 DETALLES DE TU PROYECTO:
Terreno: Sí tengo terreno
Superficie deseada: ${formData.squareMeters || 'A definir'}

📞 Recibirás un enlace de Google Meet por email antes de la reunión.

📍 Vira Constructora
📧 viraconstructora@gmail.com
        `.trim()

        const eventLocation = 'Google Meet (el enlace será enviado por email)'
        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}&dates=${startTime}/${endTime}`

        window.open(calendarUrl, '_blank')
      }

      setSubmitStatus('success')

      setTimeout(() => {
        setFormData({
          hasLand: null,
          squareMeters: '',
          name: '',
          email: '',
          phone: '',
          meetingDate: '',
          meetingTime: ''
        })
        setStep(1)
        setSubmitStatus(null)
      }, 4000)

    } catch (error) {
      console.error('❌ Error al enviar email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = isMuted
    const tryPlay = () => {
      video.play().catch(() => {})
    }
    if (video.readyState >= 2) {
      tryPlay()
    } else {
      video.addEventListener('canplay', tryPlay, { once: true })
    }
  }, [isMuted])

  return (
    <div className="contact-page-modern">
      <section className="contact-hero-modern">
        <div className="container-wide">
          <h1 className="hero-title-modern">
            Agenda tu<br />
            <span className="italic">videollamada</span>
          </h1>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="container-wide">
          <div className="contact-split-modern">
            <div className="contact-left-side">
              <div className="video-container-modern">
                <video
                  ref={videoRef}
                  src="/img/VideoContacto.mp4"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  controls
                />
                {isMuted && (
                  <button
                    type="button"
                    className="video-unmute-button"
                    onClick={() => {
                      const video = videoRef.current
                      if (!video) return
                      setIsMuted(false)
                      video.muted = false
                      video.play().catch(() => {})
                    }}
                    aria-label="Activar sonido"
                  >
                    Activar sonido
                  </button>
                )}
              </div>
            </div>

            <div className="contact-right-side">
              <div className="form-intro">
                <p className="form-intro-text">
                  Respondé 2 preguntas y elegí tu horario preferido.
                </p>
              </div>

              <form ref={form} onSubmit={handleSubmit} className="contact-form-modern">
                <input type="hidden" name="hasLand" value={formData.hasLand || ''} />
                <input type="hidden" name="squareMeters" value={formData.squareMeters || ''} />

                <div className="form-group-modern">
                  <label className="form-label-modern">¿Tenés un terreno?</label>
                  <div className="options-container">
                    <button
                      type="button"
                      className={`option-box ${formData.hasLand === 'si' ? 'selected' : ''}`}
                      onClick={() => handleLandResponse('si')}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      className={`option-box ${formData.hasLand === 'no' ? 'selected' : ''}`}
                      onClick={() => handleLandResponse('no')}
                    >
                      No
                    </button>
                  </div>
                </div>

                {step >= 2 && formData.hasLand === 'si' && (
                  <div className="form-group-modern slide-in">
                    <label className="form-label-modern">¿Cuántos metros cuadrados te gustaría construir?</label>
                    <div className="options-container-vertical">
                      <button
                        type="button"
                        className={`option-box ${formData.squareMeters === 'Menos de 100m²' ? 'selected' : ''}`}
                        onClick={() => handleSquareMeters('Menos de 100m²')}
                      >
                        Menos de 100m²
                      </button>
                      <button
                        type="button"
                        className={`option-box ${formData.squareMeters === 'Entre 100 y 200m²' ? 'selected' : ''}`}
                        onClick={() => handleSquareMeters('Entre 100 y 200m²')}
                      >
                        Entre 100 y 200m²
                      </button>
                      <button
                        type="button"
                        className={`option-box ${formData.squareMeters === 'Más de 200m²' ? 'selected' : ''}`}
                        onClick={() => handleSquareMeters('Más de 200m²')}
                      >
                        Más de 200m²
                      </button>
                    </div>
                  </div>
                )}

                 {step >= 3 && (
                   <>
                    <div className="form-group-modern slide-in">
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

                    <div className="form-group-modern slide-in">
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

                    <div className="form-group-modern slide-in">
                      <label htmlFor="phone" className="form-label-modern">Número de teléfono</label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required
                        className="form-input-modern"
                        disabled={isSubmitting}
                        placeholder="Ej: 011-123456789"
                      />
                    </div>

                     {formData.hasLand === 'si' && (
                       <>
                         <div className="form-group-modern slide-in">
                           <label className="form-label-modern">📅 Elegí fecha y hora para la videollamada</label>
                           <div className="datetime-container">
                             <div className="date-time-group">
                               <label htmlFor="meetingDate" className="datetime-label">Fecha</label>
                               <input 
                                 type="date" 
                                 id="meetingDate"
                                 name="meetingDate" 
                                 value={formData.meetingDate} 
                                 onChange={handleChange} 
                                 required
                                 min={getMinDate()}
                                 max={getMaxDate()}
                                 className="form-input-modern datetime-input"
                                 disabled={isSubmitting}
                               />
                             </div>
                             <div className="date-time-group">
                               <label htmlFor="meetingTime" className="datetime-label">Hora</label>
                               <select
                                 id="meetingTime"
                                 name="meetingTime"
                                 value={formData.meetingTime}
                                 onChange={handleChange}
                                 required
                                 className="form-input-modern datetime-input"
                                 disabled={isSubmitting}
                               >
                                 <option value="">Seleccionar</option>
                                 {timeSlots.map(slot => (
                                   <option key={slot.value} value={slot.value}>
                                     {slot.label}
                                   </option>
                                 ))}
                               </select>
                             </div>
                           </div>
                           <p className="datetime-help">
                             💡 Horario de atención: Lunes a Viernes, 9 AM - 6 PM
                           </p>
                         </div>

                         <button 
                           type="submit" 
                           className="submit-button-modern"
                           disabled={isSubmitting}
                         >
                           <span>{isSubmitting ? 'ENVIANDO...' : 'CONFIRMAR VIDEOLLAMADA'}</span>
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                             <path d="M5 12h14M12 5l7 7-7 7"/>
                           </svg>
                         </button>

                         {submitStatus === 'success' && (
                           <div className="form-message-modern success">
                             ✅ ¡Solicitud enviada! Revisá tu email para la confirmación.
                           </div>
                         )}

                         {submitStatus === 'error' && (
                           <div className="form-message-modern error">
                             ❌ Hubo un error. Por favor, intentá nuevamente o contactanos por WhatsApp.
                           </div>
                         )}
                       </>
                     )}

                     {formData.hasLand === 'no' && (
                       <>
                         <button 
                           type="submit" 
                           className="submit-button-modern"
                           disabled={isSubmitting}
                         >
                           <span>{isSubmitting ? 'ENVIANDO...' : 'ENVIAR CONSULTA'}</span>
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                             <path d="M5 12h14M12 5l7 7-7 7"/>
                           </svg>
                         </button>

                         {submitStatus === 'success' && (
                           <div className="form-message-modern success">
                             ✅ ¡Consulta enviada! Revisá tu email para la confirmación.
                           </div>
                         )}

                         {submitStatus === 'error' && (
                           <div className="form-message-modern error">
                             ❌ Hubo un error. Por favor, intentá nuevamente o contactanos por WhatsApp.
                           </div>
                         )}
                       </>
                     )}
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section-modern">
          <h2 className="section-title-contact">
            Ubicación
          </h2>
          <h3 className="section-title-contact">
            Constitución 1386 y Totoras — Pinamar, Buenos Aires, Argentina
          </h3>
        <div className="locations-map-contact">
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3492.5346259039466!2d-56.874764888113255!3d-37.10961849400916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c9cdeede9c585%3A0x2b722ba9dd9ca00f!2sAv.%20Constituci%C3%B3n%201386%2C%20B7167%20Pinamar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1760061274045!5m2!1ses-419!2sar"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

        </div>
      </section>

      <WhatsAppButton />
    </div>
  )
}

export default Contact
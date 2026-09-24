import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

import ArrowIcon from '../components/ui/ArrowIcon'
import Isotype from '../components/ui/Isotype'
import { assetUrl, posterUrl } from '../lib/media'
import { getVideoMeta } from '../data/media-manifest'
import { useLanguage } from '../i18n/language-context'
import useScrollReveal from '../hooks/useScrollReveal'
import './Contact.css'

// 🔥 INICIALIZAR EmailJS con tu Public Key
emailjs.init('aq7CBtsGS1ChR6Fuu') // 👈 Tu Public Key

const CONTACT_VIDEO = 'img/VideoContacto.mp4'

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
    meetingTime: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const { t, lang } = useLanguage()
  useScrollReveal([lang, step])

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
      [e.target.name]: e.target.value,
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
        alert(t.contact.alertPickSlot)
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
            day: 'numeric',
          }) + ' a las ' + meetingDateTime.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit',
          }))
        : 'No aplica'

      const currentDate = new Date().toLocaleDateString('es-AR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        has_land: formData.hasLand === 'si' ? 'Sí' : 'No',
        square_meters: formData.squareMeters || 'No especificado',
        meeting_datetime: formattedDateTime,
        request_date: currentDate,
      }

      // 🔥 ENVIAR EMAIL 1: Confirmación al CLIENTE
      await emailjs.send(
        'service_hyhlgf5',           // Service ID
        'template_13du8u8',         // Template ID del email al cliente
        templateParams,
      )

      // 🔥 ENVIAR EMAIL 2: Notificación a la CONSTRUCTORA
      await emailjs.send(
        'service_hyhlgf5',           // Service ID
        'template_f9iwgld',
        templateParams,
      )

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
          meetingTime: '',
        })
        setStep(1)
        setSubmitStatus(null)
      }, 4000)
    } catch (error) {
      console.error('Error al enviar email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const videoMeta = getVideoMeta(CONTACT_VIDEO)
  const successMessage = formData.hasLand === 'si' ? t.contact.successCall : t.contact.successQuery

  const statusMessages = (
    <>
      {submitStatus === 'success' && (
        <p className="form-message form-message--success" role="status">
          {successMessage}
        </p>
      )}
      {submitStatus === 'error' && (
        <p className="form-message form-message--error" role="alert">
          {t.contact.error}
        </p>
      )}
    </>
  )

  return (
    <div className="contact-page">
      {/* Encabezado editorial: el título es la promesa de la página */}
      <section className="contact-hero">
        <div className="shell shell--wide contact-hero__inner">
          <span className="eyebrow">{t.contact.heroLabel}</span>
          <h1 className="contact-hero__title">
            <span className="mask-line" data-reveal="fade">
              <span>{t.contact.heroTitleLine1}</span>
            </span>
            <span className="mask-line contact-hero__accent" data-reveal="fade">
              <span>{t.contact.heroTitleLine2}</span>
            </span>
          </h1>
        </div>
        <span className="contact-hero__bar" aria-hidden="true" />
      </section>

      {/* El video, horizontal y a ancho completo: es la presentación */}
      <section className="contact-video">
        <div className="shell shell--wide">
          <div className="contact-video__frame">
            <video
              ref={videoRef}
              src={assetUrl(CONTACT_VIDEO)}
              poster={videoMeta.poster ? posterUrl(videoMeta.poster) : undefined}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              controls
            />
            {isMuted && (
              <button
                type="button"
                className="contact-video__unmute"
                onClick={() => {
                  const video = videoRef.current
                  if (!video) return
                  setIsMuted(false)
                  video.muted = false
                  video.play().catch(() => {})
                }}
                aria-label={t.contact.unmuteAria}
              >
                <Isotype size={14} />
                <span>{t.contact.unmute}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="section section--tight contact-main">
        <div className="shell shell--wide contact-main__grid">
          {/* Columna de contexto: dónde está el usuario y cómo llegar directo */}
          <aside className="contact-aside">
            <div className="contact-steps">
              <span className="contact-steps__label">
                {t.contact.stepLabel} {String(Math.min(step, 3)).padStart(2, '0')} / 03
              </span>
              <div className="contact-steps__bars" aria-hidden="true">
                {[1, 2, 3].map((value) => (
                  <span
                    key={value}
                    className={`contact-steps__bar ${step >= value ? 'is-done' : ''}`}
                  />
                ))}
              </div>
            </div>

            <p className="contact-aside__intro">{t.contact.formIntro}</p>

            <ul className="contact-direct">
              <li className="contact-direct__label">{t.contact.directLabel}</li>
              <li>
                <a href={`mailto:${t.footer.email}`} className="link-underline">
                  {t.footer.email}
                </a>
              </li>
              <li>
                <a href="tel:+54111561684537" className="link-underline">
                  {t.footer.phone}
                </a>
              </li>
            </ul>
          </aside>

          {/* Formulario */}
          <div className="contact-form-side">
            <form ref={form} onSubmit={handleSubmit} className="contact-form">
              <input type="hidden" name="hasLand" value={formData.hasLand || ''} />
              <input type="hidden" name="squareMeters" value={formData.squareMeters || ''} />

              <fieldset className="field">
                <legend className="field__label">{t.contact.qLand}</legend>
                <div className="option-row">
                  <button
                    type="button"
                    className={`option ${formData.hasLand === 'si' ? 'is-selected' : ''}`}
                    onClick={() => handleLandResponse('si')}
                    aria-pressed={formData.hasLand === 'si'}
                  >
                    {t.contact.yes}
                  </button>
                  <button
                    type="button"
                    className={`option ${formData.hasLand === 'no' ? 'is-selected' : ''}`}
                    onClick={() => handleLandResponse('no')}
                    aria-pressed={formData.hasLand === 'no'}
                  >
                    {t.contact.no}
                  </button>
                </div>
              </fieldset>

              {step >= 2 && formData.hasLand === 'si' && (
                <fieldset className="field field--enter">
                  <legend className="field__label">{t.contact.qMeters}</legend>
                  <div className="option-row option-row--three">
                    {['Menos de 100m²', 'Entre 100 y 200m²', 'Más de 200m²'].map((value, index) => (
                      <button
                        key={value}
                        type="button"
                        className={`option ${formData.squareMeters === value ? 'is-selected' : ''}`}
                        onClick={() => handleSquareMeters(value)}
                        aria-pressed={formData.squareMeters === value}
                      >
                        {t.contact.meterOptions[index]}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step >= 3 && (
                <>
                  <div className="field-row field--enter">
                    <div className="field">
                      <label htmlFor="name" className="field__label">{t.contact.labelName}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="field__input"
                        disabled={isSubmitting}
                        placeholder={t.contact.placeholderName}
                        autoComplete="name"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="phone" className="field__label">{t.contact.labelPhone}</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="field__input"
                        disabled={isSubmitting}
                        placeholder={t.contact.placeholderPhone}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="field field--enter">
                    <label htmlFor="email" className="field__label">{t.contact.labelEmail}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="field__input"
                      disabled={isSubmitting}
                      placeholder={t.contact.placeholderEmail}
                      autoComplete="email"
                    />
                  </div>

                  {formData.hasLand === 'si' && (
                    <>
                      <div className="field field--enter">
                        <span className="field__label">{t.contact.labelSchedule}</span>
                        <div className="field-row">
                          <div className="field">
                            <label htmlFor="meetingDate" className="field__sublabel">
                              {t.contact.labelDate}
                            </label>
                            <input
                              type="date"
                              id="meetingDate"
                              name="meetingDate"
                              value={formData.meetingDate}
                              onChange={handleChange}
                              required
                              min={getMinDate()}
                              max={getMaxDate()}
                              className="field__input"
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="field">
                            <label htmlFor="meetingTime" className="field__sublabel">
                              {t.contact.labelTime}
                            </label>
                            <select
                              id="meetingTime"
                              name="meetingTime"
                              value={formData.meetingTime}
                              onChange={handleChange}
                              required
                              className="field__input"
                              disabled={isSubmitting}
                            >
                              <option value="">{t.contact.selectPlaceholder}</option>
                              {timeSlots.map((slot) => (
                                <option key={slot.value} value={slot.value}>
                                  {slot.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <p className="field__help">{t.contact.scheduleHelp}</p>
                      </div>

                      <button type="submit" className="btn btn--solid contact-submit" disabled={isSubmitting}>
                        <span>{isSubmitting ? t.contact.submitting : t.contact.submitCall}</span>
                        <ArrowIcon size={18} />
                      </button>

                      {statusMessages}
                    </>
                  )}

                  {formData.hasLand === 'no' && (
                    <>
                      <button type="submit" className="btn btn--solid contact-submit" disabled={isSubmitting}>
                        <span>{isSubmitting ? t.contact.submitting : t.contact.submitQuery}</span>
                        <ArrowIcon size={18} />
                      </button>

                      {statusMessages}
                    </>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="contact-map">
        <div className="shell shell--wide contact-map__head">
          <h2 className="contact-map__title" data-reveal="up">{t.contact.locationTitle}</h2>
          <p className="contact-map__address" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
            {t.contact.locationAddress}
          </p>
        </div>

        <div className="contact-map__frame">
          <iframe
            title={t.contact.mapTitle}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3492.5346259039466!2d-56.874764888113255!3d-37.10961849400916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c9cdeede9c585%3A0x2b722ba9dd9ca00f!2sAv.%20Constituci%C3%B3n%201386%2C%20B7167%20Pinamar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1760061274045!5m2!1ses-419!2sar"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  )
}

export default Contact

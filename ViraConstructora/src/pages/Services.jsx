import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import SmartVideo from '../components/ui/SmartVideo'
import SmartImage from '../components/ui/SmartImage'
import ArrowIcon from '../components/ui/ArrowIcon'
import Isotype from '../components/ui/Isotype'
import { useLanguage } from '../i18n/language-context'
import useScrollReveal from '../hooks/useScrollReveal'
import useSeo from '../hooks/useSeo'
import { services as allServices, localizeService } from '../data/services'
import { SIZES } from '../lib/media'
import './Services.css'

const Services = () => {
  const { t, lang } = useLanguage()

  const services = useMemo(
    () => allServices.map((service) => localizeService(service, lang)),
    [lang],
  )

  useSeo({ ...t.seo.services, path: 'servicios' }, [lang])
  useScrollReveal([lang])

  return (
    <div className="services-page">
      <section className="page-hero">
        <div className="page-hero__media">
          <SmartVideo src="img/ANCLA/videoexterior.mp4" />
        </div>
        <span className="page-hero__scrim" aria-hidden="true" />

        <div className="shell shell--wide page-hero__inner">
          <span className="eyebrow">{t.services.heroLabel}</span>
          <h1 className="page-hero__title">
            {t.services.heroTitleLine1}
            <br />
            {t.services.heroTitleLine2}
          </h1>
        </div>
        <span className="page-hero__bar" aria-hidden="true" />
      </section>

      {/* Declaración de apertura: una sola idea, mucho aire */}
      <section className="section services-intro">
        <div className="shell services-intro__grid">
          <Isotype size={72} className="services-intro__mark" data-reveal="fade" />
          <p className="services-intro__lead" data-reveal="up">
            {t.services.introLead}
          </p>
        </div>
      </section>

      {/* Índice + bloques de servicio */}
      <section className="services-body">
        <div className="shell shell--wide services-body__grid">
          {/* Índice pegajoso: en todo momento se sabe dónde se está */}
          <aside className="services-index">
            <span className="eyebrow">{t.services.indexLabel}</span>
            <ol className="services-index__list">
              {services.map((service) => (
                <li key={service.id}>
                  <a href={`#${service.id}`} className="services-index__link">
                    <span className="services-index__num">{service.number}</span>
                    <span>{service.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="services-list">
            {services.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="service-block"
                data-align={index % 2 === 0 ? 'start' : 'end'}
              >
                <div className="service-block__head">
                  <span className="service-block__number" data-reveal="up">
                    {service.number}
                  </span>
                  <div>
                    <span className="service-block__category" data-reveal="up">
                      {service.subtitle}
                    </span>
                    <h2 className="service-block__title" data-reveal="up" style={{ '--reveal-delay': '70ms' }}>
                      {service.title}
                    </h2>
                  </div>
                </div>

                <SmartImage
                  src={service.image}
                  alt={service.title}
                  className="service-block__media"
                  sizes={SIZES.half}
                  ratio="4 / 3"
                  data-reveal="curtain"
                  zoom
                />

                <div className="service-block__content">
                  <p className="service-block__text body-text" data-reveal="up">
                    {service.description}
                  </p>

                  <div className="service-block__features">
                    <span className="eyebrow eyebrow--plain service-block__features-label">
                      {t.services.includesLabel}
                    </span>
                    <ul>
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={feature}
                          data-reveal="up"
                          style={{ '--reveal-delay': `${featureIndex * 50}ms` }}
                        >
                          <Isotype size={12} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <span className="service-block__rule" data-reveal="line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="section section--ink services-process">
        <div className="shell shell--wide">
          <header className="services-process__head">
            <span className="eyebrow" data-reveal="up">{t.services.processLabel}</span>
            <h2 className="services-process__title" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
              {t.services.processTitle}
            </h2>
          </header>

          <ol className="services-process__flow">
            {services.map((service, index) => (
              <li
                key={service.id}
                className="process-step"
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 80}ms` }}
              >
                <span className="process-step__num">{service.number}</span>
                <h3 className="process-step__title">{service.title}</h3>
                <span className="process-step__line" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cifras */}
      <section className="section section--tight">
        <div className="shell shell--wide">
          <div className="stats">
            {t.services.stats.map((stat, index) => (
              <div
                key={stat.label}
                className="stat"
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 90}ms` }}
              >
                <span className="stat__value">{stat.value}</span>
                <span className="stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--brand">
        <div className="shell cta-block">
          <h2 className="cta-block__title" data-reveal="up">{t.services.ctaTitle}</h2>
          <p className="cta-block__text" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
            {t.services.ctaText}
          </p>
          <div data-reveal="up" style={{ '--reveal-delay': '160ms' }}>
            <Link to="/contacto" className="btn btn--ink">
              <span>{t.services.ctaButton}</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services

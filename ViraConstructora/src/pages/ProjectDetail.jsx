import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import SmartImage from '../components/ui/SmartImage'
import ArrowIcon from '../components/ui/ArrowIcon'
import Isotype from '../components/ui/Isotype'
import { useLanguage } from '../i18n/language-context'
import useScrollReveal from '../hooks/useScrollReveal'
import useLockBodyScroll from '../hooks/useLockBodyScroll'
import { projectsById, localizeProject } from '../data/projects'
import { imageUrl, SIZES } from '../lib/media'
import { fillTemplate, whatsappUrl } from '../lib/contact'
import { canonicalUrl } from '../lib/site'
import './ProjectDetail.css'

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

const ProjectDetail = () => {
  const { id } = useParams()
  const { t, lang } = useLanguage()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const project = useMemo(
    () => localizeProject(projectsById[id], lang),
    [id, lang],
  )

  const gallery = project?.gallery ?? []
  const isOpen = lightboxIndex !== null

  useScrollReveal([id, lang])
  useLockBodyScroll(isOpen)

  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(
    () => setLightboxIndex((index) => (index === 0 ? gallery.length - 1 : index - 1)),
    [gallery.length],
  )
  const next = useCallback(
    () => setLightboxIndex((index) => (index === gallery.length - 1 ? 0 : index + 1)),
    [gallery.length],
  )

  // El lightbox se maneja con teclado: Escape y flechas
  useEffect(() => {
    if (!isOpen) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') prev()
      if (event.key === 'ArrowRight') next()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close, prev, next])

  if (!project) {
    return (
      <div className="detail-missing">
        <Isotype size={72} />
        <h1 className="detail-missing__title">{t.projectDetail.notFound}</h1>
        <Link to="/proyectos" className="btn">
          <span>{t.projectDetail.back}</span>
          <ArrowIcon />
        </Link>
      </div>
    )
  }

  const specs = [
    { label: t.projectDetail.area, value: `${project.specs.area} m²` },
    { label: t.projectDetail.bedrooms, value: project.specs.bedrooms },
    { label: t.projectDetail.bathrooms, value: project.specs.bathrooms },
    { label: t.projectDetail.garage, value: project.specs.garage },
    { label: t.projectDetail.lot, value: project.specs.lot },
  ].filter((spec) => spec.value)

  /* Consulta por WhatsApp con los datos de esta propiedad ya escritos */
  const enquiryLink = whatsappUrl(
    fillTemplate(t.projectDetail.enquiryMessage, {
      title: project.title,
      summary: project.summary,
      location: project.location,
      url: canonicalUrl(`proyectos/${project.id}`),
    }),
  )

  const meta = [
    { label: t.projectDetail.type, value: project.type },
    { label: t.projectDetail.location, value: project.location },
    { label: t.projectDetail.year, value: project.year },
    { label: t.projectDetail.status, value: project.status },
  ].filter((item) => item.value)

  return (
    <div className="detail-page">
      {/* Portada */}
      <section className="detail-hero">
        <SmartImage
          src={project.image || gallery[0]}
          alt={project.title}
          className="detail-hero__media"
          sizes={SIZES.full}
          priority
        />
        <span className="detail-hero__scrim" aria-hidden="true" />

        <div className="shell shell--wide detail-hero__inner">
          <Link to="/proyectos" className="detail-back">
            <ArrowIcon size={16} />
            <span>{t.projectDetail.back}</span>
          </Link>

          <span className="eyebrow">{project.type}</span>
          <h1 className="detail-hero__title">{project.title}</h1>
          <p className="detail-hero__subtitle">{project.subtitle}</p>
          <p className="detail-hero__meta">
            {[project.location, project.year].filter(Boolean).join(' · ')}
          </p>
        </div>

        <span className="detail-hero__bar" aria-hidden="true" />
      </section>

      {/* Ficha del proyecto: el relato y los datos, juntos */}
      <section className="section section--ink detail-brief">
        <div className="shell shell--wide detail-brief__grid">
          <div className="detail-brief__story">
            <h2 className="detail-brief__title" data-reveal="up">
              {t.projectDetail.descriptionTitle}
            </h2>
            <p className="detail-brief__text" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
              {project.description}
            </p>

            <ul className="detail-brief__tags" data-reveal="up" style={{ '--reveal-delay': '160ms' }}>
              {meta.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </li>
              ))}
            </ul>

            <a
              href={enquiryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--solid detail-enquire"
              data-reveal="up"
              style={{ '--reveal-delay': '220ms' }}
            >
              <WhatsAppIcon />
              <span>{t.projectDetail.enquire}</span>
            </a>
          </div>

          <dl className="detail-data">
            {specs.map((spec, index) => (
              <div
                key={spec.label}
                className="detail-data__item"
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 60}ms` }}
              >
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Características */}
      <section className="section detail-features-section">
        <div className="shell shell--wide">
          <h2 className="detail-section-title" data-reveal="up">
            {t.projectDetail.featuresTitle}
          </h2>

          <ul className="detail-features">
            {project.features.map((feature, index) => (
              <li
                key={feature}
                data-reveal="up"
                style={{ '--reveal-delay': `${(index % 4) * 60}ms` }}
              >
                <Isotype size={13} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Galería */}
      {gallery.length > 0 && (
        <section className="section section--surface detail-gallery">
          <div className="shell shell--wide">
            <header className="detail-gallery__head">
              <h2 className="detail-section-title" data-reveal="up">
                {t.projectDetail.galleryTitle}
              </h2>
              <span className="detail-gallery__count" data-reveal="fade">
                {String(gallery.length).padStart(2, '0')}
              </span>
            </header>

            <div className="detail-gallery__grid">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className="gallery-item"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`${t.projectDetail.openImage} — ${t.projectDetail.imageOf
                    .replace('{current}', String(index + 1))
                    .replace('{total}', String(gallery.length))}`}
                  data-reveal="curtain"
                  style={{ '--reveal-delay': `${(index % 3) * 80}ms` }}
                >
                  <SmartImage
                    src={image}
                    alt={`${project.title} — ${index + 1}`}
                    className="gallery-item__media"
                    sizes={SIZES.third}
                    ratio="4 / 3"
                    zoom
                  />
                  <span className="gallery-item__mark" aria-hidden="true">
                    <ArrowIcon size={16} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Equipo */}
      <section className="section section--ink detail-team">
        <div className="shell shell--wide">
          <h2 className="detail-section-title" data-reveal="up">{t.projectDetail.teamTitle}</h2>

          <dl className="detail-team__list">
            <div data-reveal="up">
              <dt>{t.projectDetail.architect}</dt>
              <dd>{project.team.architect}</dd>
            </div>
            <div data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
              <dt>{t.projectDetail.builder}</dt>
              <dd>{project.team.builder}</dd>
            </div>
            <div data-reveal="up" style={{ '--reveal-delay': '160ms' }}>
              <dt>{t.projectDetail.landscape}</dt>
              <dd>{project.team.landscape}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section section--brand">
        <div className="shell cta-block">
          <h2 className="cta-block__title" data-reveal="up">{t.projects.ctaTitle}</h2>
          <p className="cta-block__text" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
            {t.projects.ctaText}
          </p>
          <div data-reveal="up" style={{ '--reveal-delay': '160ms' }}>
            <Link to="/contacto" className="btn btn--ink">
              <span>{t.projects.ctaButton}</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          onClick={close}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={close}
            aria-label={t.projectDetail.close}
          >
            <span />
            <span />
          </button>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={(event) => {
              event.stopPropagation()
              prev()
            }}
            aria-label={t.projectDetail.prev}
          >
            <ArrowIcon size={22} />
          </button>

          <figure className="lightbox__figure" onClick={(event) => event.stopPropagation()}>
            <img
              src={imageUrl(gallery[lightboxIndex], { width: 1920 })}
              alt={`${project.title} — ${lightboxIndex + 1}`}
            />
            <figcaption className="lightbox__caption">
              {t.projectDetail.imageOf
                .replace('{current}', String(lightboxIndex + 1))
                .replace('{total}', String(gallery.length))}
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={(event) => {
              event.stopPropagation()
              next()
            }}
            aria-label={t.projectDetail.next}
          >
            <ArrowIcon size={22} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail

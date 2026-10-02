import { Link } from 'react-router-dom'

import SmartVideo from '../components/ui/SmartVideo'
import SmartImage from '../components/ui/SmartImage'
import ArrowIcon from '../components/ui/ArrowIcon'
import Isotype from '../components/ui/Isotype'
import { useLanguage } from '../i18n/language-context'
import useScrollReveal from '../hooks/useScrollReveal'
import useSeo from '../hooks/useSeo'
import { SIZES } from '../lib/media'
import './About.css'

const About = () => {
  const { t, lang } = useLanguage()
  useSeo({ ...t.seo.about, path: 'nosotros' }, [lang])
  useScrollReveal([lang])

  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="page-hero__media">
          <SmartVideo src="img/ANCLA/videohabitaciones.mp4" />
        </div>
        <span className="page-hero__scrim" aria-hidden="true" />

        <div className="shell shell--wide page-hero__inner">
          <span className="eyebrow">{t.about.introLabel}</span>
          <h1 className="page-hero__title">{t.about.heroTitle}</h1>
        </div>
        <span className="page-hero__bar" aria-hidden="true" />
      </section>

      {/* 1 · QUIÉNES SOMOS — la respuesta llega primero */}
      <section className="section section--ink about-intro">
        <div className="shell about-intro__grid">
          <Isotype size={80} className="about-intro__mark" data-reveal="fade" />
          <div className="about-intro__text">
            <p className="about-intro__lead" data-reveal="up">
              {t.about.introText}
            </p>
            <p className="about-intro__detail" data-reveal="up" style={{ '--reveal-delay': '90ms' }}>
              {t.about.introTextSecondary}
            </p>
          </div>
        </div>
      </section>

      {/* 2 · CIFRAS — la prueba, inmediatamente después */}
      <section className="section section--tight">
        <div className="shell shell--wide">
          <div className="stats">
            {t.about.stats.map((stat, index) => (
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

      {/* 3 · CÓMO TRABAJAMOS — los tres valores, en paralelo y no apilados */}
      <section className="section about-values">
        <div className="shell shell--wide">
          <header className="about-values__head">
            <span className="eyebrow" data-reveal="up">{t.about.valuesLabel}</span>
            <h2 className="about-values__title" data-reveal="up" style={{ '--reveal-delay': '70ms' }}>
              {t.about.valuesTitlePrefix}
              <em>{t.about.valuesTitleAccent}</em>
            </h2>
            <p className="about-values__intro body-text" data-reveal="up" style={{ '--reveal-delay': '140ms' }}>
              {t.about.valuesIntro}
            </p>
          </header>

          <div className="about-values__grid">
            {t.about.values.map((value, index) => (
              <article
                key={value.title}
                className="value-card"
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 110}ms` }}
              >
                <span className="value-card__num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="value-card__title">{value.title}</h3>
                <p className="value-card__text">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · LA OBRA — una imagen que sostiene todo lo anterior */}
      <section className="about-showcase">
        <SmartImage
          src="img/ANCLA/12.jpg"
          alt={t.about.heroTitle}
          className="about-showcase__media"
          sizes={SIZES.full}
        />
        <span className="about-showcase__bar" aria-hidden="true" />
      </section>

      {/* 5 · QUIÉNES LO HACEN */}
      <section className="section about-team">
        <div className="shell shell--wide about-team__grid">
          <header className="about-team__head">
            <span className="eyebrow" data-reveal="up">{t.about.teamLabel}</span>
            <h2 className="about-team__title" data-reveal="up" style={{ '--reveal-delay': '70ms' }}>
              {t.about.teamTitle}
            </h2>
            <p className="about-team__intro body-text" data-reveal="up" style={{ '--reveal-delay': '140ms' }}>
              {t.about.teamIntro}
            </p>
          </header>

          <ul className="about-team__list">
            {t.about.team.map((member, index) => (
              <li
                key={member.name}
                className="team-row"
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 70}ms` }}
              >
                <span className="team-row__index">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="team-row__name">{member.name}</h3>
                <span className="team-row__role">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--brand">
        <div className="shell cta-block">
          <h2 className="cta-block__title" data-reveal="up">{t.about.ctaTitle}</h2>
          <p className="cta-block__text" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
            {t.about.ctaText}
          </p>
          <div data-reveal="up" style={{ '--reveal-delay': '160ms' }}>
            <Link to="/contacto" className="btn btn--ink">
              <span>{t.about.ctaButton}</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

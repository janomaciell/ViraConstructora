import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../components/ui/Logo'
import Isotype from '../components/ui/Isotype'
import SmartImage from '../components/ui/SmartImage'
import SmartVideo from '../components/ui/SmartVideo'
import RichText from '../components/ui/RichText'
import ArrowIcon from '../components/ui/ArrowIcon'
import WorkGrid from '../components/WorkGrid'

import { useLanguage } from '../i18n/language-context'
import useScrollReveal from '../hooks/useScrollReveal'
import useSeo from '../hooks/useSeo'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import { featuredProjects, localizeProject } from '../data/projects'
import { SIZES } from '../lib/media'
import './Home.css'

const HERO_VIDEO = 'img/ANCLA/VideoAncla.mp4'

/* Seis destacados: dos filas completas de la grilla de 3 columnas */
const FEATURED_COUNT = 6

const Home = () => {
  const { t, lang } = useLanguage()
  const reducedMotion = usePrefersReducedMotion()

  const heroRef = useRef(null)
  const logoLayerRef = useRef(null)
  const logoRef = useRef(null)
  const bgRef = useRef(null)
  const veilRef = useRef(null)
  const statementRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const ctaRef = useRef(null)
  const cueRef = useRef(null)

  useSeo({ ...t.seo.home, path: '' }, [lang])
  useScrollReveal([lang])

  /* ----------------------------------------------------------
     HERO — el scroll dibuja la página.
     El logo entra centrado y, al scrollear, viaja hasta el hueco
     del header y se queda ahí: hay un solo logo en pantalla.
     Después el fondo se oscurece y la frase sube desde abajo.

     El estado inicial es CSS, así la primera pintura no espera a
     ningún script; GSAP se carga en diferido y sólo toma el control
     del scroll.
     ---------------------------------------------------------- */
  useEffect(() => {
    const hero = heroRef.current
    const logo = logoRef.current
    const root = document.documentElement
    if (!hero || !logo || reducedMotion) return undefined

    // Mientras el hero tenga el logo, el header oculta el suyo.
    root.dataset.heroLogo = 'hero'

    let ctx
    let cancelled = false

    const load = async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])
        if (cancelled) return

        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          /* Destino del logo: el hueco real del header. Se mide sobre él
             para que el aterrizaje sea exacto en cualquier viewport. */
          const logoTarget = () => {
            const brand = document.querySelector('.site-header__brand img')
            if (!brand || !logo.offsetWidth) return { x: 0, y: 0, scale: 1 }

            const box = brand.getBoundingClientRect()
            return {
              scale: box.width / logo.offsetWidth,
              x: box.left + box.width / 2 - window.innerWidth / 2,
              y: box.top + box.height / 2 - window.innerHeight / 2,
            }
          }

          /* TIEMPOS: los porcentajes son del alto total del hero. La pantalla
             fija se suelta en (alto - 100vh) / alto: 69% con 320vh y 61,5%
             con 260vh (mobile). Todo tiene que terminar antes (hoy, al 56%),
             si no el final de la animación ocurre con el hero ya yéndose. */
          const scrub = (start, end, extra = {}) => ({
            trigger: hero,
            start,
            end,
            scrub: 0.6,
            invalidateOnRefresh: true,
            ...extra,
          })

          /* FASE A — el logo viaja al header */
          gsap.to(logo, {
            ease: 'none',
            scrollTrigger: scrub('top top', '20% top'),
            x: () => logoTarget().x,
            y: () => logoTarget().y,
            scale: () => logoTarget().scale,
          })

          /* Relevo: a partir de acá el logo que se ve es el del header */
          const handoff = (owner) => {
            root.dataset.heroLogo = owner
            if (logoLayerRef.current) logoLayerRef.current.dataset.handoff = String(owner === 'header')
          }

          ScrollTrigger.create({
            trigger: hero,
            start: '19% top',
            end: 'bottom top',
            invalidateOnRefresh: true,
            onEnter: () => handoff('header'),
            onLeaveBack: () => handoff('hero'),
          })

          gsap.to(cueRef.current, {
            autoAlpha: 0,
            ease: 'none',
            scrollTrigger: scrub('top top', '7% top', { scrub: 0.3 }),
          })

          /* El fondo respira: un acercamiento lento durante todo el hero */
          gsap.fromTo(
            bgRef.current,
            { scale: 1.14 },
            { scale: 1, ease: 'none', scrollTrigger: scrub('top top', 'bottom top', { scrub: 1 }) },
          )

          /* El velo se cierra para que la frase tenga sobre qué apoyarse */
          gsap.fromTo(
            veilRef.current,
            { opacity: 0.42 },
            { opacity: 0.82, ease: 'none', scrollTrigger: scrub('14% top', '40% top') },
          )

          /* FASE C — la frase sube desde abajo, saliendo de la pantalla */
          gsap.to(statementRef.current, {
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: scrub('24% top', '28% top', { scrub: 0.3 }),
          })

          /* fromTo con `y: 0` explícito: el estado inicial en CSS
             (translate3d(0, 115%, 0)) GSAP lo lee como píxeles en `y`,
             y animar sólo `yPercent` dejaba el texto escondido bajo la máscara. */
          gsap.fromTo(
            line1Ref.current,
            { y: 0, yPercent: 115 },
            { yPercent: 0, ease: 'none', scrollTrigger: scrub('26% top', '42% top') },
          )

          gsap.fromTo(
            line2Ref.current,
            { y: 0, yPercent: 115 },
            { yPercent: 0, ease: 'none', scrollTrigger: scrub('34% top', '50% top', { scrub: 0.8 }) },
          )

          gsap.to(ctaRef.current, {
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: scrub('46% top', '56% top'),
          })
        }, hero)
      } catch (error) {
        // Si el motor de scroll no carga, el hero se muestra completo.
        console.warn('[hero] no se pudo cargar el motor de scroll', error)
        if (!cancelled) {
          hero.dataset.motion = 'fallback'
          root.dataset.heroLogo = 'header'
        }
      }
    }

    load()

    return () => {
      cancelled = true
      ctx?.revert()
      delete root.dataset.heroLogo
      delete hero.dataset.motion
    }
  }, [reducedMotion, lang])

  const projects = featuredProjects
    .slice(0, FEATURED_COUNT)
    .map((project) => localizeProject(project, lang))

  return (
    <div className="home">
      {/* ==================================================
          HERO
          ================================================== */}
      <section className="hero" ref={heroRef} data-reduced={reducedMotion ? 'true' : 'false'}>
        <div className="hero__sticky">
          <div className="hero__bg" ref={bgRef}>
            {/* Video de fondo: el poster (FACHADA 1) pinta al instante y el
                video se descarga recién cuando el hero está en pantalla */}
            <SmartVideo src={HERO_VIDEO} className="hero__bg-media" ratio="auto" />
          </div>
          <span className="hero__veil" ref={veilRef} aria-hidden="true" />

          {/* Logo único: nace centrado y termina en el header */}
          {!reducedMotion && (
            <div className="hero__logo-layer" ref={logoLayerRef} data-handoff="false">
              <div className="hero__logo" ref={logoRef}>
                <Logo tone="dark" width={520} priority />
              </div>
            </div>
          )}

          {/* La frase, centrada y apoyada abajo */}
          <div className="hero__statement" ref={statementRef}>
            <h1 className="hero__headline">
              <span className="hero__mask">
                <span ref={line1Ref}>{t.home.heroStatement}</span>
              </span>
            </h1>

            <p className="hero__subline">
              <span className="hero__mask">
                <span ref={line2Ref}>{t.home.heroStatementSecondary}</span>
              </span>
            </p>

            <div className="hero__cta" ref={ctaRef}>
              <Link to="/proyectos" className="btn btn--inverse">
                <span>{t.home.heroCta}</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="hero__cue" ref={cueRef} aria-hidden="true">
            <span>{t.meta.scroll}</span>
            <span className="hero__cue-line" />
          </div>
        </div>
      </section>

      {/* ==================================================
          DECLARACIÓN — bloque pleno de identidad
          ================================================== */}
      <section className="section section--brand intro">
        <div className="shell intro__grid">
          <div className="intro__main">
            <Isotype size={56} className="intro__mark" data-reveal="fade" />
            <RichText text={t.home.introLead} className="intro__lead" data-reveal="up" />
          </div>
          <RichText
            text={t.home.introDetail}
            className="intro__detail"
            data-reveal="up"
            style={{ '--reveal-delay': '120ms' }}
          />
        </div>
      </section>

      {/* ==================================================
          NOSOTROS
          ================================================== */}
      <section className="section about">
        <div className="shell about__grid">
          <div className="about__text">
            <span className="eyebrow" data-reveal="up">{t.home.aboutLabel}</span>
            {t.home.aboutParagraphs.map((paragraph, index) => (
              <RichText
                key={index}
                text={paragraph}
                className="about__paragraph body-text"
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 70}ms` }}
              />
            ))}
          </div>

          <div className="about__stats">
            {t.home.stats.map((stat, index) => (
              <div
                key={stat.label}
                className="about__stat"
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 90}ms` }}
              >
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          FILOSOFÍA
          ================================================== */}
      <section className="philosophy">
        <SmartImage
          src="img/CHAPE/01.jpg"
          alt={t.home.philosophyTitle}
          className="philosophy__media"
          sizes={SIZES.full}
          objectPosition="center 55%"
        />
        <span className="philosophy__scrim" aria-hidden="true" />

        <div className="shell philosophy__content">
          <span className="eyebrow" data-reveal="up">{t.home.philosophyLabel}</span>
          <h2 className="philosophy__title" data-reveal="up" style={{ '--reveal-delay': '90ms' }}>
            {t.home.philosophyTitle}
          </h2>
          <div data-reveal="up" style={{ '--reveal-delay': '180ms' }}>
            <Link to="/nosotros" className="btn btn--inverse">
              <span>{t.home.philosophyCta}</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          PROYECTOS DESTACADOS
          ================================================== */}
      <section className="section section--tight work">
        <div className="shell shell--wide">
          <header className="work__head">
            <div>
              <span className="eyebrow" data-reveal="up">{t.home.projectsLabel}</span>
              <h2 className="work__title" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
                {t.home.projectsTitle}
              </h2>
            </div>
            <Link to="/proyectos" className="link-underline work__head-link">
              {t.home.projectsCta}
            </Link>
          </header>
        </div>

        <WorkGrid projects={projects} viewLabel={t.projects.viewProject} />
      </section>

      {/* ==================================================
          CITA
          ================================================== */}
      <section className="section section--ink quote">
        <div className="shell shell--narrow">
          <Isotype size={56} className="quote__mark" data-reveal="fade" />
          <blockquote className="quote__text" data-reveal="up">
            {t.home.quote}
          </blockquote>
          <footer className="quote__author" data-reveal="up" style={{ '--reveal-delay': '120ms' }}>
            <span className="quote__rule" aria-hidden="true" />
            <div>
              <span className="quote__name">{t.home.quoteAuthor}</span>
              <span className="quote__role">{t.home.quoteRole}</span>
            </div>
          </footer>
        </div>
      </section>

      {/* ==================================================
          UBICACIÓN
          ================================================== */}
      <section className="section location">
        <div className="shell shell--wide location__grid">
          <div className="location__text">
            <span className="eyebrow" data-reveal="up">{t.home.locationLabel}</span>
            <h2 className="location__title" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
              {t.home.locationTitle}
            </h2>
            <p className="location__lead body-text" data-reveal="up" style={{ '--reveal-delay': '160ms' }}>
              {t.home.locationText}
            </p>
            <p className="location__address" data-reveal="up" style={{ '--reveal-delay': '220ms' }}>
              {t.home.locationAddress}
            </p>
          </div>

          <div className="location__map" data-reveal="fade">
            <iframe
              title={t.home.mapTitle}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3492.5346259039466!2d-56.874764888113255!3d-37.10961849400916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959c9cdeede9c585%3A0x2b722ba9dd9ca00f!2sAv.%20Constituci%C3%B3n%201386%2C%20B7167%20Pinamar%2C%20Provincia%20de%20Buenos%20Aires!5e1!3m2!1ses-419!2sar!4v1760061274045!5m2!1ses-419!2sar"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ==================================================
          INSTAGRAM
          ================================================== */}
      <section className="section section--tight social">
        <div className="shell shell--narrow">
          <header className="social__head">
            <span className="eyebrow" data-reveal="up">{t.home.instagramLabel}</span>
            <h2 className="social__title" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
              {t.home.instagramTitle}
            </h2>
          </header>

          <div className="social__embed" data-reveal="fade">
            <iframe
              src="https://www.instagram.com/viraconstructora/embed"
              title={t.home.instagramFrameTitle}
              loading="lazy"
              scrolling="no"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

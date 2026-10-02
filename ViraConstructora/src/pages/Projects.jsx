import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import SmartVideo from '../components/ui/SmartVideo'
import ArrowIcon from '../components/ui/ArrowIcon'
import WorkGrid from '../components/WorkGrid'
import { useLanguage } from '../i18n/language-context'
import useScrollReveal from '../hooks/useScrollReveal'
import useSeo from '../hooks/useSeo'
import { projects as allProjects, localizeProject } from '../data/projects'
import './Projects.css'

const Projects = () => {
  const { t, lang } = useLanguage()

  /* La obra completa, en el orden en que está cargada. Sin paginar:
     el listado de proyectos se recorre entero de un scroll. */
  const projects = useMemo(
    () => allProjects.map((project) => localizeProject(project, lang)),
    [lang],
  )

  useSeo({ ...t.seo.projects, path: 'proyectos' }, [lang])
  useScrollReveal([lang])

  return (
    <div className="projects-page">
      <section className="page-hero">
        <div className="page-hero__media">
          <SmartVideo src="img/ANCLA/VideoAnclaInterior.mp4" />
        </div>
        <span className="page-hero__scrim" aria-hidden="true" />

        <div className="shell shell--wide page-hero__inner">
          <span className="eyebrow">{t.projects.heroLabel}</span>
          <h1 className="page-hero__title">{t.projects.heroTitle}</h1>
        </div>
        <span className="page-hero__bar" aria-hidden="true" />
      </section>

      <div className="projects-bar">
        <div className="projects-bar__inner">
          <p className="projects-bar__title">
            <span>{t.projects.gridTitle}</span>
            <span className="projects-bar__count">
              {String(projects.length).padStart(2, '0')}
            </span>
          </p>
        </div>
      </div>

      <section className="projects-grid-section">
        <WorkGrid projects={projects} viewLabel={t.projects.viewProject} />
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
    </div>
  )
}

export default Projects

import { Link } from 'react-router-dom'
import SmartImage from './ui/SmartImage'
import { SIZES } from '../lib/media'
import './WorkGrid.css'

/**
 * Grilla de obra: imágenes a sangre, sin separación entre ellas.
 * El listado se lee primero como un mosaico de fotografía; los datos
 * aparecen al pasar por encima (y siempre, cuando no hay hover).
 */
const WorkGrid = ({ projects, viewLabel = '', offset = 0 }) => (
  <div className="work-grid">
    {projects.map((project, index) => (
      <Link
        key={project.id}
        to={`/proyectos/${project.id}`}
        className="work-tile"
        style={{ '--i': index % 3 }}
        aria-label={`${project.title} — ${viewLabel}`}
        data-reveal="fade"
      >
        <SmartImage
          src={project.image}
          alt={project.title}
          className="work-tile__media"
          sizes={SIZES.third}
        />

        <span className="work-tile__index" aria-hidden="true">
          {String(offset + index + 1).padStart(2, '0')}
        </span>

        <span className="work-tile__veil" aria-hidden="true" />

        <span className="work-tile__body">
          <span className="work-tile__type">{project.type}</span>
          <span className="work-tile__name">{project.title}</span>
          <span className="work-tile__specs">{project.summary}</span>
        </span>
      </Link>
    ))}
  </div>
)

export default WorkGrid

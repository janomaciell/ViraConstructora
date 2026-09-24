import Isotype from './ui/Isotype'
import './RouteFallback.css'

/** Estado de carga entre rutas: el isotipo pulsando, nada más. */
const RouteFallback = () => (
  <div className="route-fallback" role="status" aria-live="polite">
    <Isotype size={54} className="route-fallback__mark" />
  </div>
)

export default RouteFallback

import './Isotype.css'

/**
 * Isotipo de VIRA (la marca sin el logotipo).
 * Se pinta con `currentColor` mediante mask-image, así hereda el color
 * del contexto y funciona igual en modo claro, oscuro y sobre el azul.
 */
const Isotype = ({ size = 24, className = '', ...rest }) => (
  <span
    className={`isotype ${className}`.trim()}
    style={{ '--isotype-size': typeof size === 'number' ? `${size}px` : size }}
    aria-hidden="true"
    {...rest}
  />
)

export default Isotype

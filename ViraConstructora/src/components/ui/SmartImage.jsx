import { imageSrcSet, imageUrl, SIZES } from '../../lib/media'
import Isotype from './Isotype'

/**
 * Imagen del sistema.
 * · srcset/sizes responsive y formato moderno cuando Cloudflare está activo
 * · lazy + decoding async salvo que sea LCP (`priority`)
 * · dimensiones explícitas o aspect-ratio → cero CLS
 * · placeholder de marca cuando el proyecto todavía no tiene foto
 */
const SmartImage = ({
  src,
  alt = '',
  ratio,
  sizes = SIZES.full,
  widths,
  priority = false,
  className = '',
  imgClassName = '',
  objectPosition,
  width,
  height,
  zoom = false,
  children,
  ...rest
}) => {
  const style = {}
  if (ratio) style.aspectRatio = ratio

  const classes = ['media', zoom ? 'media--zoom' : '', className].filter(Boolean).join(' ')

  if (!src) {
    return (
      <div className={classes} style={style} {...rest}>
        <div className="media__fallback">
          <Isotype size={92} />
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className={classes} style={style} {...rest}>
      <img
        src={imageUrl(src, { width: width || 1440 })}
        srcSet={imageSrcSet(src, widths)}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={objectPosition ? { objectPosition } : undefined}
      />
      {children}
    </div>
  )
}

export default SmartImage

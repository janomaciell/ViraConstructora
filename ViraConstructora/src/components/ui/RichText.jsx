import { createElement } from 'react'

/**
 * Resuelve el énfasis fuerte (`**texto**`) de las traducciones sin
 * inyectar HTML. El texto original nunca se modifica: sólo se marca.
 */
const RichText = ({ text = '', as = 'p', children, ...rest }) => {
  const parts = String(text).split(/\*\*(.+?)\*\*/g)

  return createElement(
    as,
    rest,
    parts.map((part, index) =>
      index % 2 === 1 ? createElement('strong', { key: index }, part) : part,
    ),
    children,
  )
}

export default RichText

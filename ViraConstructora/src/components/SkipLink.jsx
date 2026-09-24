import { useLanguage } from '../i18n/language-context'

const SkipLink = () => {
  const { t } = useLanguage()
  return (
    <a href="#contenido" className="skip-link">
      {t.meta.skipToContent}
    </a>
  )
}

export default SkipLink

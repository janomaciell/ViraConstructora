import { useLanguage } from '../../i18n/language-context'
import './Toggles.css'

const LangToggle = ({ className = '' }) => {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className={`lang-toggle ${className}`.trim()} role="group" aria-label={t.meta.langSwitchTo}>
      <span className="lang-toggle__thumb" data-lang={lang} aria-hidden="true" />
      {['es', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-toggle__option ${lang === code ? 'is-active' : ''}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LangToggle

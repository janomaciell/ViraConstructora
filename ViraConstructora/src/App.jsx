import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import ThemeProvider from './theme/ThemeProvider'
import LanguageProvider from './i18n/LanguageProvider'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import RouteFallback from './components/RouteFallback'
import SkipLink from './components/SkipLink'

/* Cada ruta viaja en su propio chunk: el Home no paga el peso de Contacto. */
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Services = lazy(() => import('./pages/Services'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <SkipLink />
      <ScrollToTop />
      <Header />

      <main id="contenido" className="app-main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/proyectos/:id" element={<ProjectDetail />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <WhatsAppButton />
    </LanguageProvider>
  </ThemeProvider>
)

export default App

/* ============================================================
   VIRA — SERVICIOS (fuente única de verdad)
   El texto en `es` es el original de la marca, literal.
   Las imágenes pasaron de stock externo (Unsplash) a obra
   propia de VIRA: menos requests a terceros y coherencia de marca.
   ============================================================ */

export const services = [
  {
    id: 'arquitectura-y-diseno',
    number: '01',
    image: 'img/DEDALO2/04.jpg',
    es: {
      title: 'Arquitectura y Diseño',
      subtitle: 'NUESTRA MARCA PERSONAL',
      description: 'A lo largo de los años ha sido poner el valor cada uno de los vecindarios donde implantamos nuestros proyectos. Las viviendas que proyectamos en nuestro estudio siguen las tendencias de arquitectura más actuales y cuentan con detalles de diseño que logran sorprender positivamente a nuestros clientes.',
      features: [
        'Diseño 3D',
        'Videos de presentación en HD',
        'Renders realistas',
        'Recorrido con realidad virtual',
        'Planos y detalles constructivos',
        'Cálculos estructurales',
      ],
    },
    en: {
      title: 'Architecture and Design',
      subtitle: 'OUR PERSONAL SIGNATURE',
      description: 'Over the years it has been about adding value to every neighbourhood where we place our projects. The homes we design in our studio follow the most current architectural trends and feature design details that positively surprise our clients.',
      features: [
        '3D design',
        'HD presentation videos',
        'Realistic renders',
        'Virtual reality walkthrough',
        'Drawings and construction details',
        'Structural calculations',
      ],
    },
  },
  {
    id: 'gestoria',
    number: '02',
    image: 'img/STELLA1/cartel-obra.jpg',
    es: {
      title: 'Gestoría',
      subtitle: 'TRÁMITES Y PERMISOS',
      description: 'Nuestro equipo de profesionales matriculados se encarga de todas las diligencias y presentaciones necesarias para la ejecución de la obra.',
      features: [
        'Permiso municipal',
        'Gas natural',
        'Servicio eléctrico',
        'Agua corriente',
        'Servicio sanitario',
        'Documentación completa',
      ],
    },
    en: {
      title: 'Administrative Management',
      subtitle: 'PAPERWORK AND PERMITS',
      description: 'Our team of licensed professionals handles all the procedures and submissions required to carry out the works.',
      features: [
        'Municipal permit',
        'Natural gas',
        'Electricity supply',
        'Mains water',
        'Sanitation service',
        'Complete documentation',
      ],
    },
  },
  {
    id: 'administracion-de-obra',
    number: '03',
    image: 'img/PROGRESO-Y-BIARRITZ/01.jpg',
    es: {
      title: 'Administración de Obra',
      subtitle: 'CONTROL TOTAL',
      description: 'Llevamos un control digital y analógico de todos los comprobantes de pagos a proveedores, facturas emitidas y recibidas. Esto nos permite llevar un control minucioso de los gastos de las obras.',
      features: [
        'Control de pagos',
        'Gestión de facturas',
        'Reportes detallados',
        'Seguimiento en tiempo real',
        'Transparencia total',
        'Informes mensuales',
      ],
    },
    en: {
      title: 'Site Administration',
      subtitle: 'FULL CONTROL',
      description: 'We keep both digital and physical records of every supplier payment receipt and of all invoices issued and received. This lets us track site expenditure in fine detail.',
      features: [
        'Payment control',
        'Invoice management',
        'Detailed reporting',
        'Real-time tracking',
        'Full transparency',
        'Monthly reports',
      ],
    },
  },
  {
    id: 'seguridad-en-obra',
    number: '04',
    image: 'img/COODOPIN/01.jpg',
    es: {
      title: 'Seguridad en Obra',
      subtitle: 'PROTECCIÓN INTEGRAL',
      description: 'Todo el personal que esté afectado a la obra se encuentra contratado y cubierto por cualquier tipo de accidente producto del trabajo que se encuentre realizando.',
      features: [
        'Personal asegurado',
        'Planes de seguridad e higiene',
        'Botiquines de primeros auxilios',
        'Charlas semanales de seguridad',
        'Elementos de protección',
        'Cumplimiento normativo',
      ],
    },
    en: {
      title: 'Site Safety',
      subtitle: 'COMPREHENSIVE PROTECTION',
      description: 'Every member of staff assigned to the site is formally employed and covered against any kind of accident arising from the work being carried out.',
      features: [
        'Insured personnel',
        'Health and safety plans',
        'First aid kits',
        'Weekly safety briefings',
        'Protective equipment',
        'Regulatory compliance',
      ],
    },
  },
  {
    id: 'construccion',
    number: '05',
    image: 'img/ANCLA/02.jpg',
    es: {
      title: 'Construcción',
      subtitle: 'EJECUCIÓN PROFESIONAL',
      description: 'Ofrecemos las opciones de construcción mediante las modalidades llave en mano, mano de obra o mixtas. Toda la construcción se realiza con nuestro staff permanente de albañiles, plomeros, electricistas y contratistas.',
      features: [
        'Llave en mano',
        'Mano de obra especializada',
        'Modalidades mixtas',
        'Staff permanente',
        'Seguimiento continuo',
        'Garantía de calidad',
      ],
    },
    en: {
      title: 'Construction',
      subtitle: 'PROFESSIONAL EXECUTION',
      description: 'We offer construction on a turnkey, labour-only or mixed basis. All construction is carried out by our permanent staff of bricklayers, plumbers, electricians and contractors.',
      features: [
        'Turnkey',
        'Specialised labour',
        'Mixed arrangements',
        'Permanent staff',
        'Continuous supervision',
        'Quality guarantee',
      ],
    },
  },
]

export const localizeService = (service, lang = 'es') => ({
  ...service,
  ...(service[lang] || service.es),
})

export default services

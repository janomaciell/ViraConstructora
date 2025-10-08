"use client"

import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import WhatsAppButton from "../components/WhatsAppButton"
import "./ProjectDetail.css"

const ProjectDetail = () => {
  const { id } = useParams() // id debe coincidir con el id del proyecto
  const [currentImage, setCurrentImage] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  // Base de datos completa de proyectos (expandida con info real)
  const projectsData = {
    "ancla-i": {
      title: "ANCLA I",
      subtitle: "Proyecto integral con vistas privilegiadas",
      type: "PROYECTO, DIRECCION Y CONSTRUCCION",
      location: "Pinamar, Buenos Aires",
      year: "2024",
      status: "Completado",
      specs: {
        area: "180",
        bedrooms: "4",
        bathrooms: "3",
        garage: "2 autos",
        lot: "500 M²"
      },
      description: "ANCLA I es un desarrollo completo que combina proyecto arquitectónico, dirección técnica y construcción de alta calidad. Con 180 m² distribuidos en espacios amplios y funcionales, esta vivienda destaca por su integración con el entorno costero y terminaciones premium.",
      features: [
        "Diseño contemporáneo con 4 dormitorios",
        "3 baños completos en suite",
        "Áreas sociales abiertas al exterior",
        "Construcción antisísmica y ecológica",
        "Terminaciones de lujo",
        "Jardín integrado",
        "Cochera cubierta"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: [
        { name: "Durlock", category: "Construcción en seco" },
        { name: "FV", category: "Sanitarios" }
      ]
    },
    "vulcano-i": {
      title: "VULCANO I",
      subtitle: "Eficiencia y modernidad en espacios compactos",
      type: "PROYECTO, DIRECCION Y CONSTRUCCION",
      location: "Pinamar, Buenos Aires",
      year: "2024",
      status: "Completado",
      specs: {
        area: "145",
        bedrooms: "3",
        bathrooms: "2",
        garage: "1 auto",
        lot: "380 M²"
      },
      description: "VULCANO I ofrece un desarrollo integral de 145 m², optimizado para la vida costera. Incluye proyecto, dirección y construcción con énfasis en la durabilidad y el confort, ideal para familias pequeñas.",
      features: [
        "3 dormitorios funcionales",
        "2 baños modernos",
        "Cocina integrada y living amplio",
        "Materiales resistentes al clima costero",
        "Aislación térmica avanzada",
        "Terraza semi-cubierta",
        "Eficiencia energética"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: []
    },
    "chape-i": {
      title: "CHAPE I",
      subtitle: "Diseño funcional para el hogar ideal",
      type: "PROYECTO, DIRECCION Y CONSTRUCCION",
      location: "Pinamar, Buenos Aires",
      year: "2023",
      status: "Completado",
      specs: {
        area: "155",
        bedrooms: "3",
        bathrooms: "3",
        garage: "1 auto",
        lot: "400 M²"
      },
      description: "CHAPE I es un proyecto de 155 m² que integra diseño, dirección y construcción para crear un espacio habitable y moderno. Enfocado en la comodidad diaria con terminaciones de alta gama.",
      features: [
        "3 dormitorios con baño en suite",
        "Espacios multifuncionales",
        "Cocina equipada de diseño",
        "Pisos de porcelanato importado",
        "Ventilación natural optimizada",
        "Área exterior con parrilla",
        "Domótica básica"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: [
        { name: "Johnson", category: "Revestimientos" }
      ]
    },
    "dafna-i": {
      title: "DAFNA I",
      subtitle: "Arquitectura contemporánea en evolución",
      type: "PROYECTO Y DIRECCION",
      location: "Pinamar, Buenos Aires",
      year: "2024",
      status: "Completado",
      specs: {
        area: "155",
        bedrooms: "3",
        bathrooms: "3",
        garage: "1 auto",
        lot: "420 M²"
      },
      description: "DAFNA I enfoca en proyecto y dirección de obra para una vivienda de 155 m² con diseño innovador. Prioriza la sostenibilidad y la integración ambiental.",
      features: [
        "3 dormitorios luminosos",
        "3 baños con hidromasaje",
        "Diseño bioclimático",
        "Paneles solares integrados",
        "Espacios flexibles",
        "Jardín vertical",
        "Iluminación LED eficiente"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: []
    },
    "dedalo-i": {
      title: "DEDALO I",
      subtitle: "Funcionalidad en cada rincón",
      type: "PROYECTO Y DIRECCION",
      location: "Pinamar, Buenos Aires",
      year: "2023",
      status: "Completado",
      specs: {
        area: "140",
        bedrooms: "3",
        bathrooms: "3",
        garage: "1 auto",
        lot: "350 M²"
      },
      description: "DEDALO I es un proyecto y dirección de 140 m² diseñado para maximizar el uso del espacio en un entorno costero, con énfasis en la practicidad y el estilo minimalista.",
      features: [
        "3 dormitorios compactos",
        "3 baños ergonómicos",
        "Layout optimizado",
        "Almacenamiento inteligente",
        "Ventanas panorámicas",
        "Cochera techada",
        "Área de lavado integrada"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: []
    },
    "dedalo-ii": {
      title: "DEDALO II",
      subtitle: "Construcción de calidad superior",
      type: "CONSTRUCCION",
      location: "Pinamar, Buenos Aires",
      year: "2024",
      status: "Completado",
      specs: {
        area: "155",
        bedrooms: "3",
        bathrooms: "3",
        garage: "2 autos",
        lot: "450 M²"
      },
      description: "DEDALO II se centra en la fase de construcción de una vivienda de 155 m², utilizando técnicas avanzadas para garantizar durabilidad y estética moderna.",
      features: [
        "Estructura reforzada",
        "3 dormitorios aislados acústicamente",
        "3 baños con grifería premium",
        "Pisos flotantes",
        "Impermeabilización total",
        "Instalaciones eléctricas certificadas",
        "Acabados en madera natural"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: [
        { name: "Cementos Avellaneda", category: "Materiales base" }
      ]
    },
    "positive-house-xii": {
      title: "POSITIVE HOUSE XII",
      subtitle: "Sustentabilidad en arquitectura residencial",
      type: "CONSTRUCCION",
      location: "Pinamar, Buenos Aires",
      year: "2023",
      status: "Completado",
      specs: {
        area: "150",
        bedrooms: "3",
        bathrooms: "3",
        garage: "1 auto",
        lot: "400 M²"
      },
      description: "POSITIVE HOUSE XII es una construcción de 150 m² enfocada en principios sustentables, con materiales ecológicos y diseño pasivo para reducir el impacto ambiental.",
      features: [
        "3 dormitorios eco-friendly",
        "3 baños con ahorro de agua",
        "Techo verde integrado",
        "Energía solar fotovoltaica",
        "Aislamiento natural",
        "Recolección de lluvia",
        "Mobiliario reciclado"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: [
        { name: "EcoTech", category: "Sistemas sustentables" }
      ]
    },
    "positive-house-xiii": {
      title: "POSITIVE HOUSE XIII",
      subtitle: "Eficiencia energética en diseño compacto",
      type: "CONSTRUCCION",
      location: "Pinamar, Buenos Aires",
      year: "2024",
      status: "Completado",
      specs: {
        area: "130",
        bedrooms: "3",
        bathrooms: "2",
        garage: "1 auto",
        lot: "350 M²"
      },
      description: "POSITIVE HOUSE XIII construye 130 m² con enfoque en eficiencia, utilizando tecnologías de bajo consumo para una vida cómoda y económica.",
      features: [
        "3 dormitorios bien distribuidos",
        "2 baños funcionales",
        "Electrodomésticos de bajo consumo",
        "Iluminación LED en toda la casa",
        "Ventanas de doble vidrio",
        "Termotanque solar",
        "Diseño compacto y práctico"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: []
    },
    "barrio-coodopin": {
      title: "BARRIO COODOPIN",
      subtitle: "Desarrollo comunitario con visión integral",
      type: "DIRECCION DE OBRA",
      location: "Pinamar, Buenos Aires",
      year: "2023",
      status: "Completado",
      specs: {
        area: "1280",
        bedrooms: "18 viviendas",
        bathrooms: "variable",
        garage: "variable",
        lot: "5000 M²"
      },
      description: "BARRIO COODOPIN es un proyecto de dirección de obra para un desarrollo residencial de 18 viviendas,             fomentando la comunidad y el bienestar integral.",
      features: [
        "Variedad de tipologías habitacionales",
        "Áreas comunes diseñadas para socializar",
        "Espacios verdes y recreativos",
        "Caminos peatonales seguros",
        "Infraestructura moderna",
        "Sistemas de seguridad integrados",
        "Gestión eficiente de recursos"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-160  0596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: [
        { name: "Cementos Avellaneda", category: "Materiales base" },
        { name: "Durlock", category: "Construcción en seco" }
      ]
    },
    "niza-i": {
      title: "NIZA I",
      subtitle: "Proyecto multifamiliar con diseño contemporáneo",
      type: "PROYECTO",
      location: "Pinamar, Buenos Aires",
      year: "2024",
      status: "Completado",
      specs: {
        area: "350",
        bedrooms: "6 unidades funcionales",
        bathrooms: "variable",
        garage: "variable",
        lot: "800 M²"
      },
      description: "NIZA I es un proyecto de desarrollo multifamiliar que incluye 6 unidades funcionales, combinando diseño contemporáneo con funcionalidad para diversos estilos de vida.",
      features: [
        "Unidades de 1, 2 y 3 dormitorios",
        "Diseño modular y flexible",
        "Áreas comunes atractivas",
        "Cocinas equipadas",
        "Balcones privados",
        "Espacios verdes integrados",
        "Acceso controlado"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: []
    },
    "garzas-i": {
      title: "GARZAS I",
      subtitle: "Amplitud y confort en diseño moderno",
      type: "CONSTRUCCION",
      location: "Pinamar, Buenos Aires",
      year: "2024",
      status: "Completado",
      specs: {
        area: "230",
        bedrooms: "3",
        bathrooms: "2",
        garage: "2 autos",
        lot: "600 M²"
      },
      description: "GARZAS I es una construcción de 230 m² que destaca por sus espacios amplios y luminosos. Diseñada para familias que buscan confort y funcionalidad, con terminaciones de primera calidad y ambientes integrados.",
      features: [
        "3 dormitorios amplios con vestidores",
        "2 baños completos con hidromasaje",
        "Living comedor integrado de gran amplitud",
        "Cocina moderna con isla central",
        "Galería cubierta con parrilla",
        "Jardín con sistema de riego automatizado",
        "Cochera doble techada",
        "Pisos de porcelanato en toda la casa"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: [
        { name: "FV", category: "Sanitarios" },
        { name: "Johnson", category: "Revestimientos" }
      ]
    },
    "progreso-y-biarritz": {
      title: "PROGRESO Y BIARRITZ",
      subtitle: "Desarrollo multifamiliar de alto estándar",
      type: "PROYECTO Y FINAL DE OBRA",
      location: "Pinamar, Buenos Aires",
      year: "2023",
      status: "Completado",
      specs: {
        area: "435",
        bedrooms: "7 unidades",
        bathrooms: "variable",
        garage: "7 cocheras",
        lot: "900 M²"
      },
      description: "PROGRESO Y BIARRITZ es un desarrollo integral de 435 m² que incluye proyecto completo y finalización de obra para 7 unidades funcionales. Combina diseño contemporáneo con distribuciones eficientes para crear espacios habitables de calidad.",
      features: [
        "7 unidades funcionales independientes",
        "Diseño contemporáneo y minimalista",
        "Áreas comunes de uso compartido",
        "Sistema de acceso con videoportero",
        "Cocheras individuales cubiertas",
        "Instalaciones de gas y agua individuales",
        "Pre-instalación de aires acondicionados",
        "Espacios verdes comunitarios"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: [
        { name: "Durlock", category: "Construcción en seco" },
        { name: "FV", category: "Sanitarios" }
      ]
    },
    "espartillo-i": {
      title: "ESPARTILLO I",
      subtitle: "Elegancia costera con vistas panorámicas",
      type: "PROYECTO, DIRECCION Y CONSTRUCCION",
      location: "Pinamar, Buenos Aires",
      year: "2024",
      status: "Completado",
      specs: {
        area: "235",
        bedrooms: "4",
        bathrooms: "3",
        garage: "2 autos",
        lot: "700 M²"
      },
      description: "ESPARTILLO I es un proyecto integral de 235 m² que combina diseño, dirección y construcción en una vivienda de lujo costera. Con 4 dormitorios y amplios espacios sociales, esta casa está pensada para disfrutar de la vida junto al mar con máximo confort.",
      features: [
        "4 dormitorios en suite con vestidores",
        "3 baños completos de diseño",
        "Living comedor de doble altura",
        "Cocina integrada con office",
        "Deck exterior con piscina",
        "Quincho cubierto con parrilla",
        "Cochera doble con portón automático",
        "Sistema de domótica integrado"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: [
        { name: "FV", category: "Sanitarios" },
        { name: "Johnson", category: "Revestimientos" },
        { name: "Durlock", category: "Construcción en seco" }
      ]
    },
    "corbeta-agradable-i": {
      title: "CORBETA AGRADABLE I",
      subtitle: "Diseño compacto y funcional",
      type: "PROYECTO, DIRECCION Y CONSTRUCCION",
      location: "Pinamar, Buenos Aires",
      year: "2023",
      status: "Completado",
      specs: {
        area: "90",
        bedrooms: "2",
        bathrooms: "1",
        garage: "1 auto",
        lot: "300 M²"
      },
      description: "CORBETA AGRADABLE I es un proyecto compacto de 90 m² ideal para parejas o pequeñas familias. Incluye diseño completo, dirección y construcción, optimizando cada metro cuadrado con soluciones inteligentes y diseño eficiente.",
      features: [
        "2 dormitorios con placares empotrados",
        "1 baño completo moderno",
        "Living comedor integrado",
        "Cocina americana equipada",
        "Patio con espacio para parrilla",
        "Cochera cubierta",
        "Terminaciones de calidad",
        "Bajo costo de mantenimiento"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: []
    },
    "silfides-i": {
      title: "SILFIDES I",
      subtitle: "Modernidad y espacios abiertos",
      type: "PROYECTO, DIRECCION Y CONSTRUCCION",
      location: "Pinamar, Buenos Aires",
      year: "2024",
      status: "Completado",
      specs: {
        area: "150",
        bedrooms: "4",
        bathrooms: "3",
        garage: "1 auto",
        lot: "450 M²"
      },
      description: "SILFIDES I es un proyecto de 150 m² que prioriza los espacios abiertos y la conexión interior-exterior. Con 4 dormitorios y 3 baños, ofrece un equilibrio perfecto entre privacidad y áreas sociales amplias.",
      features: [
        "4 dormitorios distribuidos estratégicamente",
        "3 baños completos modernos",
        "Living comedor con grandes ventanales",
        "Cocina abierta al comedor",
        "Galería semicubierta",
        "Jardín con césped natural",
        "Cochera con espacio de guardado",
        "Iluminación LED en toda la casa"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: [
        { name: "FV", category: "Sanitarios" }
      ]
    },
    "zorzal-i": {
      title: "ZORZAL I",
      subtitle: "Arquitectura contemporánea en armonía",
      type: "PROYECTO, DIRECCION Y CONSTRUCCION",
      location: "Pinamar, Buenos Aires",
      year: "2023",
      status: "Completado",
      specs: {
        area: "120",
        bedrooms: "3",
        bathrooms: "2",
        garage: "1 auto",
        lot: "380 M²"
      },
      description: "ZORZAL I es un desarrollo de 120 m² con arquitectura contemporánea que se integra perfectamente al entorno. Proyecto completo que incluye diseño, dirección y construcción con enfoque en la sustentabilidad y el confort.",
      features: [
        "3 dormitorios con ventilación cruzada",
        "2 baños con grifería de primera línea",
        "Living comedor con salida al jardín",
        "Cocina funcional equipada",
        "Terraza semicubierta",
        "Jardín de bajo mantenimiento",
        "Cochera techada",
        "Materiales resistentes al clima costero"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: []
    },
    "colon-i": {
      title: "COLON I",
      subtitle: "Funcionalidad y eficiencia en cada detalle",
      type: "PROYECTO",
      location: "Pinamar, Buenos Aires",
      year: "2024",
      status: "Completado",
      specs: {
        area: "120",
        bedrooms: "3",
        bathrooms: "2",
        garage: "1 auto",
        lot: "350 M²"
      },
      description: "COLON I es un proyecto arquitectónico de 120 m² enfocado en la funcionalidad y la eficiencia espacial. Diseñado con criterios modernos de distribución y optimización de recursos para una vivienda práctica y confortable.",
      features: [
        "3 dormitorios con diseño inteligente",
        "2 baños optimizados",
        "Distribución eficiente de espacios",
        "Cocina integrada al comedor",
        "Área de servicio independiente",
        "Patio con espacio verde",
        "Cochera con acceso directo",
        "Diseño de bajo consumo energético"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80"
      ],
      team: {
        architect: "Estudio VIRA Arquitectos",
        builder: "VIRA Constructora",
        landscape: "Verde Diseño Paisajístico"
      },
      partners: []
    }
  }

  const project = projectsData[id]

  useEffect(() => {
    // Resetear imagen actual al cambiar de proyecto
    setCurrentImage(0)
  }, [id])

  if (!project) {
    return (
      <div className="project-detail-page">
        <h2>Proyecto no encontrado</h2>
        <Link to="/proyectos" className="back-link">Volver a Proyectos</Link>
      </div>
    )
  }

  const openGallery = (index) => {
    setCurrentImage(index)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev === project.gallery.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="project-detail-page">
      <header className="project-header">
        <h1 className="project-title">{project.title}</h1>
        <p className="project-subtitle">{project.subtitle}</p>
        <Link to="/proyectos" className="back-link">Volver a Proyectos</Link>
      </header>

      <section className="project-info-section">
        <div className="project-info">
          <p><strong>Tipo:</strong> {project.type}</p>
          <p><strong>Ubicación:</strong> {project.location}</p>
          <p><strong>Año:</strong> {project.year}</p>
          <p><strong>Estado:</strong> {project.status}</p>
        </div>
        <div className="project-specs">
          <p><strong>Superficie:</strong> {project.specs.area} m²</p>
          <p><strong>Dormitorios:</strong> {project.specs.bedrooms}</p>
          <p><strong>Baños:</strong> {project.specs.bathrooms}</p>
          <p><strong>Garage:</strong> {project.specs.garage}</p>
          <p><strong>Terreno:</strong> {project.specs.lot} m²</p>
        </div>
      </section>

      <section className="project-description-section">
        <h2>Descripción</h2>
        <p>{project.description}</p>
      </section>

      <section className="project-features-section">
        <h2>Características Destacadas</h2>
        <ul>
          {project.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="project-gallery-section">
        <h2>Galería de Imágenes</h2>
        <div className="gallery-grid">
          {project.gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${project.title} - Imagen ${index + 1}`}
              className="gallery-thumbnail"
              onClick={() => openGallery(index)}
            />
          ))}
        </div>
      </section>

      {isGalleryOpen && (
        <div className="lightbox-overlay" onClick={closeGallery}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeGallery}>&times;</button>
            <button className="lightbox-prev" onClick={prevImage}>&lt;</button>
            <img
              src={project.gallery[currentImage]}
              alt={`${project.title} - Imagen ${currentImage + 1}`}
              className="lightbox-image"
            />
            <button className="lightbox-next" onClick={nextImage}>&gt;</button>
          </div>
        </div>
      )}

      <section className="project-team-section">
        <h2>Equipo del Proyecto</h2>
        <p><strong>Arquitectura:</strong> {project.team.architect}</p>
        <p><strong>Constructora:</strong> {project.team.builder}</p>
        <p><strong>Diseño de Paisajismo:</strong> {project.team.landscape}</p>
      </section>

      {project.partners.length > 0 && (
        <section className="project-partners-section">
          <h2>Socios y Proveedores</h2>
          <ul>
            {project.partners.map((partner, index) => (
              <li key={index}>{partner.name} - {partner.category}</li>
            ))}
          </ul>
        </section>
      )}

      <WhatsAppButton />
    </div>
  )
}

export default ProjectDetail
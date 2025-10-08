"use client"

import { useEffect } from "react"

const WhatsAppButton = () => {
  useEffect(() => {
    const button = document.querySelector(".whatsapp-float")
    if (button) {
      button.style.opacity = "0"
      button.style.transform = "scale(0)"

      setTimeout(() => {
        button.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        button.style.opacity = "1"
        button.style.transform = "scale(1)"
      }, 1000)
    }
  }, [])

  return (
    <a
      href="https://wa.me/5491161684537?text=Hola!%20Quiero%20consultar%20sobre%20un%20proyecto%20de%20VIRA%20Constructora"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contactar por WhatsApp"
    >
      💬
    </a>
  )
}

export default WhatsAppButton

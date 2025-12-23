import { useEffect, useRef } from "react";
import "../styles/service.css";

// Importaciones de videos (Vite procesará estos archivos correctamente)
import V_yadira from "../../public/VIDEO_BETR_2025.mp4";
import V_procesos from "../../public/MAPA_DE_PROCESOS_2.mp4";
import V_trailer from "../../public/TRAILER BETR MEDIA 10.mp4";
import V_betrPodcast from "../../public/REEL_HORIZONTAL.mp4";

const services = [
  {
    titulo: '✨ Así construimos un canal ganador',
    description: 'Descubre cómo llevamos tu contenido a su mejor versión: diagnóstico, estrategia y un equipo que hace magia detrás de cada video. Todo fluye, todo suma, todo crece. 🚀',
    video: V_procesos
  },
  {
    titulo: '🌍 Monetiza tu contenido a escala global',
    description: 'Impulsamos tu alcance con estrategias certificadas y análisis real. Más ingresos, más proyección y un equipo que domina cada plataforma para llevarte más lejos.',
    video: V_yadira
  },
  {
    titulo: '📈 Más vistas, más ingresos, más impacto',
    description: 'Maximizamos tu alcance, fortalecemos tus ventas y escalamos tu contenido con datos y pauta inteligente. Betrmedia: impacto global, rendimiento comprobado.',
    video: V_trailer
  },
  {
    titulo: '⚡ Voces que están cambiando la era digital',
    description: 'En Betr Podcast exploramos cómo las redes impactan a quienes mueven el mundo. Opiniones, experiencias y visión de los líderes del ecosistema digital.',
    video: V_betrPodcast
  }
];

export default function ServiceSection() {
  const refs = useRef([]);

  useEffect(() => {
    // IntersectionObserver para detectar el scroll y activar la animación
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Añade la clase que activa el movimiento de abajo hacia arriba definido en el CSS
            entry.target.classList.add("fade-in-up");
            // Una vez animado, dejamos de observar para ahorrar recursos
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1, // El elemento debe estar visible al 10% para activarse
        rootMargin: "0px 0px -100px 0px" // Margen inferior para que la animación se sienta más natural
      }
    );

    // Observar cada tarjeta de servicio
    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="service_section">
      {services.map((item, index) => (
        <div className="container_service" key={index}>
          <div
            className={`service_card ${index % 2 === 0 ? "left" : "right"}`}
            ref={(el) => (refs.current[index] = el)}
          >
            {/* Contenedor de Video con soporte para controles y reproducción fluida */}
            <div className="video_container">
              <video 
                src={item.video} 
                controls
                muted      // Necesario para que el navegador permita el autoplay si se desea
                playsInline // Crucial para que funcione correctamente en iPhone/Android
                loop       // Mantiene el movimiento visual en la página
                className="service_video"
              >
                Tu navegador no soporta videos.
              </video>
            </div>

            {/* Bloque de textos alineado automáticamente por el CSS (zigzag) */}
            <div className="service_texts">
              <h3>{item.titulo}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
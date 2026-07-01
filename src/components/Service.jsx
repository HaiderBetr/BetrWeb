import { useEffect, useRef } from "react";
import "../styles/service.css";

const services = [
  {
    titulo: '✨ Así construimos un canal ganador',
    description: 'Descubre cómo llevamos tu contenido a su mejor versión: diagnóstico, estrategia y un equipo que hace magia detrás de cada video. Todo fluye, todo suma, todo crece. 🚀',
    video: "https://www.youtube.com/embed/RQts9veqzw4?si=EozYq1ra2Ga6ciyE"
  },
  {
    titulo: '🌍 Monetiza tu contenido a escala global',
    description: 'Impulsamos tu alcance con estrategias certificadas y análisis real. Más ingresos, más proyección y un equipo que domina cada plataforma para llevarte más lejos.',
    video: "https://www.youtube.com/embed/jFqTlfpQs_c?si=fjfrIu2lHBks2jcu"
  },
  {
    titulo: '📈 Más vistas, más ingresos, más impacto',
    description: 'Maximizamos tu alcance, fortalecemos tus ventas y escalamos tu contenido con datos y pauta inteligente. Betrmedia: impacto global, rendimiento comprobado.',
    video: "https://www.youtube.com/embed/hGHvArrgBUQ?si=WdE4cyH9n43Ftx_W"
  },
  {
    titulo: '⚡ Voces que están cambiando la era digital',
    description: 'En Betr Podcast exploramos cómo las redes impactan a quienes mueven el mundo. Opiniones, experiencias y visión de los líderes del ecosistema digital.',
    video: "https://www.youtube.com/embed/Gs8MekfEmzE?si=R1cOc30FmuKO_DPp"
  }
];

export default function ServiceSection() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

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
            {/* ✅ IFRAME EN VEZ DE VIDEO */}
            <div className="video_container">
              <iframe
                src={`${item.video}?autoplay=0&mute=1`}
                title={`video-${index}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="service_video"
              />
            </div>

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
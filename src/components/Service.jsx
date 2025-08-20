import { useEffect, useRef } from "react";
import "../styles/service.css";

const services = [
  {
    titulo: 'ESTRATEGIA DIGITAL Y DISTRIBUCIÓN DE CONTENIDO',
    description: 'Reconocemos la necesidad de crear una estrategia y distribución digital a medida, que se alinee perfectamente con las plataformas donde compartes tu contenido.',
    video: null
  },
  {
    titulo: 'MARKETING DIGITAL',
    description: 'Nuestro equipo se enfoca en crear, administrar, producir y pautar contenido en redes sociales para establecer conexiones con tus audiencias y dirigir el tráfico hacia el contenido más rentable.',
    video: null
  },
  {
    titulo: 'MONETIZACIÓN Y IP RIGHTS',
    description: 'Utilizamos estrategias operativas para aumentar tus ingresos publicitarios y proteger tus derechos de autor. Ponemos límites y reclamaciones al uso no autorizado de tu material.',
    video: null
  },
  {
    titulo: 'SOCIAL LISTENING',
    description: 'Contamos con una herramienta para realizar escucha social a través de las plataformas sociales de mayor alcance. Te daremos toda la información acerca de cómo es percibida tu marca.',
    video: null
  },
  {
    titulo: 'INTELIGENCIA ARTIFICIAL',
    description: 'Mediante nuestra AI, proporcionamos insights sobre cómo tu contenido impactará a los usuarios, indicando sus sentimientos y qué capta su atención en cada momento.',
    video: null
  }
];

export default function ServiceSection() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach(ref => {
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
            ref={el => (refs.current[index] = el)}
          >
            <div className="video_placeholder">Video a cargo de Edición</div>
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


import { useEffect, useRef } from 'react';
import '../styles/about.css';
import equipoImg from '/EQUIPO-BETR-7.webp';
import logoBlanco from '../assets/logo-blanco.png';

export default function AboutUs() {
  const factRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    factRefs.current.forEach(el => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about_section">
      <div className="about_banner_container">
        <img src={equipoImg} alt="Equipo Betr Media" className="about_banner_img" loading='lazy' />
        <div className="about_banner_overlay">
      <div className='cotainer_logo'>
        <img src={logoBlanco} alt="logo Betr negro" className="logoNegro" loading='lazy' />
      </div>
          <h2>¿QUIÉNES SOMOS?</h2>
          <p>
            Betr Media es una empresa de distribución y monetización de contenido en plataformas digitales como YouTube, Facebook y televisión conectada. Tenemos sedes en Bucaramanga y Miami. Nuestro enfoque combina creatividad, análisis de datos e inteligencia artificial para optimizar contenido y aumentar ingresos. Protegemos tus derechos de autor y transformamos tu contenido en experiencias valiosas para tu audiencia.
          </p>
        </div>
      </div>

      <div className="about_facts">
        {[
          { titulo: "Estrategias Digitales", texto: "Nuestras estrategias se basan en métricas y el conocimiento de algoritmos de plataformas para obtener los mejores resultados." },
          { titulo: "Equipo Capacitado", texto: "Contamos con un equipo experimentado y capacitado que garantiza procesos de excelente calidad para nuestros clientes." },
          { titulo: "Resultados Reales", texto: "Hemos alcanzado más de 13 billones de views, y también 1 billón de horas de watchtime y por último 9 millones de dólares en ingresos." },
          { titulo: "Cobertura Global", texto: "Nuestro sistema de operaciones nos permite respaldarte desde cualquier lugar del mundo." },
          { titulo: "Disponibilidad Total", texto: "Apoyamos, distribuimos y monetizamos tu contenido en un horario 24 horas 7 días a la semana." },
        ].map((item, i) => (
          <div
            key={i}
            className="fact_box fade-in-up"
            ref={el => (factRefs.current[i] = el)}
          >
            <h3>{item.titulo}</h3>
            <p>{item.texto}</p>
            <span className="fact_number">{`0${i + 1}`}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

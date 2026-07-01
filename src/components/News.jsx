import '../styles/news.css';
import { useRef } from 'react';

export default function News() {
  const newsItems = [
    {
      title: 'YouTube: crecer no es suerte',
      text: 'YouTube es hoy una de las plataformas más poderosas para crecer y monetizar, pero muchos canales no despegan por no entender el algoritmo ni a su audiencia. Cada decisión —desde la idea hasta la publicación— impacta en cómo YouTube recomienda tu contenido…',
      color: '#10cfd6ff',
      borderColor: '#10cfd6ff',
      buttonColor: '#10cfd6ff',
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7392660513630924800',
    },
    {
      title: 'YouTube ahora se crea en equipo',
      text: 'YouTube deja de ser solo videos y se vuelve social: colaboraciones visibles desde el título, audiencias compartidas y nuevas formas de crecer en equipo. Todo apunta a que las estrategias de creación y crecimiento van a cambiar por completo…',
      color: '#ff7c00',
      borderColor: '#ff7c00',
      buttonColor: '#ff7c00',
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7374568095966720001',
    },
    {
      title: 'Instagram ya no es formatos, es estrategia',
      text: 'En 2025 Instagram funciona como un embudo: cada formato cumple un rol distinto y usarlos igual es el error más común. Reels, carruseles, stories y lives deben trabajar juntos para atraer, educar y convertir…',
      color: '#a84fdc',
      borderColor: '#a84fdc',
      buttonColor: '#a84fdc',
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7373777683647741953',
    },
  ];

  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const container = carouselRef.current;
    const width = container.offsetWidth;
    const scrollAmount = width; // avanzamos dos videos (100%)
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="news_section">
      <div className="title_container">
      <h2 className="news_title">NEWS</h2>
      <h2 className="news_title2">BETR</h2>
      </div>

      <div className="news_cards">
        {newsItems.map((item, index) => (
          <div
            className="news_card"
            key={index}
            style={{ borderColor: item.borderColor }}
          >
            <h3 style={{ color: item.color }}>{item.title}</h3>
            <p>{item.text}</p>
            <a
              href={item.link}
              className="news_button"
              style={{ backgroundColor: item.buttonColor }}
            >
              Ver más
            </a>
          </div>
        ))}
      </div>

      <h2 className="news_subTitle">DESTACADOS</h2>
      <div className="carousel_section">
        <button className="carousel_btn left" onClick={() => scroll('left')}>❮</button>
        <div className="video_carousel" ref={carouselRef}>
          <div className="video_item_group">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Ndm-9MO2pqg?si=YGwbSR6f9RIZdPXf" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"></iframe>           
            <iframe width="560" height="315" src="https://www.youtube.com/embed/lKRFQVJra0E?si=CuGQSeS-fV1JD1ZO" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"></iframe>
          </div>
          <div className="video_item_group">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/-naWOsbvcZE?si=-jlDX3kAPQOdd95B" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/2moOVfPCVT8?si=1u20GjfapP3dJ7me" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"></iframe>
          </div>
          <div className="video_item_group">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/0N5G_ovp-TY?si=c5vKbl0dYm8bkNNO" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"></iframe>
          </div>
        </div>  
        <button className="carousel_btn right" onClick={() => scroll('right')}>❯</button>
      </div>
    </section>
  );
}



import '../styles/news.css';
import { useRef } from 'react';

export default function News() {
  const newsItems = [
    {
      title: '¿QUÉ MARCAS HAN SIDO TENDENCIA GRACIAS A INFLUENCERS Y CELEBRIDADES?',
      text: 'En este blog podrás encontrar tres ejemplos claros en los que influencers y celebridades han generado o sacudido las tendencias en redes sociales a favor o en contra de una marca...',
      color: '#10cfd6ff',
      borderColor: '#10cfd6ff',
      buttonColor: '#10cfd6ff',
      link: '/blogs/tendencias-marcas',
    },
    {
      title: 'ASÍ AYUDAMOS A NUESTROS CLIENTES EN YOUTUBE',
      text: 'En este blog podrás encontrar tres ejemplos claros en los que influencers y celebridades han generado o sacudido las tendencias en redes sociales a favor o en contra de una marca...',
      color: '#ff7c00',
      borderColor: '#ff7c00',
      buttonColor: '#ff7c00',
      link: '/blogs/clientes-youtube',
    },
    {
      title: '¿CÓMO AUMENTAR TU PRESENCIA EN REDES?',
      text: 'Te explicamos cómo desarrollar estrategias sostenibles que mejoren tu engagement y atraigan audiencias clave para tu contenido o marca.',
      color: '#a84fdc',
      borderColor: '#a84fdc',
      buttonColor: '#a84fdc',
      link: '/blogs/presencia-digital',
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
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Ndm-9MO2pqg?si=YGwbSR6f9RIZdPXf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>           
            <iframe width="560" height="315" src="https://www.youtube.com/embed/lKRFQVJra0E?si=CuGQSeS-fV1JD1ZO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"></iframe>
          </div>
          <div className="video_item_group">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/-naWOsbvcZE?si=-jlDX3kAPQOdd95B" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/2moOVfPCVT8?si=1u20GjfapP3dJ7me" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
          </div>
        </div>
        <button className="carousel_btn right" onClick={() => scroll('right')}>❯</button>
      </div>
    </section>
  );
}



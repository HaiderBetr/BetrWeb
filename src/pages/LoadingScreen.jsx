import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import logoBlanco from '../assets/logo-blanco.png';
import logoColor from '../assets/logo-color.png';

const messages = [
  "Calculando Métricas...",
  "Analizando MetaData...",
  "Optimizando Contenidos...",
  "Generando Revenue...",
  "Aumentando el Watch Time...",
];

const floatingWords = [
  "Shorts", "Views", "Revenue", "Engagement", "Likes",
  "Shares", "Subscribers", "CTR", "Reach", "Audience",
  "Watch Time", "Analytics"
];

export default function LoadingScreen() {
  const navigate = useNavigate();
  const loadingTextRef = useRef(null);
  const screenRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const delayPerMessage = 1300;
    const fadeDuration = 400;
    const initialDelay = 600;

    messages.forEach((msg, i) => {
      setTimeout(() => {
        if (!loadingTextRef.current) return;
        loadingTextRef.current.classList.remove("visible");
        setTimeout(() => {
          if (loadingTextRef.current) {
            loadingTextRef.current.textContent = msg;
            loadingTextRef.current.classList.add("visible");
          }
        }, fadeDuration);
      }, initialDelay + i * delayPerMessage);
    });

    const totalTime = initialDelay + messages.length * delayPerMessage + 1000;

    const redirTimeout = setTimeout(() => {
      if (screenRef.current) screenRef.current.classList.add("fade-out");
      setTimeout(() => {
        navigate("/main");
      }, 1500);
    }, totalTime);

    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const frase = floatingWords[Math.floor(Math.random() * floatingWords.length)];
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = frase;
      span.style.top = Math.random() * 90 + "%";
      span.style.left = Math.random() * 90 + "%";
      span.style.fontSize = `${0.6 + Math.random() * 0.4}rem`;
      containerRef.current.appendChild(span);
      setTimeout(() => span.remove(), 4000);
    }, 300);

    return () => {
      clearTimeout(redirTimeout);
      clearInterval(interval);
      document.body.style.overflow = 'auto';
    };
  }, [navigate]);

  return (
    <div className="loading_screen" ref={screenRef}>
      <div className="background_words" ref={containerRef}></div>

      <div className="logo_container">
        <img src={logoBlanco} alt="Logo Blanco" className="logo_white" />
        <div className="logo_masked">
          <img src={logoColor} alt="Logo Color" className="logo_masked" />
        </div>
      </div>

      <div className="loading_text visible" ref={loadingTextRef}>
        Cargando...
      </div>
    </div>
  );
}

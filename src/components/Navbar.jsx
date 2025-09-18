import '../styles/main.css';
import logoColor from '../assets/logo-color.png';
import { Link } from "react-scroll";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Bloquear scroll de fondo + cerrar con ESC y click fuera
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);

    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onClickOutside = (e) => {
      if (!open) return;
      const isToggle = toggleRef.current?.contains(e.target);
      const isMenu = menuRef.current?.contains(e.target);
      if (!isToggle && !isMenu) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClickOutside);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClickOutside);
    };
  }, [open]);

  const closeAndScroll = () => setOpen(false);

  return (
    <header className="navbar" role="banner">
      <img src={logoColor} className="logo-navbar" alt="Logo Navbar" />

      {/* Botón hamburguesa (abre) */}
      <button
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="primary-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen(v => !v)}
        ref={toggleRef}
      >
        <span className={`hamburger ${open ? "is-active" : ""}`} aria-hidden="true">
          <span /><span /><span />
        </span>
      </button>

      {/* Menú (overlay en móvil/tablet, fila en desktop) */}
      <nav id="primary-menu" aria-label="Navegación principal">
        <ul className={`nav-links ${open ? "is-open" : ""}`} ref={menuRef}>
          {/* Botón de cierre DENTRO del overlay (la X siempre visible) */}
          <li className="nav-close">
            <button
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="nav-close-btn"
            >
              <span className="hamburger is-active" aria-hidden="true">
                <span /><span /><span />
              </span>
            </button>
          </li>

          <li><Link className="nav-link" to="Main" smooth duration={850} offset={-70} onClick={closeAndScroll}>Inicio</Link></li>
          <li><Link className="nav-link" to="SuccessCases" smooth duration={850} offset={-70} onClick={closeAndScroll}>Casos de Éxito</Link></li>
          <li><Link className="nav-link" to="Service" smooth duration={850} offset={-70} onClick={closeAndScroll}>Servicios</Link></li>
          <li><Link className="nav-link" to="AboutUs" smooth duration={850} offset={-70} onClick={closeAndScroll}>Quienes somos</Link></li>
          <li><Link className="nav-link" to="News" smooth duration={850} offset={-70} onClick={closeAndScroll}>News</Link></li>
          <li><Link className="nav-link" to="Globe" smooth duration={850} offset={-70} onClick={closeAndScroll}>Alianzas</Link></li>
          <li><Link className="nav-link" to="Leaders" smooth duration={850} offset={-70} onClick={closeAndScroll}>Leaders</Link></li>
          <li><Link className="nav-link" to="Contact" smooth duration={850} offset={-70} onClick={closeAndScroll}>Contáctanos</Link></li>
        </ul>
      </nav>
    </header>
  );
}

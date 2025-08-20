import '../styles/main.css';
import logoColor from '../assets/logo-color.png';

export default function Navbar() {
  return (
    <header className="navbar">
      <img src={logoColor} className="logo-navbar" alt="Logo Navbar" />
      <ul className="nav-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Casos de Éxito</a></li>
        <li><a href="#">Servicios</a></li>
        <li><a href="#">Quienes somos</a></li>
        <li><a href="#">News</a></li>
        <li><a href="#">Alianzas</a></li>
        <li><a href="#">Leaders</a></li>
        <li><a href="#">Contáctanos</a></li>
      </ul>
    </header>
  );
}

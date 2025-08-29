import '../styles/main.css';
import logoColor from '../assets/logo-color.png';
import { Link } from "react-scroll";

export default function Navbar() {
  return (
    <header className="navbar">
      <img src={logoColor} className="logo-navbar" alt="Logo Navbar" />
      <ul className="nav-links">
        <li><Link className="nav-link" to="Main" smooth={true} duration={850}>Inicio</Link></li>
        <li><Link className="nav-link" to="SuccessCases" smooth={true} duration={850}>Casos de Éxito</Link></li>
        <li><Link className="nav-link" to="Service" smooth={true} duration={850}>Servicios</Link></li>
        <li><Link className="nav-link" to="AboutUs" smooth={true} duration={850}>Quienes somos</Link></li>
        <li><Link className="nav-link" to="News" smooth={true} duration={850}>News</Link></li>
        <li><Link className="nav-link" to="Globe" smooth={true} duration={850}>Alianzas</Link></li>
        <li><Link className="nav-link" to="Leaders" smooth={true} duration={850}>Leaders</Link></li>
        <li><Link className="nav-link" to="Contact" smooth={true} duration={850}>Contáctanos</Link></li>
      </ul>
    </header>
  );
}

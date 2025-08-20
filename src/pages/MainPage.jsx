import { useEffect } from "react";
import "../styles/main.css";

import Navbar from "../components/Navbar";
import CounterSection from "../components/CounterSection";
import SuccessCases from "../components/SuccessCases";
import TrustedBy from "../components/TrustedBy";
import Service from "../components/Service";
import AboutUs from "../components/AboutUs";
import News from "../components/News";
import Earth from "../components/Earth";


export default function MainPage() {
  useEffect(() => {
    const BASE_HORAS = 60480;
    let acumuladoMs = 0;
    let inicioReal = Date.now();

    const getHoraColombia = () => {
      const ahoraUTC = new Date();
      return new Date(
        ahoraUTC.toLocaleString("en-US", { timeZone: "America/Bogota" })
      );
    };

    const estaEnHorarioLaboral = (fecha) => {
      const hora = fecha.getHours();
      return hora >= 8 && hora < 17;
    };

    const calcularProgreso = () => {
      const ahora = new Date();
      const transcurridoRealMs = ahora - inicioReal;

      const horaCol = getHoraColombia();
      if (estaEnHorarioLaboral(horaCol)) {
        acumuladoMs += transcurridoRealMs;
      }
      inicioReal = ahora;

      const totalMs = BASE_HORAS * 3600 * 1000 + acumuladoMs;

      const el = (id) => document.getElementById(id);
      if (el("horas")) el("horas").textContent = String(Math.floor(totalMs / 3600000)).padStart(2, "0");
      if (el("minutos")) el("minutos").textContent = String(Math.floor((totalMs % 3600000) / 60000)).padStart(2, "0");
      if (el("segundos")) el("segundos").textContent = String(Math.floor((totalMs % 60000) / 1000)).padStart(2, "0");
      if (el("milisegundos")) el("milisegundos").textContent = String(totalMs % 1000).padStart(3, "0");

      requestAnimationFrame(calcularProgreso);
    };

    calcularProgreso();
  }, []);

  return (
    <div className="main_wrapper">
      <Navbar />

      <section className="video_section">
        <video autoPlay muted loop playsInline>
          <source src="/TRAILER BETR MEDIA 10.mp4" type="video/mp4" />
          Tu navegador no soporta este video.
        </video>
      </section>

      <CounterSection />
      <SuccessCases />
      <TrustedBy />
      <Service />
      <AboutUs />
      <News />
    </div>
  );
}




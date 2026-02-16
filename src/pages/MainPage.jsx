import { useEffect } from "react";
import "../styles/main.css";

import Navbar from "../components/Navbar";
import CounterSection from "../components/CounterSection";
import SuccessCases from "../components/SuccessCases";
import TrustedBy from "../components/TrustedBy";
import Service from "../components/Service";
import AboutUs from "../components/AboutUs";
import News from "../components/News";
import Globe from "../components/Globe";
import Leaders from "../components/Leaders";
import Map from "../components/Map";
import Contact from "../components/Contact";

export default function MainPage() {
  useEffect(() => {
  const EDITORES = 4;
  const HORAS_POR_EDITOR = 5;
  const HORAS_DIARIAS = EDITORES * HORAS_POR_EDITOR; // 20

  const FECHA_INICIO = new Date("2018-01-01T08:00:00-05:00");

  const getHoraColombia = () => {
    const ahoraUTC = new Date();
    return new Date(
      ahoraUTC.toLocaleString("en-US", { timeZone: "America/Bogota" })
    );
  };

  const esDiaLaboral = (fecha) => {
    const dia = fecha.getDay(); // 0 = domingo
    return dia >= 1 && dia <= 5;
  };

  const contarDiasLaborales = (inicio, fin) => {
    let dias = 0;
    const actual = new Date(inicio);

    while (actual <= fin) {
      if (esDiaLaboral(actual)) dias++;
      actual.setDate(actual.getDate() + 1);
    }

    return dias;
  };

  const ahora = getHoraColombia();
  const diasLaborales = contarDiasLaborales(FECHA_INICIO, ahora);

  const totalHorasBase = diasLaborales * HORAS_DIARIAS;
  const inicioAnimacion = Date.now();

  const animar = () => {
    const ahoraAnim = Date.now();
    const deltaMs = ahoraAnim - inicioAnimacion;

    const horasExtra = deltaMs / 3600000;
    const totalHoras = totalHorasBase + horasExtra;

    const totalMs = totalHoras * 3600000;

    const el = (id) => document.getElementById(id);
    if (el("horas")) el("horas").textContent = Math.floor(totalHoras).toString();
    if (el("minutos")) el("minutos").textContent = String(Math.floor((totalMs % 3600000) / 60000)).padStart(2, "0");
    if (el("segundos")) el("segundos").textContent = String(Math.floor((totalMs % 60000) / 1000)).padStart(2, "0");
    if (el("milisegundos")) el("milisegundos").textContent = String(totalMs % 1000).padStart(3, "0");

    requestAnimationFrame(animar);
  };

  animar();
}, []);

  return (
    <div className="main_wrapper">
      <Navbar />

      <section className="video_section" id="Main">
        <video autoPlay muted loop playsInline>
          <source src="/TRAILER BETR MEDIA 10.mp4" type="video/mp4" />
          Tu navegador no soporta este video.
        </video>
      </section>
      <CounterSection />
      <section id="SuccessCases">
      <SuccessCases />
      </section>
      <TrustedBy />
      <section id="Service">
      <Service />
      </section>
      <section id="AboutUs">
      <AboutUs />
      </section>
      <section id="News">
      <News />
      </section>
      <section id="Globe">
      <Globe />
      </section>
      <section id="Leaders">
      <Leaders />
      </section>
      <Map />
      <section id="Contact">
      <Contact />
      </section>
    </div>
  );
}




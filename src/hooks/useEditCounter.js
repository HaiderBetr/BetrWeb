import { useEffect, useState } from "react";

export default function useEditCounter() {
  const [time, setTime] = useState({
    horas: 0,
    minutos: "00",
    segundos: "00",
    milisegundos: "000",
  });

  useEffect(() => {
    const EDITORES = 4;
    const HORAS_POR_EDITOR = 5;
    const HORAS_DIARIAS = EDITORES * HORAS_POR_EDITOR;

    const FECHA_INICIO = new Date("2018-01-01T08:00:00-05:00");

    const esDiaLaboral = (fecha) => {
      const dia = fecha.getDay();
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

    // 🔥 BASE REAL (NO CAMBIA)
    const ahora = new Date();
    const diasLaborales = contarDiasLaborales(FECHA_INICIO, ahora);
    const totalHorasBase = diasLaborales * HORAS_DIARIAS;

    // 💾 CLAVE: persistencia
    let inicioGuardado = localStorage.getItem("contador_inicio");

    if (!inicioGuardado) {
      inicioGuardado = Date.now();
      localStorage.setItem("contador_inicio", inicioGuardado);
    } else {
      inicioGuardado = parseInt(inicioGuardado);
    }

    const animar = () => {
      const ahoraAnim = Date.now();
      const deltaMs = ahoraAnim - inicioGuardado;

      const horasExtra = deltaMs / 3600000;

      const totalHoras = totalHorasBase + horasExtra;
      const totalMs = totalHoras * 3600000;

      setTime({
        horas: Math.floor(totalHoras),
        minutos: String(Math.floor((totalMs % 3600000) / 60000)).padStart(2, "0"),
        segundos: String(Math.floor((totalMs % 60000) / 1000)).padStart(2, "0"),
        milisegundos: String(Math.floor(totalMs % 1000)).padStart(3, "0"),
      });

      requestAnimationFrame(animar);
    };

    animar();
  }, []);

  return time;
}
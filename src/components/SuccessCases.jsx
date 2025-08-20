import "../styles/successCases.css";
import iconOJO from "../assets/logos-client/icon/icono-ojo.png";
import iconPC from "../assets/logos-client/icon/icono-pc.png";
import iconPERSONA from "../assets/logos-client/icon/icono-persona.png";

import doctorImg from "../assets/logos-client/3-TGD.png";
/*import telemundoMain from "../assets/logos-client/7-T.png";*/
import sharkTank from "../assets/logos-client/1-STM.png";
import casoCerrado from "../assets/logos-client/2-CC.png";
import casadosARG from "../assets/logos-client/4-CCHA.png";
import andresLopez from "../assets/logos-client/5-AL.png";
import rosarioT from "../assets/logos-client/6-RT.png";

export default function SuccessCases() {
  const cases = [
    {
      titulo: "THE GOOD DOCTOR",
      visualizaciones: "110M",
      watchtime: "7M h",
      suscriptores: "+270K",
      img: doctorImg,
    },
    /*{
      titulo: "TELEMUNDO MAIN",
      visualizaciones: "10.5B",
      watchtime: "1.1B h",
      suscriptores: "+16M",
      img: telemundoMain,
    },*/
    {
      titulo: "SHARK TANK MÉXICO",
      visualizaciones: "1.2B",
      watchtime: "154M h",
      suscriptores: "+2.1M",
      img: sharkTank,
    },
    {
      titulo: "CASADOS CON HIJOS ARG",
      visualizaciones: "157M",
      watchtime: "15.1M h",
      suscriptores: "156K",
      img: casadosARG,
    },
    {
      titulo: "ANDRÉS LÓPEZ",
      visualizaciones: "46M",
      watchtime: "2.7M h",
      suscriptores: "+137K",
      img: andresLopez,
    },
    {
      titulo: "CASO CERRADO",
      visualizaciones: "10B",
      watchtime: "2.5B h",
      suscriptores: "+12M",
      img: casoCerrado,
    },
    {
      titulo: "ROSARIO TIJERAS",
      visualizaciones: "196M",
      watchtime: "14.8M h",
      suscriptores: "+341K",
      img: rosarioT,
    },
  ];
9
  return (
    <section className="success_cases_section">
      <h2 className="section_title">Casos de Éxito</h2>
      <div className="cases_grid">
        {cases.map((item, i) => (
          <div className="case_card_clean" key={i}>
            <img src={item.img} alt={item.titulo} />
            <div className="case_overlay_bottom">
              <div className="case_title">{item.titulo}</div>
              <div className="case_metrics">
                <div><img src={iconOJO} alt="Visualizaciones" />{item.visualizaciones}</div>
                <div><img src={iconPC} alt="Watchtime" />{item.watchtime}</div>
                <div><img src={iconPERSONA} alt="Suscriptores" />{item.suscriptores}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

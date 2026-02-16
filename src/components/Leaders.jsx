import '../styles/leaders.css';

import joacoImg from "../assets/logos-leaders/joaco.png";
import mariaImg from "../assets/logos-leaders/margarita.png";

export default function Leaders() {
    const team =[
        {
            name: 'MARIA MORA',
            bgColor: '#7B2FF7',
            image: mariaImg,
            items: [
                'Estrategia Disruptiva, HARVARD',
                'Ingeniera de Sistemas con formación en Gestión Empresarial',
                'Distinguida Analista de Sistemas de UCLA',
                'Ex estratega de cuentas',
                'Exdirectora de TI',
                'Apasionada de la Analítica de Datos',
            ],
        },
        {
            name: 'JOAQUIN ROCHA',
            bgColor: '#CFE538',
            image: joacoImg,
            items: [
                'Administrador de Empresas',
                '+15 años en gestión de proyectos y emprendimientos',
                'Consultor de transformación digital',
                'Líder en sinergias de equipos',
                'Ex Director Comercial, Talleres Rocha SAS',
                'Director Comercial y Administrativo, Betr Media SAS',
                'Proactivo y orientado a resultados',
            ],
        },
    ];

    return (
      <section className="leaders_section">
        <div className="leaders_content">
          <div className="leaders_text">
            <h2 className="leaders_title">
              CONOCE A NUESTRO 
              EQUIPO EXPERTO EN
              PLATAFORMAS DIGITALES. 
            </h2>
            <p className="leaders_subtitle">
              Todo proyecto exitoso inicia con un grupo enfocado, comprometido y valiente.
            </p>
            <p className="leaders_desc">
              Nuestro equipo de liderazgo reúne décadas de experiencia y conocimiento en plataformas digitales,
              marketing y medios masivos de comunicación.
              <br />
              Los datos determinan las estrategias en Betr Media, pero la pasión, los valores compartidos y el trabajo
              en equipo son los factores que nos permiten impulsar las campañas de nuestros clientes.
            </p>
          </div>

          <div className="leaders_cards">
            {team.map((person, index) => (
              <div className="leader_card" key={index}>
                <div className="leader_image">
                  <img src={person.image} alt={person.name} />
                </div>
                <div className="leader_name">{person.name}</div>
                <ul className="leader_list">
                  {person.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}
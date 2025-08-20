import '../styles/main.css';

export default function CounterSection() {
  return (
    <section className="contador_section">
      <h2 className="contador_titulo">Minutos de Edición</h2>
      <div className="contador_grid">
        <div className="contador_col">
          <span className="contador_label">Horas</span>
          <span className="contador_valor" id="horas">00</span>
        </div>
        <div className="contador_col">
          <span className="contador_label">Min</span>
          <span className="contador_valor" id="minutos">00</span>
        </div>
        <div className="contador_col">
          <span className="contador_label">Seg</span>
          <span className="contador_valor" id="segundos">00</span>
        </div>
        <div className="contador_col">
          <span className="contador_label">Ms</span>
          <span className="contador_valor" id="milisegundos">000</span>
        </div>
      </div>
    </section>
  );
}

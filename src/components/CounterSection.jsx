import '../styles/main.css';
import useEditCounter from '../hooks/useEditCounter';

export default function CounterSection() {
  const { horas, minutos, segundos, milisegundos } = useEditCounter();

  return (
    <section className="contador_section">
      <h2 className="contador_titulo">Minutos de Edición</h2>

      <div className="contador_grid">
        <div className="contador_col">
          <span className="contador_label">Horas</span>
          <span className="contador_valor">{horas}</span>
        </div>

        <div className="contador_col">
          <span className="contador_label">Min</span>
          <span className="contador_valor">{minutos}</span>
        </div>

        <div className="contador_col">
          <span className="contador_label">Seg</span>
          <span className="contador_valor">{segundos}</span>
        </div>

        <div className="contador_col">
          <span className="contador_label">Ms</span>
          <span className="contador_valor">{milisegundos}</span>
        </div>
      </div>
    </section>
  );
}
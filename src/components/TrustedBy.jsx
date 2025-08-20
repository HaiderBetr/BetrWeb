import '../styles/trustedBy.css';
import logos1 from '../assets/logos-conf/Logos-clientes-1.png';
import logos2 from '../assets/logos-conf/Logos-clientes-2.png';

export default function TrustedBy() {
  return (
    <section className="trusted_section">
      <div className="trusted_marquee">
        <div className="trusted_track">
          <div className="trusted_group">
            <img src={logos1} alt="Clientes 1" />
            <img src={logos2} alt="Clientes 2" />
          </div>
          <div className="trusted_group">
            <img src={logos1} alt="Clientes 1 (duplicado)" />
            <img src={logos2} alt="Clientes 2 (duplicado)" />
          </div>
        </div>
      </div>
    </section>
  );
}

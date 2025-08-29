import "../styles/contact.css";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", form);
    alert("¡Gracias! Tu mensaje ha sido enviado.");
    setForm({ nombre: "", correo: "", telefono: "", mensaje: "" });
  };

  return (
    <section className="contact-section">
      <div className="contact-left">
        <p className="subtitle">Cada empresa requiere una estrategia personalizada.</p>
        <h2 className="main-title">¡QUEREMOS HABLAR CONTIGO!</h2>

        <div className="contact-columns">
          <div>
            <h3>EE. UU.</h3>
            <p>13720 Jetport Commerce Pkwy,<br />Unidad 13 Fort Myers, FL 33913</p>
            <p className="email">contacto@betrmedia.com</p>
          </div>
          <div>
            <h3>COLOMBIA</h3>
            <p>+57 322 849 4987<br />+57 300 552 5228</p>
            <p className="email">contacto@betrmedia.com</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <p className="form-title">Déjanos un mensaje y nos comunicaremos contigo:</p>

          <label>Nombre:
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
          </label>

          <div className="input-row">
            <label>Correo:
              <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
            </label>

            <label>Teléfono:
              <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} />
            </label>
          </div>

          <label>Mensaje:
            <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required />
          </label>

          <button type="submit" className="submit-btn">Enviar mensaje</button>
        </form>
      </div>

      <div className="contact-right">
        <h2 className="join-title">ÚNETE A NOSOTROS</h2>
        <p className="join-text">Trabaja junto a un talentoso y amigable equipo.<br />Desarrolla tu potencial junto a Betr Media.</p>
        <a href="mailto:empleo@betrmedia.com" className="join-btn">empleo@betrmedia.com</a>
        <p className="cv-hint">Envíanos tu CV junto a tu portafolio o experiencias.</p>
      </div>
    </section>
  );
}

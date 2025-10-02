import "../styles/contact.css";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
    empresa: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ ok: false, msg: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ok: false, msg: "" });

    if (form.empresa) return;

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          correo: form.correo,
          telefono: form.telefono,
          mensaje: form.mensaje,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "No se pudo enviar");

      setStatus({ ok: true, msg: "¡Gracias! Tu mensaje fue enviado." });
      setForm({ nombre: "", correo: "", telefono: "", mensaje: "", empresa: "" });
    } catch (err) {
      setStatus({ ok: false, msg: err.message || "Error al enviar el mensaje." });
    } finally {
      setLoading(false);
    }
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

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <p className="form-title">Déjanos un mensaje y nos comunicaremos contigo:</p>

          <label style={{display:"none"}}>
            Empresa:
            <input type="text" name="empresa" value={form.empresa} onChange={handleChange} tabIndex={-1} autoComplete="off" />
          </label>

          <label>Nombre:
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
          </label>

          <div className="input-row">
            <label>Correo:
              <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
            </label>

            <label>Teléfono:
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                pattern="^[0-9+\-\s()]*$"
                placeholder="+57 300 000 0000"
              />
            </label>
          </div>

          <label>Mensaje:
            <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required />
          </label>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>

          {status.msg && (
            <p
              role="status"
              aria-live="polite"
              style={{ marginTop: 12, color: status.ok ? "green" : "crimson" }}
            >
              {status.msg}
            </p>
          )}
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

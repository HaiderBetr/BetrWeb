// backend/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
app.use(cors());
app.use(express.json()); // <-- reemplaza body-parser

const resendClient = new Resend(process.env.RESEND_API_KEY);

// Healthcheck opcional
app.get('/api/health', (_, res) => res.json({ ok: true }));

app.post('/api/contact', async (req, res) => {
  try {
    const { nombre, correo, telefono, mensaje } = req.body || {};
    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({ error: 'Campos inválidos' });
    }

    const clean = (s) => String(s ?? '').trim().slice(0, 2000);

    const subject = `Nuevo mensaje de ${clean(nombre)} - Web Betr Media`;
    const html = `
      <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6">
        <h2 style="margin: 0 0 8px">Nuevo mensaje del formulario</h2>
        <p><strong>Nombre:</strong> ${clean(nombre)}</p>
        <p><strong>Correo:</strong> ${clean(correo)}</p>
        <p><strong>Teléfono:</strong> ${clean(telefono || 'No especificado')}</p>
        <p><strong>Mensaje:</strong><br />${clean(mensaje).replace(/\n/g, '<br />')}</p>
      </div>
    `;

    const { error } = await resendClient.emails.send({
      from: process.env.MAIL_FROM || 'onboarding@resend.dev',
      to: process.env.MAIL_TO || 'contacto@betrmedia.com',
      replyTo: clean(correo),
      subject,
      html,
      text:
        `Nombre: ${clean(nombre)}\n` +
        `Correo: ${clean(correo)}\n` +
        `Teléfono: ${clean(telefono || '')}\n\n` +
        `Mensaje:\n${clean(mensaje)}`
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'No se pudo enviar el mensaje' });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});

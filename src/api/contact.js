import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { nombre, correo, telefono, mensaje } = req.body || {};

        //validación básica
        if (
            !nombre || typeof nombre !== "string" ||
            !correo || typeof correo !== "string" ||
            !mensaje || typeof mensaje !== "string" 
        ){
            return res.status(400).json({ error: "Campos inválidos" });
        }

        // Sanitización mínima
        const clean = (s) => String(s).toString().trim().slice(0, 2000);

        const subject = `Nuevo mensaje de ${clean(nombre)} - Web Betr Media`;
        const html = `
            <div style="font-family:Inter,Arial,sans-serif;line-height:1.6">
                <h2 style="margin: 0 0 8px">Nuevo mensaje del formulario</h2>
                <p><strong>Nombre=:</strong> ${clean(nombre)}</p>
                <p><strong>Correo:</strong> ${clean(correo)}</p>
                <p><strong>Teléfono:</strong> ${clean(telefono || "No proporcionado")}</p>
                <p><strong>Mensaje:</strong><br/>${clean(mensaje).replace(/\n/g, "<br/>")}</p>
                <hr/>
                <p style="color:#888;font-size:12px">Enviando desde betrmedia.com</p>
            </div>
        `;

        // Transport smtp 
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Enviar email
        await transporter.sendMail({
            from: process.env.MAIL_FROM || `Formulario web <no-reply@betrmedia.com`,
            to: process.env.MAIL_TO || "haiderjerez@betrmedia.com",
            replayTo: clean(correo),
            subject,
            html,
            text: `Nombre: ${clean(nombre)}\nCorreo: ${clean(correo)}\nTeléfono: ${clean(telefono || "")}\n\nMensaje:\n${clean(mensaje)}`,
        });
        return res.status(200).json({ok: true });
    } catch (err) {
        console.error("Mailer error:", err);
        return res.status(500).json({ error: "No se pudo enviar el correo" });
    }
}
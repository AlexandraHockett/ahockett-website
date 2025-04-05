// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Configurar transporter de e-mail com as configurações do Hostinger
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // Usa false para porta 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Preparar o conteúdo do e-mail
    const mailData = {
      from: `"Formulário do Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Enviar para o mesmo endereço
      subject: `Nova mensagem: ${formData.subject || "Contacto do website"}`,
      text: `
        Nome: ${formData.name}
        Email: ${formData.email}
        ${formData.phone ? `Telefone: ${formData.phone}` : ""}
        ${formData.company ? `Empresa: ${formData.company}` : ""}
        Mensagem: ${formData.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6;">Nova mensagem do website</h2>
          <p><strong>Nome:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          ${formData.phone ? `<p><strong>Telefone:</strong> ${formData.phone}</p>` : ""}
          ${formData.company ? `<p><strong>Empresa:</strong> ${formData.company}</p>` : ""}
          <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #8b5cf6;">
            <h3 style="margin-top: 0;">Mensagem:</h3>
            <p style="white-space: pre-line;">${formData.message}</p>
          </div>
        </div>
      `,
      replyTo: formData.email, // Definir o email do remetente como reply-to
    };

    // Enviar e-mail
    const info = await transporter.sendMail(mailData);
    console.log("Mensagem enviada: %s", info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      {
        error: "Falha ao enviar a mensagem",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

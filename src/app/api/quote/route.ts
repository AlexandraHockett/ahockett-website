// src/app/api/quote/route.ts
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

    // Preparar um título mais descritivo
    const subject = `Pedido de cotação: ${formData.businessName || formData.name} (${formData.projectType || "Novo projeto"})`;

    // Criar uma formatação melhorada para os dados do formulário
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8b5cf6;">Novo pedido de cotação</h2>
        <h3 style="margin-top: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Informação do cliente</h3>
        <p><strong>Nome:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${formData.phone ? `<p><strong>Telefone:</strong> ${formData.phone}</p>` : ""}
        ${formData.company || formData.businessName ? `<p><strong>Empresa:</strong> ${formData.company || formData.businessName}</p>` : ""}
        ${formData.preferredContact ? `<p><strong>Método de contacto preferido:</strong> ${formData.preferredContact}</p>` : ""}
    `;

    // Adicionar detalhes do projeto se existirem
    if (formData.projectType || formData.websiteType || formData.industry) {
      htmlContent += `
        <h3 style="margin-top: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Detalhes do projeto</h3>
        ${formData.projectType ? `<p><strong>Tipo de projeto:</strong> ${formData.projectType}</p>` : ""}
        ${formData.websiteType ? `<p><strong>Tipo de website:</strong> ${formData.websiteType}</p>` : ""}
        ${formData.industry ? `<p><strong>Indústria:</strong> ${formData.industry}</p>` : ""}
        ${formData.existingUrl ? `<p><strong>Website existente:</strong> <a href="${formData.existingUrl}">${formData.existingUrl}</a></p>` : ""}
        ${formData.pages ? `<p><strong>Número de páginas:</strong> ${formData.pages}</p>` : ""}
      `;
    }

    // Adicionar informações de orçamento e prazo
    if (formData.budget || formData.timeline) {
      htmlContent += `
        <h3 style="margin-top: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Orçamento e prazo</h3>
        ${formData.budget ? `<p><strong>Orçamento:</strong> ${formData.budget}</p>` : ""}
        ${formData.timeline ? `<p><strong>Prazo desejado:</strong> ${formData.timeline}</p>` : ""}
      `;
    }

    // Adicionar funcionalidades necessárias se existirem
    if (formData.features && formData.features.length > 0) {
      htmlContent += `
        <h3 style="margin-top: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Funcionalidades desejadas</h3>
        <ul>
          ${
            Array.isArray(formData.features)
              ? formData.features
                  .map((feature: string) => `<li>${feature}</li>`)
                  .join("")
              : `<li>${formData.features}</li>`
          }
        </ul>
      `;
    }

    // Adicionar mensagem adicional se existir
    if (formData.message || formData.additionalInfo) {
      htmlContent += `
        <h3 style="margin-top: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Informações adicionais</h3>
        <div style="padding: 15px; background-color: #f9fafb; border-left: 4px solid #8b5cf6;">
          <p style="white-space: pre-line;">${formData.message || formData.additionalInfo}</p>
        </div>
      `;
    }

    // Fechar o div principal
    htmlContent += `</div>`;

    // Enviar e-mail
    const info = await transporter.sendMail({
      from: `"Formulário de Cotação" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: JSON.stringify(formData, null, 2), // Versão texto simples como fallback
      html: htmlContent,
      replyTo: formData.email, // Definir o email do remetente como reply-to
    });

    console.log("Mensagem de cotação enviada: %s", info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Erro ao enviar e-mail de cotação:", error);
    return NextResponse.json(
      {
        error: "Falha ao enviar o pedido de cotação",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

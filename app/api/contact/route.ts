import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, lastName, email, subject, message } = await req.json();

    await resend.emails.send({
      from: 'Formulario Web <onboarding@resend.dev>',
      to: 'nuevavisionpty@gmail.com',
      subject: `[Web] ${subject} - ${name} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #6b278a;">Nuevo mensaje desde la web</h2>
          <p><strong>Nombre:</strong> ${name} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <div style="background:#f9f9f9; padding:15px; border-left:3px solid #6b278a; margin-top:10px;">
            <p style="margin:0;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const payload = {
      sender: { name: name, email: email },
      to: [{ email: "ichkoog79@gmail.com", name: "Ichko" }],
      replyTo: { email: email, name: name },
      subject: `Portfolio Contact: Message from ${name}`,
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 8px;">
          <h2 style="color: #0f172a; margin-bottom: 4px;">New message from your portfolio</h2>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 8px 0;"><strong>Message:</strong></p>
          <div style="background: #ffffff; border-left: 4px solid #14b8a6; padding: 12px 16px; border-radius: 4px; margin-top: 8px; white-space: pre-wrap;">${message}</div>
        </div>
      `,
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = (errorData as { message?: string })?.message || "Failed to send email.";
      return NextResponse.json({ error: errorMsg }, { status: response.status });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unexpected error. Please try again." }, { status: 500 });
  }
}

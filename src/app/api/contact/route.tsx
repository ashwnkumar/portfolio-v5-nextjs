import { Resend } from "resend";
import { apiConfig } from "@/configs/envConfig";

const resend = new Resend(apiConfig.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // must be a verified sender in Resend
      to: "code.by.ashwin@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      html:
        "<p><b>Name:</b> " +
        name +
        "</p><p><b>Email:</b> " +
        email +
        "</p><p><b>Message:</b> " +
        message +
        "</p>",
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true, data });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

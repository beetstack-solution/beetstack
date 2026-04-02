"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: EmailData) {
  const { name, email, phone, subject, message } = data;
  const whatsappNumber = phone.replace(/\D/g, "");

  try {
    const { data: result, error } = await resend.emails.send({
      from: "Beetstack IT Solutions <onboarding@resend.dev>",
      to: ["dev.ajmal11@gmail.com"],
      subject: `New Message: ${subject}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Message From Beetstack</title>
            <style>
      .hover-link:hover {
        color: #a21c3c !important;
        text-decoration: underline !important;
      }
      .whatsapp-btn:hover {
        background-color: #20ba5c !important;
        transform: translateY(-2px);
      }
    </style>
          </head>
          <body style="margin: 0; padding: 50px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffff; color: #1a1a1a;">
            
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; overflow: hidden; border-radius: 50px; box-shadow: 0 4px 24px rgba(0,0,0,0.05);">
              
              <div style="padding: 40px 20px; text-align: center;">
                <img src="https://beetstack.in/public/assets/img/logo.png" alt="Beetstack Logo" style="max-height: 60px; width: auto; display: block; margin: 0 auto 12px auto;">
                <p style="margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #a21c3c;">New Project Inquiry</p>
              </div>

              <div style="background-color: #fafafa; padding: 40px 30px; border-radius: 50px;">
                <div style="background-color: #ffffff; padding: 24px; border-radius: 25px; border: 1px solid #eaeaea; border-left: 4px solid #a21c3c; margin-bottom: 24px;">
                  
                  <div style="margin-bottom: 16px;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #a21c3c;">Sender Name</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${name}</p>
                  </div>
                  
                  <div style="margin-bottom: 16px;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #a21c3c;">Email Address</p>
                    <p class="hover-link" style="margin: 0; font-size: 16px; font-weight: 600;"><a href="mailto:${email}" style="color: #1a1a1a; text-decoration: none;">${email}</a></p>
                  </div>

                  <div style="margin-bottom: 16px;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #a21c3c;">Phone Number</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${phone}</p>
                    <div style="margin-top: 10px;">
                      <a href="https://wa.me/${whatsappNumber}" class="whatsapp-btn" style="display: inline-flex; align-items: center; background-color: #25d366; color: white; padding: 8px 16px; border-radius: 12px; text-decoration: none; font-size: 12px; font-weight: 600; transition: all 0.3s ease;">
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #a21c3c;">Subject</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a1a; text-transform: capitalize;">${subject}</p>
                  </div>

                </div>

                <div style="background-color: #ffffff; padding: 24px; border-radius: 25px; border: 1px solid #eaeaea; border-left: 4px solid #91a93e;">
                  <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #91a93e;">Message Content</p>
                  <div style="font-size: 15px; font-weight: 400; color: #1a1a1a; line-height: 1.7; white-space: pre-wrap; text-transform: capitalize;">${message}</div>
                </div>

              </div>

              <div style="padding: 30px; text-align: center; background-color: #ffffff; border-top: 1px solid #f0f0f0;">
                <p style="margin: 0; font-size: 12px; font-weight: 500; color: #999999; line-height: 1.6;">
                  © 2026 Beetstack IT Solutions<br>
                  Kannur, Kerala, India
                </p>
              </div>

            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: result?.id };
  } catch (err) {
    console.error("Email send exception:", err);
    return { success: false, error: "Internal Server Error" };
  }
}
